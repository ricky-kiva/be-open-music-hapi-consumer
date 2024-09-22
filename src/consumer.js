'use strict';

require('dotenv').config();

const amqp = require('amqplib');
const config = require('./utils/config');
const Listener = require('./rabbitmq/listener');
const MailSender = require('./mailer/MailSender');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const PlaylistSongsService = require('./services/postgres/PlaylistSongsService');

const init = async () => {
  const playlistsService = new PlaylistsService();
  const playlistSongsService = new PlaylistSongsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, playlistSongsService, mailSender);

  const conn = await amqp.connect(config.rabbitMQ.server);
  const channel = await conn.createChannel();

  const queue = 'export:playlist';

  await channel.assertQueue(queue, {
    durable: true
  });

  channel.consume(queue, listener.listen, { noAck: true });
};

init();
