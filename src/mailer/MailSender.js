'use strict';

const nodemailer = require('nodemailer');
const config = require('../utils/config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password
      }
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Rickyslash Project - Open Music API',
      to: targetEmail,
      subject: 'Playlist Export - Open Music API',
      text: 'The exported playlist is attached to this email',
      attachments: [
        {
          filename: 'playlist.json',
          content
        }
      ]
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
