const express = require('express') //importa o modulo express

const server = express()

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'felipe',
    password: '123456',
    database: 'projeto'
})

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

server.use(express.json())

connection.query('SELECT * FROM jogador', function(err, rows, fields){
    if(!err){
        console.log("Resultado", rows);

        server.get('/users',(req, res) => {  //cria a rota user que gera um consolelog testando
    
            return res.json({rows})
        })

    }else{
        console.log("Erro ao realizar a consulta");
    }
})


server.listen(3000, () => console.log('servidor rodando na porta 3000')) // escuta aporta 3000