import crypto from 'crypto'
import { CRC, DiagRequest, DiagResponse } from 'ECB'
import path from 'path'
import fs from 'fs/promises'

const PACKAGE_MAGIC = 'DFPK'
const PACKAGE_VERSION = 1
const PACKAGE_HEADER_SIZE = 12
const SLOT_A = 0
const SLOT_B = 1

type PackageImage = {
  slotType: number
  slotName: string
  loadAddress: number
  dataOffset: number
  dataSize: number
  crc16: number
  sha256: string
}

type PackageManifest = {
  format: typeof PACKAGE_MAGIC
  version: number
  images: PackageImage[]
}

type UpgradePackage = {
  manifest: PackageManifest
  raw: Buffer
  filePath: string
}

const crc = new CRC('self', 16, 0x3d65, 0, 0xffff, true, true)
let maxChunkSize: number | undefined = undefined
let content: undefined | Buffer = undefined
let pendingCrcResult: number | undefined = undefined
let currentPackage: UpgradePackage | undefined = undefined
let currentImage: PackageImage | undefined = undefined
let needRequestDownload = false
const fileList: string[] = [path.join(process.env.PROJECT_ROOT, 'bin', 'DFDI_APP.bin')]

function sha256Of(data: Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

function parseUpgradePackage(filePath: string, raw: Buffer): UpgradePackage {
  if (raw.length < PACKAGE_HEADER_SIZE) {
    throw new Error(`upgrade package too small: ${filePath}`)
  }

  const magic = raw.subarray(0, 4).toString('ascii')
  if (magic !== PACKAGE_MAGIC) {
    throw new Error(`invalid package magic: ${magic}`)
  }

  const version = raw.readUInt32BE(4)
  if (version !== PACKAGE_VERSION) {
    throw new Error(`unsupported package version: ${version}`)
  }

  const manifestLength = raw.readUInt32BE(8)
  const manifestStart = PACKAGE_HEADER_SIZE
  const manifestEnd = manifestStart + manifestLength
  if (manifestEnd > raw.length) {
    throw new Error(`manifest length out of range: ${manifestLength}`)
  }

  const manifest = JSON.parse(raw.subarray(manifestStart, manifestEnd).toString('utf8')) as PackageManifest
  if (manifest.format !== PACKAGE_MAGIC || manifest.version !== PACKAGE_VERSION || !Array.isArray(manifest.images)) {
    throw new Error('invalid manifest content')
  }

  for (const image of manifest.images) {
    const dataEnd = image.dataOffset + image.dataSize
    if (dataEnd > raw.length) {
      throw new Error(`image ${image.slotName} exceeds package size`)
    }
  }

  return { manifest, raw, filePath }
}

function getImageBySlot(pkg: UpgradePackage, slotType: number): PackageImage {
  const image = pkg.manifest.images.find((item) => item.slotType === slotType)
  if (!image) {
    throw new Error(`package does not contain slot ${slotType}`)
  }
  return image
}

function loadImagePayload(pkg: UpgradePackage, image: PackageImage): Buffer {
  const payload = pkg.raw.subarray(image.dataOffset, image.dataOffset + image.dataSize)
  const calcSha256 = sha256Of(payload)
  if (calcSha256.toLowerCase() !== image.sha256.toLowerCase()) {
    throw new Error(`sha256 mismatch for slot ${image.slotName}`)
  }
  return payload
}

function buildRequestDownloadPdu(addr: number, size: number): Buffer {
  const pdu = Buffer.alloc(11)
  pdu.writeUInt8(0x34, 0)
  pdu.writeUInt8(0x00, 1)
  pdu.writeUInt8(0x44, 2)
  pdu.writeUInt32BE(addr >>> 0, 3)
  pdu.writeUInt32BE(size >>> 0, 7)
  return pdu
}

Util.Init(async () => {
  //change routineControlType
  const req = DiagRequest.from('Tester_1.RoutineControl491')
  req.diagSetParameter('routineControlType', 1)
  await req.changeService()
  const resp = DiagResponse.from('Tester_1.RoutineControl491')
  resp.diagSetParameter('routineControlType', 1)
  await resp.changeService()
})

Util.On('Tester_1.RoutineControl491.recv', (v) => {
  const raw = v.diagGetRaw()
  if (v.diagIsPositiveResponse()) {
    console.log(`[BOOTLOADER] RC491 resp+: ${raw.toString('hex').toUpperCase()}`)
    if (raw.length >= 6 && raw[0] === 0x71 && raw[1] === 0x01 && raw[2] === 0xff && raw[3] === 0x00) {
      console.log(`[BOOTLOADER] erase result=${raw[4]} targetSlot=${raw[5]}`)
    }
  } else {
    console.log(`[BOOTLOADER] RC491 resp-: NRC=0x${v.diagGetResponseCode().toString(16)} raw=${raw.toString('hex').toUpperCase()}`)
  }
})

Util.On('Tester_1.RoutineControl490.recv', (v) => {
  const raw = v.diagGetRaw()
  if (v.diagIsPositiveResponse()) {
    console.log(`[BOOTLOADER] RC490 resp+: ${raw.toString('hex').toUpperCase()}`)
  } else {
    console.log(`[BOOTLOADER] RC490 resp-: NRC=0x${v.diagGetResponseCode().toString(16)} raw=${raw.toString('hex').toUpperCase()}`)
  }
})

Util.On('Tester_1.SecurityAccess390.recv', async (v) => {
  const data = v.diagGetParameterRaw('securitySeed')
  const cipher = crypto.createCipheriv(
    'aes-128-cbc',
    Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
    Buffer.alloc(16, 0)
  )
  const encrypted = cipher.update(data)
  cipher.final()
  const req = DiagRequest.from('Tester_1.SecurityAccess391')
  req.diagSetParameterSize('data', 128)
  req.diagSetParameterRaw('data', encrypted)
  await req.changeService()
})

Util.Register('Tester_1.JobFunction0', async () => {
  const filePath = fileList.shift()
  if (filePath) {
    currentPackage = parseUpgradePackage(filePath, await fs.readFile(filePath))
    console.log(`[BOOTLOADER] start job: package=${currentPackage.filePath}`)
    console.log(`[BOOTLOADER] package images=${currentPackage.manifest.images.length}`)
    const list = []

    content = undefined
    currentImage = undefined
    pendingCrcResult = undefined
    maxChunkSize = undefined
    needRequestDownload = false

    const eraseReq = DiagRequest.from('Tester_1.RoutineControl491')
    eraseReq.diagSetParameter('routineIdentifier', 0xff00)
    eraseReq.diagSetParameterSize('routineControlOptionRecord', 0)
    console.log('[BOOTLOADER] erase: routine=0xFF00')
    eraseReq.On('recv', async (resp) => {
      const raw = resp.diagGetRaw()
      if (!resp.diagIsPositiveResponse()) {
        return
      }
      if (raw.length < 6 || raw[0] !== 0x71 || raw[1] !== 0x01 || raw[2] !== 0xff || raw[3] !== 0x00) {
        return
      }
      if (raw[4] !== 0x00) {
        throw new Error(`erase routine failed, status=${raw[4]}`)
      }
      const targetSlot = raw[5]
      currentImage = getImageBySlot(currentPackage!, targetSlot)
      content = loadImagePayload(currentPackage!, currentImage)
      pendingCrcResult = crc.compute(content)
      if (pendingCrcResult !== currentImage.crc16) {
        throw new Error(
          `package crc16 mismatch for slot ${currentImage.slotName}: manifest=0x${currentImage.crc16.toString(16)} calc=0x${pendingCrcResult.toString(16)}`
        )
      }

      console.log(
        `[BOOTLOADER] selected slot=${currentImage.slotName} addr=0x${currentImage.loadAddress.toString(16)} size=${content.length} crc=0x${pendingCrcResult.toString(16)}`
      )

      needRequestDownload = true
    })
    list.push(eraseReq)
    return list
  } else {
    return []
  }
})
Util.Register('Tester_1.JobFunction1', () => {
  if (needRequestDownload) {
    if (!currentImage || !content) {
      throw new Error('request download without selected image')
    }

    const serviceName = currentImage.slotType === SLOT_A ? 'Tester_1.RequestDownload520_A' : 'Tester_1.RequestDownload520_B'
    const r34 = DiagRequest.from(serviceName)
    const raw = buildRequestDownloadPdu(currentImage.loadAddress, content.length)
    r34.diagSetRaw(raw)

    console.log(
      `[BOOTLOADER] R34 send raw=${raw.toString('hex').toUpperCase()} slot=${currentImage.slotName} addr=0x${currentImage.loadAddress.toString(
        16
      )} size=${content.length}`
    )

    r34.On('recv', (resp) => {
      const respRaw = resp.diagGetRaw().toString('hex').toUpperCase()
      if (resp.diagIsPositiveResponse()) {
        console.log(`[BOOTLOADER] R34 resp+: ${respRaw}`)
      } else {
        console.log(`[BOOTLOADER] R34 resp-: NRC=0x${resp.diagGetResponseCode().toString(16)} raw=${respRaw}`)
      }

      const buf = resp.diagGetParameterRaw('maxNumberOfBlockLength')
      const hex = buf.toString('hex').toUpperCase()
      if (buf.length >= 2) {
        maxChunkSize = buf.readUInt16BE(0)
      } else if (buf.length === 1) {
        maxChunkSize = buf.readUInt8(0)
      } else {
        maxChunkSize = undefined
      }
      console.log(`[BOOTLOADER] maxNumberOfBlockLength raw=${hex} val=${maxChunkSize}`)
    })

    needRequestDownload = false
    return [r34]
  }

  if (maxChunkSize == undefined || maxChunkSize <= 2) {
    return []
  }
  if (content) {
    maxChunkSize -= 2
    if (maxChunkSize & 0x07) {
      maxChunkSize -= maxChunkSize & 0x07
    }
    const numChunks = Math.ceil(content.length / maxChunkSize)
    const list = []
    for (let i = 0; i < numChunks; i++) {
      const start = i * maxChunkSize
      const end = Math.min(start + maxChunkSize, content.length)
      const chunk = content.subarray(start, end)

      const transferRequest = DiagRequest.from('Tester_1.TransferData540')
      transferRequest.diagSetParameterSize('transferRequestParameterRecord', chunk.length * 8)
      transferRequest.diagSetParameterRaw('transferRequestParameterRecord', chunk)

      // 计算块序号 (从1开始)
      const blockSequenceCounter = Buffer.alloc(1)
      blockSequenceCounter.writeUInt8((i + 1) & 0xff) // 使用循环计数 1-255
      transferRequest.diagSetParameterRaw('blockSequenceCounter', blockSequenceCounter)

      list.push(transferRequest)
    }
    //37
    const r37 = DiagRequest.from('Tester_1.RequestTransferExit550')
    r37.diagSetParameterSize('transferRequestParameterRecord', 0)
    list.push(r37)
    if (pendingCrcResult != undefined) {
      const crcReq = DiagRequest.from('Tester_1.RoutineControl490')
      const crcBuffer = Buffer.alloc(4)
      crcBuffer.writeUInt16BE(pendingCrcResult, 2)
      crcReq.diagSetParameterSize('routineControlOptionRecord', 4 * 8)
      crcReq.diagSetParameterRaw('routineControlOptionRecord', crcBuffer)
      console.log(`[BOOTLOADER] checksum: crc=0x${pendingCrcResult.toString(16)}`)
      list.push(crcReq)
    }
    if (fileList.length == 0) {
      const dependencyReq = DiagRequest.from('Tester_1.RoutineControl491')
      dependencyReq.diagSetParameter('routineIdentifier', 0xff01)
      dependencyReq.diagSetParameterSize('routineControlOptionRecord', 0)
      console.log('[BOOTLOADER] dependency: routine=0xFF01')
      list.push(dependencyReq)
    }
    content = undefined
    currentImage = undefined
    currentPackage = undefined
    maxChunkSize = undefined
    pendingCrcResult = undefined
    return list
  } else {
    return []
  }
})
