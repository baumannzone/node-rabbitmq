const amqp = require('amqplib/callback_api')

const ip = '10.32.4.7'
const port = 5672
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
    var msg = 'Hello World!'

    ch.assertQueue(q, {durable: false})
    ch.sendToQueue(q, Buffer.from(msg))
    console.log(" [x] Sent %s", msg)
  })

  setTimeout(() => {
    conn.close()
    process.exit(0)
  }, 500)
})
