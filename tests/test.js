const billboard = require('../billboard-top-100.js').getChart;
const listCharts = require('../billboard-top-100.js').listCharts;

listCharts((data) => {
  console.log(data);
});

billboard('hot-100', '2016-11-19', (songs, err) => {
  if (err) console.log(err);
  console.log(songs);
});
