/*
 * bsp_AES.c
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 AES加密算法 - 软件实现】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 *              4. 算法：AES-128 ECB模式
 */

#include "bsp_AES.h"
#include <string.h>

/* ============================================  AES S-Box  ============================================ */
static const int32_t S[16][16] = { 
    {0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76},
    {0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0},
    {0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15},
    {0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75},
    {0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84},
    {0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf},
    {0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8},
    {0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2},
    {0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73},
    {0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb},
    {0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79},
    {0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08},
    {0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a},
    {0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e},
    {0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf},
    {0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16}
};

/* ============================================  AES 逆S-Box  ============================================ */
static const int32_t S2[16][16] = { 
    {0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb},
    {0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb},
    {0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e},
    {0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25},
    {0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92},
    {0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84},
    {0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06},
    {0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b},
    {0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73},
    {0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e},
    {0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b},
    {0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4},
    {0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f},
    {0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef},
    {0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61},
    {0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d}
};

/* ============================================  Rcon  ============================================ */
static const int32_t Rcon[10] = { 0x01000000, 0x02000000, 0x04000000, 0x08000000,
                                   0x10000000, 0x20000000, 0x40000000, 0x80000000,
                                   0x1b000000, 0x36000000 };

/* ============================================  MixColumns矩阵  ============================================ */
static const int32_t colM[4][4] = { 
    {2, 3, 1, 1},
    {1, 2, 3, 1},
    {1, 1, 2, 3},
    {3, 1, 1, 2}
};

static const int32_t deColM[4][4] = { 
    {0xe, 0xb, 0xd, 0x9},
    {0x9, 0xe, 0xb, 0xd},
    {0xd, 0x9, 0xe, 0xb},
    {0xb, 0xd, 0x9, 0xe}
};

/* ============================================  扩展密钥  ============================================ */
static int32_t w[44];

/* ============================================  内部函数  ============================================ */

static int32_t getLeft4Bit(int32_t num)
{
    return (num & 0x000000f0) >> 4;
}

static int32_t getRight4Bit(int32_t num)
{
    return num & 0x0000000f;
}

static int32_t getNumFromSBox(int32_t index)
{
    int32_t row = getLeft4Bit(index);
    int32_t col = getRight4Bit(index);
    return S[row][col];
}

static int32_t getNumFromS1Box(int32_t index)
{
    int32_t row = getLeft4Bit(index);
    int32_t col = getRight4Bit(index);
    return S2[row][col];
}

static int32_t getIntFromChar(int8_t c)
{
    return (int32_t)c & 0x000000ff;
}

static void convertToIntArray(int8_t *str, int32_t pa[4][4])
{
    int32_t k = 0;
    int32_t i, j;
    
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
        {
            pa[j][i] = getIntFromChar(str[k]);
            k++;
        }
}

static int32_t getWordFromStr(int8_t *str)
{
    int32_t one = getIntFromChar(str[0]) << 24;
    int32_t two = getIntFromChar(str[1]) << 16;
    int32_t three = getIntFromChar(str[2]) << 8;
    int32_t four = getIntFromChar(str[3]);
    return one | two | three | four;
}

static void splitIntToArray(int32_t num, int32_t array[4])
{
    array[0] = (num >> 24) & 0x000000ff;
    array[1] = (num >> 16) & 0x000000ff;
    array[2] = (num >> 8) & 0x000000ff;
    array[3] = num & 0x000000ff;
}

static void leftLoop4int(int32_t array[4], int32_t step)
{
    int32_t temp[4];
    int32_t i;
    int32_t index;
    
    for (i = 0; i < 4; i++)
        temp[i] = array[i];

    index = step % 4 == 0 ? 0 : step % 4;
    for (i = 0; i < 4; i++)
    {
        array[i] = temp[index];
        index++;
        index = index % 4;
    }
}

static void rightLoop4int(int32_t array[4], int32_t step)
{
    int32_t temp[4];
    int32_t i;
    int32_t index;
    
    for (i = 0; i < 4; i++)
        temp[i] = array[i];

    index = step % 4 == 0 ? 0 : step % 4;
    index = 3 - index;
    for (i = 3; i >= 0; i--)
    {
        array[i] = temp[index];
        index--;
        index = index == -1 ? 3 : index;
    }
}

static int32_t mergeArrayToInt(int32_t array[4])
{
    return (array[0] << 24) | (array[1] << 16) | (array[2] << 8) | array[3];
}

