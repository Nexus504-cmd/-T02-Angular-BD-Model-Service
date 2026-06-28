const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3300;

app.use(express.json());

app.listen(port,(err)=>{
    if(!err){
        console.log('localhost:'+port);
    }
})

const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'Biblioteca',
    port: 3306
})

//Metodo Get
app.get('/autor',
    async(req, res)=>{
        conexion.query('select * from autor',(err,result)=>{
            if(!err){
                res.json(result);
            }
        });
        
    }
)

//Metodo Post

app.post('/autor',
    async(req, res)=>{
        const{nombre,apellido,anio_nacimiento} = req.body;
        const sql = 'insert into autor (nombre, apellido, anio_nacimiento) values(?,?,?)';

        conexion.query(sql,[nombre, apellido,anio_nacimiento],(err,row)=>{
           if(!err){
            console.log('[Post]: Exitoso');
            res.json(row);
           } 

           console.log('Log: '+err);
        });
    }
)


//Metodo Put

app.put('/autor:id',
    async(req,res)=>{
        const id = req.params;
        const {nombre, apellido, anio_nacimiento} = req.body;
        const sql = 'update autor set nombre = ?, apellido = ?, anio_nacimiento = ? where id_autor = ?';

        conexion.query(sql,[nombre, apellido, anio_nacimiento, id], (err, row)=>{
            if(!err){
                console.log('[Put]:Exitoso');
                res.json(row);
            }
            console.log('Log'+err);
        })
        

    }
)

//Metodo Delete

app.delete('/autor:id', 
    async(req, res)=>{
        const id = req.params;

        conexion.query('delete * from autor where id = ?',[id],
            (err, row)=>{
                if(!err){
                    console.log('[Delete]:Exitoso');
                    res.json(row);
                }
                console.log('Log: '+err);
            }
        );

    }
)