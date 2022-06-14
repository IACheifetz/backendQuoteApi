const pool = require('../utils/pool');


class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    //this.quotes = row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return all characters with a list of quotes
    const { rows } = await pool.query('SELECT * from characters INNER JOIN quotes ON characters.id = quotes.character_id');
    const allCharacters = [];
    rows.map(row => {
      const characterIndex = allCharacters.map(char => char.id).indexOf(row.character_id);
      if (characterIndex > -1) {
        allCharacters[characterIndex].quotes = [...allCharacters[characterIndex].quotes, { episode_id: row.episode_id, detail: row.detail }];
      } else {
        allCharacters.push({
          id: row.character_id, 
          first_name: row.first_name, 
          last_name: row.last_name,
          quotes: [{  episode_id: row.episode_id, detail: row.detail  }] 
        });
      }
    });
    return allCharacters;
  }
}

module.exports = Character;
