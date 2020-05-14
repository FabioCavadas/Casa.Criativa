const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./casacriativa.db')

db.serialize(function(){
    
    //Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
    
//     //deletar um dado da tabela
//     db.run(`delete from ideas where id = ?`, [1], function(err){
//         if (err) return console.log(err)

//         console.log("deletei", this)
//     })

//   //consultar dados na tabela
//    db.all(`select * from ideas`, function(err, rows){
//        if (err) return console.log(err)

//        console.log(rows)
//    })
   
})

module.exports = db