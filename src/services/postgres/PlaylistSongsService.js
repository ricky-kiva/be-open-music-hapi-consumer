'use strict';

const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getAll(playlistId) {
    const q = {
      text: `
        SELECT songs.id, songs.title, songs.performer FROM songs
        INNER JOIN playlist_songs ON playlist_songs.song_id = songs.id
        WHERE playlist_songs.playlist_id = $1
      `,
      values: [playlistId]
    };

    const result = await this._pool.query(q);

    return result.rows;
  }
}

module.exports = PlaylistSongsService;
