import express from 'express';
import { products } from './products.js';
import { UserManager } from '../manager/user.manager.js';

const userManager = new UserManager('./users.json');

const app = express();

app.use(express.json()); // middleware
app.use(express.urlencoded({extended:true}));


app.get("/products",(req, res)=> {
    // res.send("Mi primer servidor con Express")
    res.json(products);
});

app.get("/users", async(req, res) =>{
    try{
        const users = await userManager.getUsers();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({msg:'Error de servidor'})
    }
});

app.get("/users/:idUser", async(req, res) =>{
    try{
        const {idUser} = req.params;
        const user = await userManager.getUserById(idUser);
        if(!user)res.status(404).json({msg:'User not found'});
        else res.status(200).json(user);
        }catch(error){
        res.status(500).json({msg:'Error de servidor'})
    }
});

app.post("/users", async(req, res) =>{
    try{
       // console.log(req.body);
       const user = await userManager.createUser(req.body);
       if(!user)res.status(404).json({msg:'User already exist'});
       else res.status(200).json(user);
    }catch(error){
        console.log(error)
        res.status(500).json({msg:'Error de servidor'})
    }
});

app.put("/users/:idUser", async(req, res) =>{
    try{
        const {idUser} = req.params;
        const response = await userManager.updateUser(req.body, idUser);
        if(!response) res.status(404).json({msg: 'Error updating user'});
        else res.status(200).json(response);

        }catch(error){
        res.status(500).json({msg:'Error de servidor'})
    }
});

app.delete("/users/:idUser", async(req, res) =>{
    try{
        const {idUser} = req.params;
        const response = await userManager.deleteUser(req.body, idUser);
        if(!response) res.status(404).json({msg: 'Error deleting user'});
        else res.status(200).json(response);

        }catch(error){
        res.status(500).json({msg:'Error de servidor'})
    }
});

const PORT = 8500;


app.listen(PORT, ()=>(console.log(`Server ok en puerto ${PORT}`)));