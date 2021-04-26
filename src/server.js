const express = require('express')
const app = express()
const porta = 3000
app.use(express.json({extends: true}))

app.get('/', (req, res)=>{
    res.json({messege:'Tudo certo!'})
})

app.post('/cadastrar', (req, res)=>{
    const {nome, preco} = req.body
    console.log({nome, preco})
    res.send({nome, preco})
})



app.listen(porta, function(){
    console.log(`Rodando na porta ${porta}`)
})