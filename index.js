const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const db=require('./config/db')
const book=require('./routes/book');
const inventory=require('./routes/inventory');
const issue=require('./routes/issueroute');
const sales=require('./routes/sales');
const stall=require('./routes/stall')
db();
app.use(express.json())
app.use(cors())
app.use('/book',book);
app.use('/inventory',inventory);
app.use('/issue',issue);
app.use('/sales',sales);
app.use('/stall',stall)
app.listen('9090',async(req,res)=>{
    console.log("server is running on port 8080");
})
console.log(process.env.DATABASE_URI)
app.get('/',async(req,res)=>{
    res.send("helllo");
})