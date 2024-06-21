let visibleProducts = [
    "iPhone",
    "PlayStation",
    "Apple II",
    "Cray",
    "Nintendo",
    "Nintendo handheld",
    "NASA",
    "PDP",
    "VAX",
    "IBM PC",
    "Misc"
]

document.addEventListener('DOMContentLoaded', function() {
    fetch('/computers.json')
        .then(response => response.json())
        .then(data => {
            let tickvals = [];
            let ticktext = ['1 byte', '16 bytes', '128 bytes', '1kb', '16kb', '128kb', '1MB', '16MB', '128MB', '1GB', '16GB', '128GB', '1TB', '16TB', '128TB'];
            let shapes = [];
            for (var i=0; i <= 14; i++) {
                tickvals.push(Math.pow(10, i));
//                ticktext.push(''+i);  // center it in the band

                shapes.push({
                    type: 'rect',
                    yref: 'y',
                    x0: '1900',
                    x1: '2100',
                    y0: 0.5*Math.pow(10, i),
                    y1: 3*Math.pow(10, i),
                    fillcolor: 'rgba(0, 0, 70, 0.15)',
                    line: {
                        width: 0  // no border
                    },
                    hoverlabel: { namelength: 0 },
                    hoverinfo: 'none'  // do not display this shape in hover labels
                })
            }

            var traces = []
            var productlines = {};

            data = data.filter(p => p.released && p.ram && visibleProducts.includes(p.product));
            data.sort((a,b) => b.released-a.released) //.released.localeCompare(b.released));
            for (var p of data) {
                if (!p.product) {
                    continue;
                }
                var pl = p.product;
                if (!productlines.hasOwnProperty(pl)) {
                    productlines[pl] = []
                }
                productlines[pl].push(p);
            }

            traces.push({
                name: "Lifetime",
                x: data.map(p => p.released),
                y: data.map(p => p.ram),
                error_x: {
                    type: 'data',
                    symmetric: false,
                    array: data.map(p => p.eol - p.released),
                    color: 'hsla(200, 100%, 50%, 0.25)'
                },
                mode: 'markers',
                type: 'scatter',
                visible: false
            })

            traces.push({
                name: "RAM range",
                x: data.map(p => p.released),
                y: data.map(p => p.ram),
                error_y: {
                    type: 'data',
                    symmetric: false,
                    array: data.map(p => p.ram_max - p.ram),
                    color: 'hsla(100, 100%, 50%, 0.25)'
                },
                mode: 'markers',
                type: 'scatter',
                visible: false
            })

            for (var pl in productlines) {
              var rows = productlines[pl];
              traces.push({
                name: pl,
                x: rows.map(p => p.released),
                y: rows.map(p => p.ram),
                mode: 'markers+lines',
                type: 'scatter',
                hoverinfo: 'text',
                hovertemplate: "%{text}",
                marker: {
                    size: rows.map(p => p.units ? Math.max(4, Math.log10(p.units)) : 4),
                },
                text: rows.map(p => p.model) // hover text
              })
            }


            var layout = {
                title: 'Magnitude',
                margin: { t: 0 },
                xaxis: {
                    title: 'Year',
                    range: ['1960', '2025'],
                }, 
                yaxis: {
                    title: "RAM",
                    type: 'log',
                    tickmode: 'array',
                    tickvals: tickvals,
                    ticktext: ticktext,
                    range: [0, 14]
                },
                shapes: shapes
            }

            let plotdiv = document.getElementById('plot');
            Plotly.newPlot(plotdiv, traces, layout);
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

