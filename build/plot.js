// Example value of precsvData:
// const precsvData = `name1,art1,x1,z1,name2,art2,x2,z2\nNether Hub,NetherHub,-95,-113,Nether Hub,NetherHub,-95,-113\n...`;

const parsed = Papa.parse(precsvData.trim(), { header: true });
const rows = parsed.data;
console.log(rows)


const pointMap = {}; // group by art1
const lines = [];

rows.forEach(row => {
  console.log(row)
  const name = (row['name1'] || '').trim();
  const art = (row['art1'] || '').trim();
  const x = parseFloat((row['x1'] || '').trim());
  const y = parseFloat((row['z1'] || '').trim());
  const x2 = parseFloat((row['x2'] || '').trim());
  const y2 = parseFloat((row['z2'] || '').trim());
  console.log(y2)

  if (!isNaN(x) && !isNaN(y)) {
    pointMap[art] = pointMap[art] || { x: [], y: [], text: [], name: art };
    pointMap[art].x.push(x);
    pointMap[art].y.push(y);
    pointMap[art].text.push(name);
  }

  if (!isNaN(x) && !isNaN(y) && !isNaN(x2) && !isNaN(y2)) {
    lines.push({
      x: [x, x2],
      y: [y, y2],
      mode: 'lines',
      type: 'scatter',
      line: { color: 'gray', width: 1 },
      hoverinfo: 'none',
      showlegend: false
    });
  }
});

const pointTraces = Object.values(pointMap).map(group => ({
  ...group,
  mode: 'markers+text',
  type: 'scatter',
  textposition: 'top center',
  marker: { size: 10 },
}));

const layout = {
  title: 'POIs and Their Connections',
  xaxis: { title: 'x' },
  yaxis: { title: 'z' },
  showlegend: true,
};

console.log(lines)

Plotly.newPlot('plot', [...lines, ...pointTraces], layout);