static int32_t T(int32_t num, int32_t round)
{
    int32_t numArray[4];
    int32_t i;
    int32_t result;
    
    splitIntToArray(num, numArray);
    leftLoop4int(numArray, 1);

    for (i = 0; i < 4; i++)
        numArray[i] = getNumFromSBox(numArray[i]);

    result = mergeArrayToInt(numArray);
    return result ^ Rcon[round];
}

static void extendKey(int8_t *key)
{
    int32_t i;
    int32_t j;
    
    for (i = 0; i < 4; i++)
        w[i] = getWordFromStr(key + i * 4);

    for (i = 4, j = 0; i < 44; i++)
    {
        if (i % 4 == 0)
        {
            w[i] = w[i - 4] ^ T(w[i - 1], j);
            j++;
        }
        else
        {
            w[i] = w[i - 4] ^ w[i - 1];
        }
    }
}

static void addRoundKey(int32_t array[4][4], int32_t round)
{
    int32_t warray[4];
    int32_t i, j;
    
    for (i = 0; i < 4; i++)
    {
        splitIntToArray(w[round * 4 + i], warray);
        for (j = 0; j < 4; j++)
        {
            array[j][i] = array[j][i] ^ warray[j];
        }
    }
}

static void subBytes(int32_t array[4][4])
{
    int32_t i, j;
    
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
            array[i][j] = getNumFromSBox(array[i][j]);
}

static void deSubBytes(int32_t array[4][4])
{
    int32_t i, j;
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
            array[i][j] = getNumFromS1Box(array[i][j]);
}

static void shiftRows(int32_t array[4][4])
{
    int32_t rowTwo[4], rowThree[4], rowFour[4];
    int32_t i;
    
    for (i = 0; i < 4; i++)
    {
        rowTwo[i] = array[1][i];
        rowThree[i] = array[2][i];
        rowFour[i] = array[3][i];
    }
    
    leftLoop4int(rowTwo, 1);
    leftLoop4int(rowThree, 2);
    leftLoop4int(rowFour, 3);

    for (i = 0; i < 4; i++)
    {
        array[1][i] = rowTwo[i];
        array[2][i] = rowThree[i];
        array[3][i] = rowFour[i];
    }
}

static void deShiftRows(int32_t array[4][4])
{
    int32_t rowTwo[4], rowThree[4], rowFour[4];
    int32_t i;
    
    for (i = 0; i < 4; i++)
    {
        rowTwo[i] = array[1][i];
        rowThree[i] = array[2][i];
        rowFour[i] = array[3][i];
    }

    rightLoop4int(rowTwo, 1);
    rightLoop4int(rowThree, 2);
    rightLoop4int(rowFour, 3);

    for (i = 0; i < 4; i++)
    {
        array[1][i] = rowTwo[i];
        array[2][i] = rowThree[i];
        array[3][i] = rowFour[i];
    }
}

static int32_t GFMul2(int32_t s)
{
    int32_t result = s << 1;
    int32_t a7 = result & 0x00000100;

    if (a7 != 0)
    {
        result = result & 0x000000ff;
        result = result ^ 0x1b;
    }

    return result;
}

static int32_t GFMul3(int32_t s)
{
    return GFMul2(s) ^ s;
}

static int32_t GFMul4(int32_t s)
{
    return GFMul2(GFMul2(s));
}

static int32_t GFMul8(int32_t s)
{
    return GFMul2(GFMul4(s));
}

static int32_t GFMul9(int32_t s)
{
    return GFMul8(s) ^ s;
}

static int32_t GFMul11(int32_t s)
{
    return GFMul9(s) ^ GFMul2(s);
}

static int32_t GFMul12(int32_t s)
{
    return GFMul8(s) ^ GFMul4(s);
}

static int32_t GFMul13(int32_t s)
{
    return GFMul12(s) ^ s;
}

static int32_t GFMul14(int32_t s)
{
    return GFMul12(s) ^ GFMul2(s);
}

static int32_t GFMul(int32_t n, int32_t s)
{
    int32_t result = 0;

    if (n == 1)
        result = s;
    else if (n == 2)
        result = GFMul2(s);
    else if (n == 3)
        result = GFMul3(s);
    else if (n == 0x9)
        result = GFMul9(s);
    else if (n == 0xb)
        result = GFMul11(s);
    else if (n == 0xd)
        result = GFMul13(s);
    else if (n == 0xe)
        result = GFMul14(s);

    return result;
}

