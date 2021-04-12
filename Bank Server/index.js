const express=require('express')

const dataService=require('./services/data.service')
const session=require('express-session');
const app=express()
app.use(express.json());
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));
const logMiddleware=(req,res,next)=>{
    console.log("middleware");
    next();//to get access to the next function
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    }
app.use(logMiddleware);
const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser)
    {
        return res.json( {
            status: false,
            statusCode: 401,
            message: "pls login"
        })
    }
    else
    next();//to get access to the next function
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    }
app.get('/',(req,res)=>{
    res.send("GET")//routing
})
app.post('/',(req,res)=>{
    res.send("POST")//routing
})
app.post('/register',(req,res)=>{
    console.log(req.body);
   result= dataService.register(req.body.accno,req.body.name,req.body.password)
    //res.send(result.message)//routing
    res.status(result.statusCode).json(result);
})
app.post('/login',(req,res)=>{
    console.log(req.body);
   result= dataService.login(req,req.body.accno,req.body.password)
    // res.send(result.message)//routing
    res.status(result.statusCode).json(result);
})
app.post('/deposite',(req,res)=>{
    console.log(req.session.currentUser)
   result= dataService.dash(req,req.body.accno,req.body.amt)
    // res.send(result.message)//routing
    res.status(result.statusCode).json(result);
})
app.put('/',(req,res)=>{
    res.send("PUT")//routing
})
app.delete('/',(req,res)=>{
    res.send("DELETE")//routing
})
app.patch('/',(req,res)=>{
    res.send("PATCH")//routing
})
app.listen(3000,()=>{
    console.log("")})
