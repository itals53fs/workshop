const express = require('express')
const app = express()
const porta = 3000;

const fs = require('fs')
app.use(express.json({extends: true}));

const lerArquivos = () =>{
    const produtos = fs.readFileSync('./src/data/items.json', 'utf8');
    return JSON.parse(produtos);
}

const escreverArquivo = (conteudo) =>{
    const escreverConteudo = JSON.stringify(conteudo, null, 2);
    const produto = fs.writeFileSync('./src/data/items.json', escreverConteudo, 'utf8')
}

app.get('/', (req, res)=>{
    res.send({messege:'Tudo certo!'})
})

app.get('/produtos', (req,res) =>{
    const produtos = lerArquivos();
    res.send(produtos)
})

app.get('/produtos/:id', (req,res)=>{

    const {id} = req.params;
    const produtos = lerArquivos();

    const itemSelecionado = produtos.find( item => item.id == id )

    if (!itemSelecionado){
        return res.status(501).send({messagem: "Produto não encontrado!"})
    }

    return res.status(200).send(itemSelecionado);

})

app.post('/cadastrar', (req, res)=>{
    const {nome, preco} = req.body;
    
    const id = Math.random().toString(32).substr(2, 9);


    const produtos = lerArquivos();
    produtos.push({nome, preco, id})

    escreverArquivo(produtos);
   
    res.send({nome, preco});
})

app.put('/alterar', (req, res)=>{

    const {nome, preco, id} = req.body
    const produto = lerArquivos()

    const itemselecionado = produto.findIndex(element => element.id === id)

    produto[itemselecionado] = {
        nome,
        preco,
        id
    }

    escreverArquivo(produto)
    res.send(produto)

})

app.delete('/deletar/:id', (req, res)=>{
    const {id} = req.params
    const produto = lerArquivos()

    const itemselecionado = produto.findIndex(element =>element.id === id)

    if(itemselecionado>-1){
        produto.splice(itemselecionado,1)
        escreverArquivo(produto)

    }else{
       return res.status(500).send({messege: "not foaud"}) 
    }

    res.send()
})

app.listen(porta, function(){
    console.log(`Rodando na porta ${porta}`)
})