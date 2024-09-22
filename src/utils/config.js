'use strict';

const config = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD
  },
  rabbitMQ: {
    server: process.env.RABBITMQ_SERVER
  }
};

module.exports = config;
