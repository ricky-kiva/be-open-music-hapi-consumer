'use strict';

const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getById(id) {
    const q = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [id]
    };

    const result = await this._pool.query(q);

    return result.rows[0];
  }
}

module.exports = PlaylistsService;
