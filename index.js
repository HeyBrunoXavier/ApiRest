const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Auth = require ('./middlewares/Auth');

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYnJ1bm94YXZpZXJAZGVzZW52b2x2LmNvbSIsImlhdCI6MTU5NzQxODcwNywiZXhwIjoxNTk3NTkxNTA3fQ.Yu1NvaFspc6Ip4DqRJDGMEXIbvV2gFu0trFHHSLAQAA"
const JWTsecret = "X-Wing";
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

var DB = {

    games: [
        {
            id: 23,
            title: "Call of duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 12,
            title: "Sea of thieves",
            year: 2018,
            price: 40
        },
        {
            id: 1,
            title: "Minecraft",
            year: 2012,
            price: 30
        }
    ],
    users: [
        {
            id: 10,
            name: "Bruno Xavier",
            email: "brunoxavier@desenvolv.com",
            password: "desenvolv"
        },
        {
            id: 20,
            name: "admin",
            email: "admin@dev.com.br",
            password: "admin"
        }
    ]
}

app.get("/games",Auth,(req,res) =>{

    res.json({empresa: req.empresa, user: req.loggedUser,games: DB.games}).status(200).end();

});

app.get("/game/:id",Auth,(req,res)=>{

    if(isNaN(req.params.id)){
        res.status(400).end();
    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        
        if(game != undefined){
            res.json(game).sendStatus(200).end();
        }else{
            res.sendStatus(404).end();
        }
        
    }

})
app.post("/game",Auth,(req,res) => {
    
    let {title,price,year} = req.body;

    DB.games.push({
        id: 2,
        title,
        year,
        price
    });

    res.json(DB.games).sendStatus(200).end();

})
app.put("/game/:id",Auth,(req,res) =>{
    if(isNaN(req.params.id)){
        res.status(400).end();
    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if(game != undefined){

            var {title,price,year} = req.body;
            
            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }
            res.json(game).sendStatus(200).end();
        }else{
            res.sendStatus(404).end();
        }
        
    }
})
app.delete("/game/:id",Auth,(req,res) =>{
   
    if(isNaN(req.params.id)){
    
        res.sendStatus(400).end();

    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        var index = DB.games.findIndex(g => g.id == id);
    
        if(index == -1){
            res.sendStatus(404).end();
        }else{
            DB.games.splice(index,1);
            res.json(game).sendStatus(200).end();
        }
    }

});

app.post("/auth",(req,res) => {
    var{ email , password } = req.body;

    if(email != undefined){

      let user =  DB.users.find(u => u.email == email);
        if(user != undefined){

            if(user.password == password){
                jwt.sign({id: user.id,email:user.email}, JWTsecret,{expiresIn:'48h'}, (err, token) =>{
                    if(err){
                        res.status(400);
                        res.send("Falha interna");
                    }else{
                        res.status(200);
                        res.json({token: token });
                    }
                })
            }else{
                res.status(401);
                res.send("Credential Invalid");
            }
        }else{
            res.status(404);
            res.send("Not Found");
        } 

    }else{
        res.status(400);
        res.send("Invalid Email");
    }
});

app.listen(3000,() =>{
    console.log("API RODANDO");
})