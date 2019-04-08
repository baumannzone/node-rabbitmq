'use strict'

const context = require('rabbit.js')
  .createContext('amqp://10.32.4.7:')

const pub = context.socket('PUBLISH');
const sub = context.socket('SUBSCRIBE');

context.on('ready', function() {
  sub.pipe(process.stdout);
  sub.connect('events', function() {
    pub.connect('events', function() {
      pub.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
    });
  });
});

const controller = {}

// Index
controller.index = (req, res, next) => {
  const data = {
    title: 'Node - RabbitMQ!',
    subtitle: 'Welcome to NodeRabbit 🦄️🍕'
  }
  res.render('index', data)
}

// Demo function
controller.demo = (req, res, next) => {
  console.log('<<<<<<<<<<< CONTEXT >>>>>>>>>>>')
  console.log(context)
  res.json({hola: 'mundo'})
}

module.exports = controller
