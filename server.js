const express = require("express")
const UUID = require('uuid')
const app = express()
const Port = 3000

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', async(req, res) => {
    res.redirect(`/${UUID.v4()}`)
})

app.get('/:id', async (req, res) => {
    const Param = req.params.id
    res.render('existingDocument', {Params: Param})
})

app.listen(Port)