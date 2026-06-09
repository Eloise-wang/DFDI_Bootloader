/*
*****************************************************************************
**
**  File        : ac784x_app_b.ld
**
**  Abstract    : Linker script for DFDI_App targeting APP_B partition.
**                Flash origin: 0x00080000, length 384KB.
**                NOTE: Use this when compiling for APP_B slot.
**                Vector table starts at partition start (VTOR = 0x00080000).
**
**  Target      : Autochips AC78406
**
**  Environment : GNU
**
*****************************************************************************
*/

/* Entry Point */
ENTRY(Reset_Handler)

/* Partition base address: referenced by startup code to set VTOR */
__APP_FLASH_BASE__ = 0x00080000;

/* Generate a link error if heap and stack don't fit into RAM */
_Heap_Size  = 0;
_Stack_Size = 0x800;

/* Memory areas: FLASH at APP_B (0x00080000), RAM at 0x1FFF8000 */
MEMORY
{
  FLASH (rx) : ORIGIN = 0x00080000, LENGTH = 384K
  RAM  (xrw) : ORIGIN = 0x1FFF8000, LENGTH = 128K
}

/* Define output sections */
SECTIONS
{
  /* Vector table: must be at partition start (VTOR = 0x00080000).
     ARM Cortex-M vector table: MSP @ +0x00, ResetHandler @ +0x04 */
  .isr_vector :
  {
    . = ALIGN(4);
    _vtor_base = .;
    KEEP(*(.isr_vector))
    . = ALIGN(4);
  } >FLASH

  /* The program code and other data goes into FLASH */
  .text :
  {
    . = ALIGN(4);
    *(.text)
    *(.text*)
    *(.rodata)
    *(.rodata*)
    *(.glue_7)
    *(.glue_7t)
    *(.eh_frame)

    KEEP (*(.init))
    KEEP (*(.fini))

    . = ALIGN(4);
    _etext = .;
  } >FLASH

   .ARM.extab   :
   {
     *(.ARM.extab* .gnu.linkonce.armextab.*)
   } >FLASH
    .ARM : {
    __exidx_start = .;
      *(.ARM.exidx*)
      __exidx_end = .;
    } >FLASH

  .preinit_array     :
  {
    PROVIDE_HIDDEN (__preinit_array_start = .);
    KEEP (*(.preinit_array*))
    PROVIDE_HIDDEN (__preinit_array_end = .);
  } >FLASH
  .init_array :
  {
    PROVIDE_HIDDEN (__init_array_start = .);
    KEEP (*(SORT(.init_array.*)))
    KEEP (*(.init_array*))
    PROVIDE_HIDDEN (__init_array_end = .);
  } >FLASH
  .fini_array :
  {
    PROVIDE_HIDDEN (__fini_array_start = .);
    KEEP (*(.fini_array*))
    KEEP (*(SORT(.fini_array.*)))
    PROVIDE_HIDDEN (__fini_array_end = .);
  } >FLASH

  /* used by the startup to initialize data */
  _sidata = .;

  /* Initialized data sections goes into RAM, load LMA copy after code */
  .data : AT ( _sidata )
  {
    . = ALIGN(4);
    _sdata = .;
    *(.data)
    *(.data*)

    . = ALIGN(4);
    _edata = .;
  } >RAM

  /* Uninitialized data section */
  . = ALIGN(4);
  .bss :
  {
    _sbss = .;
    __bss_start__ = _sbss;
    *(.bss)
    *(.bss*)
    *(COMMON)

    . = ALIGN(4);
    _ebss = .;
    __bss_end__ = _ebss;
  } >RAM

  PROVIDE ( end = _ebss );
  PROVIDE ( _end = _ebss );

  /* User_heap_stack section */
  ._user_heap_stack :
  {
    . = ALIGN(4);
    . = . + _Heap_Size;
    . = ALIGN(4);
    _eheap = .;
    . = . + _Stack_Size;
    . = ALIGN(4);
    _estack = .;
  } >RAM

  /DISCARD/ :
  {
    libc.a ( * )
    libm.a ( * )
    libgcc.a ( * )
  }

  .ARM.attributes 0 : { *(.ARM.attributes) }
}
