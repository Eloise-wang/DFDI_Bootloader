import crypto from 'crypto'
import { CRC, DiagRequest, DiagResponse } from 'ECB'
import path from 'path'
import fs from 'fs/promises'

const crc = new CRC('self', 16, 0x3d65, 0, 0xffff, true, true)
let maxChunkSize: number | undefined = undefined
let content: undefined | Buffer = undefined
let pendingCrcResult: number | undefined = undefined
const fileList: {
  addr: number
  file: string
}[] = [
  {
    addr: 0x00010000,
    file: path.join(process.env.PROJECT_ROOT, 'bin', 'DFDI_APP.bin')
  }
]

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

Util.On('Tester_1.RequestDownload520.recv', (v) => {
  const raw = v.diagGetRaw()
  if (v.diagIsPositiveResponse()) {
    console.log(`[BOOTLOADER] R34 resp+: ${raw.toString('hex').toUpperCase()}`)
  } else {
    console.log(`[BOOTLOADER] R34 resp-: NRC=0x${v.diagGetResponseCode().toString(16)} raw=${raw.toString('hex').toUpperCase()}`)
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
  const item = fileList.shift()
  if (item) {
    console.log(`[BOOTLOADER] start job: addr=0x${item.addr.toString(16)} file=${item.file}`)
    const list = []

    const r34 = DiagRequest.from('Tester_1.RequestDownload520')
    const memoryAddress = Buffer.alloc(4)
    memoryAddress.writeUInt32BE(item.addr)
    r34.diagSetParameterRaw('memoryAddress', memoryAddress)
    content = await fs.readFile(item.file)
    console.log(`[BOOTLOADER] file size=${content.length}`)
    const crcResult = crc.compute(content)
    pendingCrcResult = crcResult

    const eraseReq = DiagRequest.from('Tester_1.RoutineControl491')
    eraseReq.diagSetParameter('routineIdentifier', 0xff00)
    eraseReq.diagSetParameterSize('routineControlOptionRecord', 0)
    console.log('[BOOTLOADER] erase: routine=0xFF00')
    list.push(eraseReq)

    r34.diagSetParameter('memorySize', content.length)
    r34.On('recv', (resp) => {
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
    list.push(r34)
    return list
  } else {
    return []
  }
})
Util.Register('Tester_1.JobFunction1', () => {
  if (maxChunkSize == undefined || maxChunkSize <= 2) {
    throw new Error('maxNumberOfBlockLength is undefined or too small')
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
    maxChunkSize = undefined
    pendingCrcResult = undefined
    return list
  } else {
    return []
  }
})
