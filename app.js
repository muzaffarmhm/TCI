const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: false}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tci'
})

db.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
})

app.get('/',(req,res)=>{
      db.query('SELECT * FROM profiles',(err,result)=>{
         console.log(result);
        if(err) throw err;
        res.render('index',{
        result
        })
    })
})

app.get('/paused',(req,res)=>{
    db.query('SELECT * FROM profiles WHERE status = "paused"',(err,result)=>{
        if(err) throw err;
        res.render('paused',{
            result
        })
    })
})


app.listen(3000,()=>console.log('Listening on port 3000'));