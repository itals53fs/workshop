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
    const {name, preco} = req.body;
    
    const id = Math.random().toString(32).substr(2, 9);


    const produtos = lerArquivos();
    produtos.push({id, name, preco})

    escreverArquivo(produtos);
   
    res.send({name, preco});
})




app.listen(porta, function(){
    console.log(`Rodando na porta ${porta}`)
})