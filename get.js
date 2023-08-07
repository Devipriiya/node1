import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Create from './getmodel.js';

import connectDB from './db.js';
connectDB();
const PORT=3000;
const app=express();
app.use(express.json());
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

app.use(express.static('images'));
app.use('/images', express.static('images'));

const profile=[{

   
    name:"priya",
    id:"14",
    age:"22"
},
{
   
    name:"kaviya",
    id:"15",
    age:"22"
},
{
  
    name:"pavithra",
    id:"16",
    age:"22"

}
]
app.get('/data',(req,res)=>{
    res.sendFile(__dirname+'/ae.html');
    // res.send(profile)
})
app.get("/:id",(req,res)=>{
    try{
        const individualDetail=profile.find(
            (c) => c.id === Number(req.params.id)
        )
        if(individualDetail){
            res.json(individualDetail);
        }else{
            res.status(404).json({message:"not found"});
        }
    }
    catch(error){
        res.json({message:505});
    }
});
app.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Create.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            details:result
        })

    })
    .catch(err=>{
        console.log(err);
        res.status(505).json({
            error:err
        })
    })
})

app.post('/user',async(req,res)=>{
    try{
        const userdetails={
            name:req.body.name,
            id:req.body.id,
            age:req.body.age
        }
        console.log(userdetails);
        const user=new Create(userdetails);
        const userCreated=await user.save();
        if(userCreated){
            console.log("created");
            res.status(201).json({message:"successfully created"});
        }
        else{
            res.status(401);
            throw new error("not found");
        }
    }catch(err){
return res.status(500).json({message:err.message});
    }
})
app.put('/details/:id',(req,res)=>{
console.log(req.params.id);
Create.findOneAndUpdate({_id:req.params.id},
    {
    $set:{
        name:req.body.name,
        id:req.body.id,
        age:req.body.age
    }
    })
    .then(result=>{
        res.status(200).json({
            updated_details:result
        })
    })

.catch(err=>{
    console.log(err)
    res.status(500).json({error:err})
})
})
app.delete('/details/:id',(req,res)=>{
    console.log(req.params.id);
    Create.findByIdAndRemove({_id:req.params.id},
        {
            $set:{
                name:req.body.name,
                id:req.body.id,
                age:req.body.age 
            }
        })
        .then(result=>{
            res.status(200).json({Deleted_user:result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err
            })
        })
})
app.delete('/details', async (req, res) => {
    Create.deleteMany({}).then((result) => {
        res.send(result);
    })
});

app.listen(PORT,()=>{
    console.log(`Server running on port:${PORT}`)
})