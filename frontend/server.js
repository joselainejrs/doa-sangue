//
// Caminhos basicos para criar um Servidor
//

//configurando o servidor
const express = require("express")
const server = express()

//configurar o servidor para apresentar arquivos estáticos
//chamar os arquivos static que são javascript, imagens, css e outros
//Criamos uma pagina aonde vou pedir para rodar os arquivos static
server.use(express.static('public'))


//Habiliar os dados do body(formulario)
//configurando o servidor
//use, seria um passo para chegar ao caminho
server.use(express.urlencoded({ extended: true }))


//conecção ao banco de dados
// O Pool ele é o conector que fica ativo sempre
const Pool = require('pg').Pool
const db = new Pool({
    // passando os dados de entrar do sql e 
    // o nome da tabela criada
    user: 'postgres',
    password: '366152',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

//configurando a templete engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    // Cache é um tipo de inteligencia que o servidor aplica
    //para não ficar repetindo ou analisando danos
    //porque ele acha que vai ficar pesando ou atrapalhando 
    //habilitar a chamada( pedindo para não fazer o cache) 
    noCache: true,
    //o true ele entra no caso de booleano.
    //boolean ou booleano que só aceita 2 valores,verdadeiro ou falso
})

//
//
// Arry= são dados que vao colecionar outro dados []
//lista de doadores: lista de vetor ou array
// const donors =[
//     {
//         name: "Diego Fernandes",
//         blood: "AB+"
//     },
//     {
//         name: "Roberto Ferreira",
//         blood:"A+"
//     },
//     {
//         name: "Benatina Goeis",
//         blood: "B-"
//     },
//     {
//         name: "Fernanda Giboa",
//         blood:"O+"
//     },
// ]
//
//


//Configurar a apresentação da página
server.get("/", function (req, res) {
    
    db.query("SELECT * FROM donors", function (err, result) {

    if (err) return res.send("erro no banco de dados.")

    const donors = result.rows
    //pedi para mostar o index
    //pedir por 2 segundo mostrar objeto dentro {} 
    return res.render("index.html", { donors })
    //render= renderizar
    })

})

server.post("/", function (req, res) {
    //pegar dados do formulario
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //verificando a variavel, se está vazia ou não
    //SE o name igual a vazio
    //OU o email igual a vazio
    //OU o blood igual a vazio
    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

    //pegando valores dentro do banco de dados
    const query =
        `INSERT INTO donors ("name", "email", "blood") 
         VALUES ($1, $2 , $3)`

    const values = [name, email, blood]

    db.query(query, values, function (err) {
        //flixo de erro
        if (err) return res.send("erro no banco de dados.")

        //fluxo ideal
        return res.redirect("/")
    })

})

//
//
// colocando valores dentro do array, 
//assim que alguem preencher o formulario o push
// automaticamente irá colocar valor
//     donors.push({
//         name: name,
//         blood: blood,
//     })

//     return res.redirect("/")
// })
//
//


// para rodar tem colocar (node e o nome do arquivo)
//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function () {
    // isso vai aparecer no terminal
    console.log("iniciei o servidor.")
})
//
// Dentro do  arquivo pockage.json
//Será feito um atalho para rodar
// Na opção script
// "scripts": {
//     "start": "nodemon server.js"
//   },
//