const { exec } = require('child_process')
console.log('Servidor iniciado en el puerto 3000')

const io = require('socket.io')(3000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('A user connected!')

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`)

    if (message === 'Hello, server!') {
      console.log('apagando')

      exec('shutdown /s /t 0', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error: ${err}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
      })
    }
    socket.broadcast.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected!')
  })
})
