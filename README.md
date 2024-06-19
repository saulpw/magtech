# magnitude of computer technology, 1950-2025

an open source dataset of computer performance from 1950-2025.

a static website with interactive plot.

See it at magtech.pw.

## pillars

- not completionist, but also not minimalist
- popular and/or beloved
- different categories: mainframe, personal, console, super, VPS
- focus on product lines

## fields

Here's the list of fields.  **Bold** fields are the most important, as they will immediately show up in the graph.

- **computer**: common, distinct name of computer
- **manufacturer**: company that owned/financed/developed product and is associated with the product in the marketplace, not necessarily the literal manufacturer. (e.g., Apple for iPhone, not FoxConn)
- **type**: mainframe, super, PC, console, mobile, cloud
- **product**: product line (to draw a line through)
- **released**: release date (ISO YYYY-MM-DD format; year only is fine)
- eol: end-of-life; either end of sales or end of support (ISO format)
- **url**: source of the data in this record(multiple sources allowed)
- **units**: units sold/shipped
- price: USYYYY$####: price of base configuration, where US is country (strong preference for US), YYYY is year the price was listed, and #### is the listed price.  Inflation can be calculated automatically at some point.
- size: ##.#x##.#x##.#m (metric units, m or mm, only)
- mass: ##.#kg (metric units, kg or g, only)

### Technical specs
- flops
- cpu: make/model
- cpu_bits: size of primary registers
- cpu_speed: ###MHz
- cpu_process: ##nm (process node)
- cpu_cores: number of CPUs/cores
- cpu_flops:
- cpu_ops
- cpu_ips
- cpu_bandwidth
- **ram**: ##GB (bytes/kB/MB/GB/TB) base RAM configuration (including video RAM)
- ram_max: max RAM configuration (practical/offered, not merely theoretical)
- ram_speed: ##GBps (use "Bps" units, Bytes/s, not bps bits/s)
- display
- screen
- graphics
- gpu
- gpu_speed
- gpu_flops
- gpu_cores
- gpu_ram
- res_text
- res
- resolution
- storage
- storage_type
- sound_bits
- sound_channels
- sound_rate
- rom
- colors
- storage_max
- wifi
- camera
- battery: ###mAh
- battery_life: ###h (hours of basic usage)
- bandwidth
- power: ###W
- ips
- display_type
- display_rate
