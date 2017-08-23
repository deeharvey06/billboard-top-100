const request = require('request');
const cheerio = require('cheerio');

const baseUrl = 'http://www.billboard.com/charts/';

// list all data from requested chart

const getChart = function (chart, date, cb) {
  let result;
  if (typeof date === 'function') {
    cb = date;
    date = '';
  }

  let songs = [];
  let titles = [];
  let artists = [];
  let covers = [];
  let ranks = [];
  let positions = [];

  request(`${baseUrl + chart}/${date}`, (error, response, html) => {
    const $ = cheerio.load(html);

    $('.chart-row__song').each(function (index, item) {
      let songName = $(this).text().replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ');
      while (songName[0] === ' ') { songName = songName.substr(1); }
      titles.push(songName);

      $(item).closest('article').find('.chart-row__secondary > div').each((_, item) => {
        const positionInfo = {};
        $(item).children('div').each((_, item) => {
          positionInfo[$('span:first-child', item).text()] = $('span:last-child', item).text();
        });
        positions.push(positionInfo);
      });
    });

    $('.chart-row__current-week').each(function (index) {
      ranks.push($(this).text().replace(/\r?\n|\r/g, '').replace(/\s+/g, ' '));
    });

    $('.chart-row__artist').each(function (index) {
      let artistName = $(this).text().replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ');
      while (artistName[0] === ' ') { artistName = artistName.substr(1); }
      if (artistName[artistName.length - 1] == ' ') {
        artistName = artistName.substring(0, artistName.length - 1);
      }
      artists.push(artistName);
    });

    $('.chart-row__image').each(function (index) {
      const style = $(this).attr('style');
      if (style) {
        let songCover = style.replace('background-image: url(http://', '').replace(')', '');
      } else {
        const data = $(this).attr('data-imagesrc');
        if (data) {
          let songCover = data.replace('http://', '');
        }
      }
      covers.push(songCover);
    });

    if (titles.length > 1) {
      for (let i = 0; i < titles.length; i += 1) {
        const song = {
          rank: ranks[i],
          title: titles[i],
          artist: artists[i],
          cover: covers[i],
        };
        const positionInfo = positions[i];
        if (positionInfo) {
          song.position = positionInfo;
        }
        songs.push(song);

        if (i == titles.length - 1) {
          cb(songs);
        }
      }
    } else {
      cb([], 'no chart found');
    }
  });
};

// list the available charts

const listCharts = function (cb) {
  request(baseUrl, (error, response, html) => {
    const charts = {};
    if (error) {
      cb(charts, error);
      return;
    }
    const $ = cheerio.load(html);
    const prefixOfLink = '/charts/';

    $('#main-wrapper :header').each((_, head) => {
      const links = [];
      $(head).nextUntil(':header', ':has(a)').each((_, item) => {
        const address = $('a', item).attr('href') || '';
        let startIndex = -1;
        if ((startIndex = address.indexOf(prefixOfLink)) !== -1) {
          links.push(address.substring(startIndex + prefixOfLink.length));
        }
      });
      charts[$(head).text()] = links;
    });
    if (typeof cb === 'function') {
      cb(charts);
    }
  });
};


module.exports = {
  getChart,
	listCharts
};