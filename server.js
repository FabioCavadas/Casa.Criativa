//Express  para criar e configurar o Servidor
const express= require("express")
const server = express()
const db = require("./db")

//configurar arquivos estáticos (css,scripts, images)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//configuração do Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views",{
    express: server,
    noCache: true, //boolean
})

//Criando rota /
//Capturando o pedido do cliente e respondendo
server.get("/", function(req, res){
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
    
       const reversedIdeas = [...rows].reverse()

       let lastIdeas = []
       for(let idea of reversedIdeas){
           if(lastIdeas.length < 2) {
               lastIdeas.push(idea)
           }
       }   
       //console.log(lastIdeas)
       return res.render("index.html", { ideas:lastIdeas })

    })
    
})

server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas})
    })
})

server.post("/", function(req, res){
    //Inserir dado na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link             
        )VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        return res.redirect("/ideias")
    })
    
})

//Liguei o servidor na porta 3000
server. listen(3000)

