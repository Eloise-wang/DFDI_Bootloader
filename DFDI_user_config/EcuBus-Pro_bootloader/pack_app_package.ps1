$ErrorActionPreference = 'Stop'

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$binDir = Join-Path $rootDir 'bin'
$inputA = Join-Path $binDir 'DFDI_APP_A.bin'
$inputB = Join-Path $binDir 'DFDI_APP_B.bin'
$outputPkg = Join-Path $binDir 'DFDI_APP.bin'

$packageMagic = 'DFPK'
$packageVersion = 1
$packageHeaderSize = 12

$slotA = 0
$slotB = 1
$addrA = 0x00010000
$addrB = 0x00080000

function Get-Sha256Hex {
    param([byte[]]$Data)

    $sha256 = [System.Security.Cryptography.SHA256]::Create()
    try {
        $hash = $sha256.ComputeHash($Data)
    } finally {
        $sha256.Dispose()
    }

    return -join ($hash | ForEach-Object { $_.ToString('x2') })
}

function Get-Crc16 {
    param([byte[]]$Data)

    $crc = 0x0000
    foreach ($byte in $Data) {
        $crc = $crc -bxor $byte
        for ($i = 0; $i -lt 8; $i++) {
            if (($crc -band 0x0001) -ne 0) {
                $crc = (($crc -shr 1) -bxor 0xa6bc) -band 0xffff
            } else {
                $crc = ($crc -shr 1) -band 0xffff
            }
        }
    }

    return ($crc -bxor 0xffff) -band 0xffff
}

function New-ImageEntry {
    param(
        [int]$SlotType,
        [string]$SlotName,
        [int]$LoadAddress,
        [byte[]]$Payload
    )

    return [ordered]@{
        slotType    = $SlotType
        slotName    = $SlotName
        loadAddress = $LoadAddress
        dataOffset  = 0
        dataSize    = $Payload.Length
        crc16       = (Get-Crc16 -Data $Payload)
        sha256      = (Get-Sha256Hex -Data $Payload)
    }
}

function Write-UInt32BE {
    param(
        [byte[]]$Buffer,
        [int]$Offset,
        [uint32]$Value
    )

    $bytes = [BitConverter]::GetBytes($Value)
    if ([BitConverter]::IsLittleEndian) {
        [Array]::Reverse($bytes)
    }
    [Array]::Copy($bytes, 0, $Buffer, $Offset, 4)
}

if (-not (Test-Path -LiteralPath $inputA)) {
    throw "missing input: $inputA"
}

if (-not (Test-Path -LiteralPath $inputB)) {
    throw "missing input: $inputB"
}

$payloadA = [System.IO.File]::ReadAllBytes($inputA)
$payloadB = [System.IO.File]::ReadAllBytes($inputB)

$images = @(
    (New-ImageEntry -SlotType $slotA -SlotName 'A' -LoadAddress $addrA -Payload $payloadA),
    (New-ImageEntry -SlotType $slotB -SlotName 'B' -LoadAddress $addrB -Payload $payloadB)
)

$manifest = [ordered]@{
    format  = $packageMagic
    version = $packageVersion
    images  = $images
}

$manifestBytes = $null
$lastManifestLength = -1

while ($true) {
    $manifestJson = $manifest | ConvertTo-Json -Depth 4 -Compress
    $manifestBytes = [System.Text.Encoding]::UTF8.GetBytes($manifestJson)
    $manifestLength = $manifestBytes.Length
    $dataOffset = $packageHeaderSize + $manifestLength

    $images[0].dataOffset = $dataOffset
    $dataOffset += $payloadA.Length
    $images[1].dataOffset = $dataOffset

    if ($manifestLength -eq $lastManifestLength) {
        break
    }

    $lastManifestLength = $manifestLength
}

$header = New-Object byte[] $packageHeaderSize
[System.Text.Encoding]::ASCII.GetBytes($packageMagic).CopyTo($header, 0)
Write-UInt32BE -Buffer $header -Offset 4 -Value ([uint32]$packageVersion)
Write-UInt32BE -Buffer $header -Offset 8 -Value ([uint32]$manifestBytes.Length)

[System.IO.Directory]::CreateDirectory($binDir) | Out-Null

$output = New-Object System.IO.FileStream($outputPkg, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
try {
    $output.Write($header, 0, $header.Length)
    $output.Write($manifestBytes, 0, $manifestBytes.Length)
    $output.Write($payloadA, 0, $payloadA.Length)
    $output.Write($payloadB, 0, $payloadB.Length)
} finally {
    $output.Dispose()
}

$packageBytes = [System.IO.File]::ReadAllBytes($outputPkg)
$checkA = New-Object byte[] $payloadA.Length
$checkB = New-Object byte[] $payloadB.Length
[Array]::Copy($packageBytes, $images[0].dataOffset, $checkA, 0, $payloadA.Length)
[Array]::Copy($packageBytes, $images[1].dataOffset, $checkB, 0, $payloadB.Length)

if ((Get-Sha256Hex -Data $checkA) -ne $images[0].sha256) {
    throw 'package verify failed for slot A'
}

if ((Get-Sha256Hex -Data $checkB) -ne $images[1].sha256) {
    throw 'package verify failed for slot B'
}

Write-Host "[PACK] created $outputPkg"
Write-Host ("[PACK] slot A size={0} crc16=0x{1}" -f $payloadA.Length, $images[0].crc16.ToString('x'))
Write-Host ("[PACK] slot B size={0} crc16=0x{1}" -f $payloadB.Length, $images[1].crc16.ToString('x'))
