document.addEventListener('DOMContentLoaded', function() {
    fetch('/computers.json')
        .then(response => response.json())
        .then(data => {
            var year = data.map(p => p.year);
            var ram = data.map(p => p.ram);
            var hover = data.map(p => p.computer);
            var manu = data.map(p => p.manufacturer);

            let tickvals = [];
            let ticktext = [];
            let shapes = [];
            for (var i=0; i <= 13; i++) {
                tickvals.push(Math.pow(10, i));
                ticktext.push(''+i);
                if (i % 2 == 0) {
                  shapes.push({
                    type: 'rect',
                    yref: 'y',
                    x0: 1900,
                    x1: 2100,
                    y0: Math.pow(10, i),
                    y1: Math.pow(10, i+1),
                    fillcolor: 'rgba(0, 0, 70, 0.05)',
                    line: {
                        width: 0  // no border
                    },
                    hoverlabel: { namelength: 0 },
                    hoverinfo: 'none'  // do not display this shape in hover labels
                  })
                }
            }

            let plotdiv = document.getElementById('plot');
            Plotly.newPlot(plotdiv, { data: [ {
                name: '',
                x: year,
                y: ram,
                mode: 'markers',
                type: 'scatter',
                transforms: [{
                    type: 'groupby',
                    groups: manu,
                    styles: [
                        {target: 'Nintendo', value: {marker: {color: 'blue'}}},
                        {target: 'Sony', value: {marker: {color: 'red'}}},
                        {target: 'Apple', value: {marker: {color: 'green'}}},
                    ]
                }],
                marker: {
                    color: 'brown',
                    size: 4
                },
                hoverinfo: "text",
                hovertemplate: "%{text}",
                text: hover
            }],
            layout: {
                title: 'Magnitude',
                margin: { t: 0 },
                xaxis: {
                    range: [1940, 2025]
                }, 
                yaxis: {
                    label: "RAM",
                    type: 'log',
                    tickmode: 'array',
                    tickvals: tickvals,
                    ticktext: ticktext,
                    range: [0, 13]
                },
                shapes: shapes
            }});


        })
        .catch(error => console.error('Error loading JSON data:', error));
});

