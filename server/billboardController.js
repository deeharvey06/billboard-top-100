let billboard = require("billboard-top-100").getChart;
let listCharts = require('billboard-top-100').listCharts;

let billboardController = {};

billboardConstoller.Pop = (req, res) =>  {
  if (err) throw new Error();
  billboard('Pop', (err, song )=> {
    res.send(song);
  });
}

// Country: 'Country'
billboardController.Country = (req, res) =>  {
  billboard('Country', (err, song )=> {
    res.send(song);
  });
}
// Rock: 'Rock'
billboardController.Rock = (req, res) =>  {
  billboard('Rock', (err, song )=> {
    res.send(song);
  });
}
// R&B/Hip-Hop: 'R&B/Hip-Hop'
billboardController.RBHH = (req, res) =>  {
  billboard('R&B/Hip-Hop', (err, song )=> {
    res.send(song);
  });
}
// Dance/Electronic: 'Dance/Electronic'
billboardController.DanceElec = (req, res) =>  {
  billboard('Dance/Electronic', (err, song )=> {
    res.send(song);
  });
}
// Latin: 'Latin'
billboardController.Latin = (req, res) =>  {
  billboard('Latin', (err, song )=> {
    res.send(song);
  });
}

// Greatest of All Time Billboard 200 Albums: 'greatest-billboard-200-albums'
billboardController.greatestBillboard200Albums = (req, res) => {
  billboard('greatest-billboard-200-albums', (err, song )=> {
    res.send(song);
  });
}

// Greatest of All Time Billboard 200 Artists: 'greatest-billboard-200-artists'

// Greatest of All Time Hot 100 Artists: 'greatest-hot-100-artists'

// Greatest of All Time Hot 100 Singles: 'greatest-hot-100-singles'

// Billboard 200: 'billboard-200'

// Artist 100: 'artist-100'

// Radio Songs: 'radio-songs'

// Billboard Twitter Real-Time: 'billboard-twitter-realtime'

// The Hot 100: 'hot-100'
