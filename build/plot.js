// Utility: Treat empty/NA as null
function clean(value) {
  return value === '' || value === 'NA' ? null : value;
}

// Grouping points by 'Art' for color separation
function groupBy(array, key) {
  return array.reduce((acc, obj) => {
    const val = obj[key] || 'Unknown';
    acc[val] = acc[val] || [];
    acc[val].push(obj);
    return acc;
  }, {});
}

// Load CSV with PapaParse and Plot with Plotly
fetch('data.csv')
  .then(response => response.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const data = parsed.data.map(row => ({
      name: row['Kurzname'],
      art: row['Art'],
      x: parseFloat(row['x-Koordinate']),
      y: parseFloat(row['y-Koordinate']),
    })).filter(p => !isNaN(p.x) && !isNaN(p.y));

    const grouped = groupBy(data, 'art');

    const traces = Object.entries(grouped).map(([art, points]) => ({
      x: points.map(p => p.x),
      y: points.map(p => p.y),
      text: points.map(p => p.name),
      mode: 'markers+text',
      type: 'scatter',
      name: art,
      textposition: 'top center',
      marker: { size: 12 },
    }));

    const layout = {
      title: 'POIs by Coordinates',
      xaxis: { title: 'x-Koordinate' },
      yaxis: { title: 'y-Koordinate' },
      legend: { title: { text: 'Art' } }
    };

    Plotly.newPlot('plot', traces, layout);
  });
