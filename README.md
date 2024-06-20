# magnitude of computer technology, 1950-2025

an open source dataset of computer performance from 1940-2025.

a static website with interactive plot.

See it at [magtech.saul.pw](https://magtech.saul.pw).

## pillars

- not completionist, but also not minimalist
- popular and/or beloved
- different categories: mainframe, personal, console, super, VPS
- focus on product lines

## fields

Here's the list of fields.  **Bold** fields are the most important, as they will immediately show up in the graph.

Notes on units:

- units should be included for most numeric fields
- The units for RAM and storage are in bytes: 32 bytes/64kB/128MB/4GB/1TB.
- The units for bandwidth are in **bytes** per second: 30 Bps (for 300 baud), 1MBps (for 10Mbps).  This is normal for memory bandwidth and CPU bandwidth.  For network bandwidth which is often in bits per second, divide by bps by 10 to get Bps.
- Other units will convert automatically, but bps is not converted to Bps in this repo.

# Basic metadata

- **model**: common, distinct name of computer
- **manufacturer**: company that owned/financed/developed product and is associated with the product in the marketplace (not necessarily the literal manufacturer). e.g., "Apple", "Tandy"
- **type**: mainframe, super, PC, console, mobile, cloud
- **product**: product line (to draw a line through); e.g. "iPhone", "TRS-80"
- **released**: release date in ISO format; e.g. "2018-05-31" "1979"
- eol: end-of-life; either end of sales or end of support (ISO format)
- **url**: source of the data in this record (multiple sources allowed)
- **units**: # of units sold/shipped; e.g. "50k" or "5.1m"
- price: price of base configuration; e.g. "US1980$200", where US is country currency (strong preference for US), 1980 is year the price was valid (generally released year), and $200 is the price listed in that currency and year.  Inflation will be calculated automatically at some point.
- size: dimensions of machine; e.g. 92x60x8.1mm (m or mm only)
- mass: mass of machine; e.g. 3.7kg (kg or g only)

### Technical specs

- **flops**: total system FLOPS
- **ram**: number of bytes of RAM in whole system in base RAM configuration (including video RAM)
- **ram_max**: same as ram, but in the max RAM configuration (practical/offered, not hypothetical)
- rom: amount of ROM (Read-Only Memory) in whole system (mostly for early computers)
- cpu: make/model
  - cpu_bits: size of primary registers (always bits--do not specify unit)
  - cpu_freq: CPU frequency (MHz)
  - cpu_process: Process node size (nn or um)
  - cpu_cores: number of CPU/cores
  - cpu_ops: number of arithmetic operations per second (add or div?  div can be 10x+ slower if not hardware)
  - cpu_flops: number of FLOPS (floating point operations per second) per CPU/core
     - note that FLOPS = OPS for computers without hardware floating point (nonfloat ops are just limited range flops)
  - cpu_bandwidth: number of bytes that can be transferred through a single cpu per second (e.g. lz expansion)
- gpu: make/model; subfields same as for cpu except where noted
  - gpu_freq: GPU frequency (MHz)
  - **gpu_ram**: Amount of GPU RAM (bytes)
  - gpu_flops: Number of GPU FLOPS
  - gpu_cores: Number of discrete GPUs in the system
  - gpu_bandwidth: GPU bandwidth to main memory
- **storage**: Amount of read-write storage
- storage_max: Maximum of non-removable storage
- storage_type: Type of RW storage.  e.g. "3.5 FDD" (floppy), "HDD" (hard disk), "SSD" (solid state disk), "flash" (usually NAND flash)
- power: Amount of power required for whole system (non-idle, non-stress), e.g. "34W"
- **battery**: Battery capacity, e.g. "3700mAh"
- **battery_life**: Hours of basic usage
- display: Make/model if produced externally
  - **disp_res**: Resolution in pixels, with color bit depth. e.g. "640x480x4"; or "720p", "1080p", "4K", "8K"
  - disp_type: e.g. LCD, LED, OLED
  - disp_rate: Framerate of output (e.g. 60Hz)
- audio: audio component description
  - audio_bits
  - audio_channels
  - audio_rate
- camera: number of megapixels of best camera
- wifi: Wifi type, e.g. "802.11b/g/n"
- cell: Cellular network connection type, e.g. "3G"
  - cell_bandwidth: bandwidth via cell network