static void mixColumns(int32_t array[4][4])
{
    int32_t tempArray[4][4];
    int32_t i, j;

    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
            tempArray[i][j] = array[i][j];

    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
        {
            array[i][j] = GFMul(colM[i][0], tempArray[0][j]) ^ GFMul(colM[i][1], tempArray[1][j]) 
                        ^ GFMul(colM[i][2], tempArray[2][j]) ^ GFMul(colM[i][3], tempArray[3][j]);
        }
}

static void deMixColumns(int32_t array[4][4])
{
    int32_t tempArray[4][4];
    int32_t i, j;

    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
            tempArray[i][j] = array[i][j];

    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
        {
            array[i][j] = GFMul(deColM[i][0], tempArray[0][j]) ^ GFMul(deColM[i][1], tempArray[1][j]) 
                        ^ GFMul(deColM[i][2], tempArray[2][j]) ^ GFMul(deColM[i][3], tempArray[3][j]);
        }
}

static void convertArrayToStr(int32_t array[4][4], int8_t *str)
{
    int32_t i, j;
    
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
            *str++ = (int8_t)array[j][i];
}

static void addRoundTowArray(int32_t aArray[4][4], int32_t bArray[4][4])
{
    int32_t i, j;
    
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
            aArray[i][j] = aArray[i][j] ^ bArray[i][j];
}

static void getArrayFrom4W(int32_t i, int32_t array[4][4])
{
    int32_t index = i * 4;
    int32_t colOne[4], colTwo[4], colThree[4], colFour[4];
    int32_t j;
    
    splitIntToArray(w[index], colOne);
    splitIntToArray(w[index + 1], colTwo);
    splitIntToArray(w[index + 2], colThree);
    splitIntToArray(w[index + 3], colFour);

    for (j = 0; j < 4; j++)
    {
        array[j][0] = colOne[j];
        array[j][1] = colTwo[j];
        array[j][2] = colThree[j];
        array[j][3] = colFour[j];
    }
}

static int32_t checkKeyLen(int32_t len)
{
    return (len == 16) ? 1 : 0;
}

/* ============================================  API实现  ============================================ */

void BSP_AES_Encrypt(int8_t *pPlainText, int32_t plainTextLen, int8_t *pKey, int8_t *pCipherText)
{
    int32_t pArray[4][4];
    int32_t i, k;
    int32_t keylen = 16;
    
    if (plainTextLen == 0 || plainTextLen % 16 != 0)
    {
        return;
    }

    if (!checkKeyLen(keylen))
    {
        return;
    }

    extendKey(pKey);

    for (k = 0; k < plainTextLen; k += 16)
    {
        convertToIntArray(pPlainText + k, pArray);
        addRoundKey(pArray, 0);

        for (i = 1; i < 10; i++)
        {
            subBytes(pArray);
            shiftRows(pArray);
            mixColumns(pArray);
            addRoundKey(pArray, i);
        }

        subBytes(pArray);
        shiftRows(pArray);
        addRoundKey(pArray, 10);

        convertArrayToStr(pArray, pCipherText + k);
    }
}

void BSP_AES_Decrypt(int8_t *pCipherText, int32_t cipherTextLen, int8_t *pKey, int8_t *pPlainText)
{
    int32_t keylen = 16;
    int32_t k, i;
    int32_t cArray[4][4];
    int32_t wArray[4][4];
    
    if (cipherTextLen == 0 || cipherTextLen % 16 != 0)
    {
        return;
    }

    if (!checkKeyLen(keylen))
    {
        return;
    }

    extendKey(pKey);

    for (k = 0; k < cipherTextLen; k += 16)
    {
        convertToIntArray(pCipherText + k, cArray);
        addRoundKey(cArray, 10);

        for (i = 9; i >= 1; i--)
        {
            deSubBytes(cArray);
            deShiftRows(cArray);
            deMixColumns(cArray);
            getArrayFrom4W(i, wArray);
            deMixColumns(wArray);
            addRoundTowArray(cArray, wArray);
        }

        deSubBytes(cArray);
        deShiftRows(cArray);
        addRoundKey(cArray, 0);

        convertArrayToStr(cArray, pPlainText + k);
    }
}
