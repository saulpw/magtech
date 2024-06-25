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
    "IBM PC"
]

const ops_units = ['1', '10', '100', '1K', '10K', '100K', '1M', '10M', '100M', '1G', '10G', '100G', '1T', '10T', '100T'];
const ram_units = ['1 byte', '16 bytes', '128 bytes', '1kb', '16kb', '128kb', '1MB', '16MB', '128MB', '1GB', '16GB', '128GB', '1TB', '16TB', '128TB'];

document.addEventListener('DOMContentLoaded', function() {
    fetch('/computers.json')
        .then(response => response.json())
        .then(data => {
            data = data.filter(p => p.released);
            createGraph('ram', data, 'RAM', 'ram', 'ram_max', ram_units)
            createGraph('ops', data, 'OPS', 'ops', 'ops_max', ops_units)
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

function setGraph() {
    let chosenid = document.getElementById("magdropdown").value;
    // for all class="plot", add class="hidden"
    // for single id=chosenid, remove class="hidden"
    document.querySelectorAll(".plot").forEach((x) => {
        x.classList.add("hidden");
    })
    let plotdiv = document.getElementById(chosenid);
    plotdiv.classList.remove('hidden');
    Plotly.restyle(plotdiv)
        .catch(error => console.error('Error restyling:', error));
}

function createGraph(divname, data, title, lower_key, upper_key, ticktext) {
    let tickvals = [];
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

    data = data.filter(p => p[lower_key]);
    data.sort((a,b) => b.released-a.released) //.released.localeCompare(b.released));
    for (var p of data) {
        var pl = p.product;
        if (!visibleProducts.includes(pl)) {
            pl = p.model; // no line but all drawn
        }
        if (!productlines.hasOwnProperty(pl)) {
            productlines[pl] = []
        }
        productlines[pl].push(p);
    }

    traces.push({
        name: "Lifetime",
        x: data.map(p => p.released),
        y: data.map(p => p[lower_key]),
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
        y: data.map(p => p[lower_key]),
        error_y: {
            type: 'data',
            symmetric: false,
            array: data.map(p => p[upper_key] - p[lower_key]),
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
        y: rows.map(p => p[lower_key]),
        mode: 'markers+lines',
        type: 'scatter',
        hoverinfo: 'text',
        hovertemplate: "%{text}",
        marker: {
            size: rows.map(p => p.units ? Math.max(4, Math.log10(p.units)) : 4),
        },
        showlegend: rows.length > 1,
        text: rows.map(p => p.model) // hover text
    
      })
    }


    var layout = {
        title: 'Magnitude',
        margin: { t: 0 },
        legend: {
            y: 0.8,
        },
        xaxis: {
            title: 'Year',
            range: ['1960', '2025'],
        }, 
        yaxis: {
            title: title,
            type: 'log',
            tickmode: 'array',
            tickvals: tickvals,
            ticktext: ticktext,
            range: [0, 14]
        },
        shapes: shapes
    }

    let plotdiv = document.getElementById(divname);
    Plotly.newPlot(plotdiv, traces, layout);
}
