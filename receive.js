#!/usr/bin/env node

var amqp = require('amqplib/callback_api')

const ip = '10.32.4.7'
const port = '5672'
const user = 'a360b'
const pass = 'password'
const credential = `${user}:${pass}`
const rabbitUrl = `amqp://${credential}@${ip}:${port}`

amqp.connect(rabbitUrl, (err, conn) => {
  if (err) {
    console.log('ERROR:')
    console.log(err)
    return
  }

  console.log('>>>>>>>>>>>>>>>')
  console.log('CONECTADO >>>>>')
  console.log('>>>>>>>>>>>>>>>')

  conn.createChannel((err, ch) => {
    var q = 'hello'

    ch.assertQueue(q, {durable: false})
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q)

    ch.consume(q, (msg) => {
      console.log(" [x] Received %s", msg.content.toString())
    }, {noAck: true})

  })
})
