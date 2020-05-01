//Express  para criar e configurar o Servidor
const express= require("express")
const server = express()

const ideas = [
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequuntur aliquam omnis cum fuga recusandae, illo doloribus quae optio perferendis iste cumque sint voluptate dolor praesentium modi dolores, accusantium aut?",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title:"Exercícios",
        category:"Saúde",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequuntur aliquam omnis cum fuga recusandae, illo doloribus quae optio perferendis iste cumque sint voluptate dolor praesentium modi dolores, accusantium aut?",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title:"Meditação",
        category:"Mentalidade",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequuntur aliquam omnis cum fuga recusandae, illo doloribus quae optio perferendis iste cumque sint voluptate dolor praesentium modi dolores, accusantium aut?",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title:"Karaokê",
        category:"Diversão em Família",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequuntur aliquam omnis cum fuga recusandae, illo doloribus quae optio perferendis iste cumque sint voluptate dolor praesentium modi dolores, accusantium aut?",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title:"Pintura",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequuntur aliquam omnis cum fuga recusandae, illo doloribus quae optio perferendis iste cumque sint voluptate dolor praesentium modi dolores, accusantium aut?",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title:"Recortes",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequuntur aliquam omnis cum fuga recusandae, illo doloribus quae optio perferendis iste cumque sint voluptate dolor praesentium modi dolores, accusantium aut?",
        url:"https://rocketseat.com.br"
    }
]

//configurar arquivos estáticos (css,scripts, images)
server.use(express.static("public"))

//configuração do Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views",{
    express: server,
    noCache: true, //boolean
})

//Criando rota /
//Capturando o pedido do cliente e respondendo
server.get("/", function(req, res){

    const reversedIdeas = [...ideas].reverse()//evita reverte toda vez q atualiza a página, array espalha as ideias, não é a mesma referencia de ideas

    let lastIdeas = []
    for(let idea of reversedIdeas){ // inverte a exibição das últimas ideias
        if(lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    //console.log(lastIdeas)
    return res.render("index.html", { ideas:lastIdeas })
})

server.get("/ideias", function(req, res){

    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html", { ideas: reversedIdeas})
})
//Liguei o servidor na porta 3000
server. listen(3000)

