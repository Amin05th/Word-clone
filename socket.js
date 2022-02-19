const mongoose = require("mongoose")
const WordDocument = require("./document")
const autocorrect = require("autocorrect")()
const PortForSocketIo = 3002

const DefaultValue = ""

mongoose.connect('mongodb://localhost/worddocuments')
const io = require("socket.io")(PortForSocketIo, {
    cors: {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
    }
    }
})

io.on("connection", socket => {
    socket.on('Send-Paramcode', param => {
        const document = UpdateorCreateFile(param)
        document.then(data => {socket.emit('send-database-data', autocorrect(data.value))})
        socket.join(param)

        socket.on("Changed-Text", delta => {
            socket.broadcast.to(param).emit("Broadcast-changed-changes", delta)
        })

        socket.on('save-document', async value => {
            await WordDocument.findByIdAndUpdate(param, {value: value.ops[0].insert})            
        })
    })
})

async function UpdateorCreateFile(id){
    if(id == null) return

    const document = await WordDocument.findById(id)
    if(document) return document
    return await WordDocument.create({ _id: id, value: DefaultValue})
}