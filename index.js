const { text, response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
//const session = require('express-session')

const app = express();

//renderizar as coisas
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views')) //render


app.use(bodyParser.urlencoded({extended:true})) //pegar o login
app.use(express.static(__dirname + '/public')); //upar css e js
app.use(express.static(__dirname + '/CafeMenu')); //upar css e js

var pedidos = require('./public/js/pedidos.js')

let carrinho = ["Seus pedidos: "];
let prices = [];

app.listen(8888, function(erro) { //ligar o servidor
    if (erro) {
        console.log('Erro ao iniciar o servidor')
    } else {
        console.log('Servidor online.')
    }
})



app.get('/cadastro', function(request, response){
    response.render('cadastro') //Completar a tela de cadastro [nao ta pronta]
})

app.get('/contato', function(request, response){
    response.render('contato') //Rota contato
})

app.get('/time', function(request, response){
    response.render('time') //Rota time
})

app.get('/sobre', function(request, response){
    response.render('sobre') //Rota sobre
})




app.post('/', function(request, response) { //rota de login (login pre definido)
  
    const login = 'admin';
    const password = 123;
    if (request.body.login == login && request.body.password == password) {
        //Logado c sucesso
        console.log('Logado com sucesso')
        response.redirect('/home')

    } else {
    console.log('Login inválido')
    response.render('login')
    } 
    

})

app.get('/', function (request, response) {
    response.render('login');

    if (request.body.session) {
        response.sendFile(path.join(__dirname + '/index.html'))

    }
})


app.get("/home", function(request, response){ //rota home
    response.sendFile(path.join(__dirname + '/index.html'))
    
})


app.get("/cardapio", function(request, response){ //rota de cardapio
    const itens = ["French Vanilla", "Caramel Macchiato", "Pumpkin Spice ", "Hazelnut", "Mocha"];
    console.log(carrinho)
    console.log(prices)
    response.render('cafemenu');
    
})


app.get("/cardapio/pedido", function(request, response){ //rota de pedido
    const itens = 
    [" 0 - French Vanilla",
     " 1 - Caramel Macchiato", 
     " 2 -Pumpkin Spice ", 
     " 3 -Hazelnut", 
     " 4 - Mocha",
     " 5 - Express"];

    //Gerar uma interface gráfica para os pedidos
    response.render('pedido')
    //response.send("Escolha o seu café:" + itens)    
    console.log(itens)                                                                            //" <br><input type='text' id='pedido'> " + " <br><button onclick='pedido()'>Escolher</button>") //concatenar. nao envia 2 sends
 
})


app.get("/cardapio/pedido/:index", function(request, response){ //fazer o pedido (localhost:8888/cardapio/pedido/[numero do item])
    const itens = [" 0 - French Vanilla",
     " 1 - Caramel Macchiato", 
     " 2 -Pumpkin Spice ", 
     " 3 -Hazelnut", 
     " 4 - Mocha",
     " 5 - Express"];

    const {index} = request.params;
    if(index == 0) {
            response.render('vanilla');
            let valor = pedidos.valor(0);
            console.log('Você escolheu o café: ' + itens[index])   


            }else if (index == 1) {
            response.render('caramel');
            let valor = pedidos.valor(1);
            console.log('Você escolheu o café: ' + itens[index])                                                                       


             } else if (index == 2) {
            response.render('pumpkin');
            let valor = pedidos.valor(2);
            console.log('Você escolheu o café: ' + itens[index])                                                                          
             } else if (index == 3) {
            response.render('hazelnut')
            let valor = pedidos.valor(3);
            console.log('Você escolheu o café: ' + itens[index])                                                                          

             } else if (index == 4) {
            response.render('mocha')
            let valor = pedidos.valor(4);
            
            console.log('Você escolheu o café: ' + itens[index])       
                                                                               

            } else if (index == 5) {
            response.render('leite')
            let valor = pedidos.valor(5);
            console.log('Você escolheu o café: ' + itens[index])                                                                          


            } else if (index > 5) {
                response.send('<h1>Item não registrado</h1>')
            }
    
    //Gerar uma interface gráfica interativa para escolher um pedido

})

app.post('/adicionar', function(req, res) {
    carrinho.push(req.body.add);
    carrinho.join(',');
    
    prices.push(req.body.addPrice)
    
    res.redirect('/cardapio');

})

app.get('/sobremesa', function(req, res){
    const sobremesa = [ "0 - Donut ",
    " 1 - Cherry Pie",
    " 2 - Cinnammon Roll",
    " 3 - Cheesecake"
    ]
    console.log(sobremesa);
    res.render('sobremesa')
})

app.get('/conta', function(req, res){
    var conta = 0;
    var numberPrice = [];

    for (let i = 0; i < prices.length; i++) {
        numberPrice.push(parseFloat(prices[i]));

    }
    
    
    for(let i = 0; i < prices.length; i++) {
        conta += numberPrice[i];
        
    }
    res.render('Sua conta foi: ' + conta)
})




   






