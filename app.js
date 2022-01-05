const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

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
        if(err) throw err;
        res.render('index',{
            result
        })
    })
})

app.get('/new',(req,res)=>{
    res.render('new');
})

app.post('/new',(req,res)=>{
    const {name,dob,status} = req.body;
    db.query('INSERT INTO profiles (name,dob,status) VALUES (?,?,?)',[name,dob,status],(err,result)=>{
    if(err) throw err;
    res.redirect('/');
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

app.get('/display/:id',(req,res)=>{
    let id = req.params.id;
    db.query('SELECT * FROM profiles WHERE id = ?',[id],(err,result)=>{
        if(err) throw err;
        res.render('show',{
            result
        })
    })
})

app.put('/:id/toggle/:status',(req,res)=>{
    const id = req.params.id;
    let status = req.params.status;
    if(status == 'Paused'){
        status = 'Active';
    }else{
        status = 'Paused';
    }
    
     db.query('UPDATE profiles SET status = ? WHERE id = ?',[status,id],(err,result)=>{
        if(err) throw err;
        res.redirect('/');
    })
})


app.listen(3000,()=>console.log('Listening on port 3000'))