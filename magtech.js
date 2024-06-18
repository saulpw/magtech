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
                    fillcolor: 'rgba(0, 0, 70, 0.05)',
                    line: {
                        width: 0  // no border
                    },
                    hoverlabel: { namelength: 0 },
                    hoverinfo: 'none'  // do not display this shape in hover labels
                })
            }

            let plotdiv = document.getElementById('plot');
            Plotly.newPlot(plotdiv, {
            data: [ {
                name: '',
                x: data.map(p => p.released),
                y: data.map(p => p.ram),
                mode: 'markers',
                type: 'scatter',
                transforms: [{
                    type: 'groupby',
                    groups: data.map(p => p.type),
                    styles: [
                        {target: 'PC', value: {marker: {color: 'green'}}},
                        {target: 'mainframe', value: {marker: {color: 'maroon'}}},
                        {target: 'supercomputer', value: {marker: {color: 'red'}}},
                        {target: 'console', value: {marker: {color: 'blue'}}},
                        {target: 'mobile', value: {marker: {color: 'teal'}}},
                        {target: 'server', value: {marker: {color: 'lime'}}},
                        {target: 'embedded', value: {marker: {color: 'black'}}},
                    ]
                }],
                marker: {
                    size: data.map(p => p.units ? Math.max(4, Math.log10(p.units)) : 4),
                },
                hoverinfo: "text",
                hovertemplate: "%{text}",
                text: data.map(p => p.computer) // hover text
            }],
            layout: {
                title: 'Magnitude',
                margin: { t: 0 },
                xaxis: {
                    range: ['1940', '2025'],
                    type: 'date'
                }, 
                yaxis: {
                    label: "RAM",
                    type: 'log',
                    tickmode: 'array',
                    tickvals: tickvals,
                    ticktext: ticktext,
                    range: [0, 14]
                },
                shapes: shapes
            }});


        })
        .catch(error => console.error('Error loading JSON data:', error));
});

