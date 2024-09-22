'use strict';

const autoBind = require('auto-bind');

class Listener {
  constructor(playlistsService, playlistSongsService, mailSender) {
    this._playlistsService = playlistsService;
    this._playlistSongsService = playlistSongsService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistsService.getById(playlistId);
      const songs = await this._playlistSongsService.getAll(playlistId);

      const sendMessage = {
        playlist: {
          ...playlist,
          songs
        }
      };

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(sendMessage)
      );

      // eslint-disable-next-line no-console
      console.log(result);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

module.exports = Listener;
