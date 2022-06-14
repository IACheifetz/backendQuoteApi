const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes = row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return a list of Episodes with quotes
    const { rows } = await pool.query('SELECT * from episodes INNER JOIN quotes ON episodes.id = quotes.episode_id');
    const allEpisodes = [];
    rows.map(row => {
      const episodeIndex = allEpisodes.map(char => char.id).indexOf(row.character_id);
      if (episodeIndex > -1) {
        allEpisodes[episodeIndex].quotes = [...allEpisodes[episodeIndex].quotes, { detail: row.detail }];
      } else {
        allEpisodes.push({
          id: row.character_id, 
          title: row.title, 
          number: row.number,
          season: row.season,
          quotes: [{ detail: row.detail  }] 
        });
      }
    });
    return allEpisodes;
  }
}

module.exports = { Episode };
