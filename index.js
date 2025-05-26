const express = require('express');
const Users = require('./MOCK_DATA.json');
const app = express();
const fs = require('fs');
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/users', (req, res) => {
   return res.json(Users)
});

app.get('/api/users/:id', (req, res)=> {
    const id = Number(req.params.id);
    const user = Users.find(user => user.id === id);
    if(!user) {
        return res.status(404).json({message : 'user not found '});
    }
    return res.json(user);
})

app.post('/api/users', (req, res)=> {
    const id = Users.length + 1;
    const newUser = {
        id,
        ...req.body
    }
    Users.push(newUser);
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(Users, null, 2), (err) => {
        if(err) {
            return res.status(500).json({message : 'Error writing to file'});
        }
        return res.status(201).json(newUser);
    });
})

app.put('/api/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    const userIndex = Users.findIndex(user=>user.id === id);
    
    if(userIndex === -1) {
        return res.status(404).json({message : 'user not found'});
    }
    const updateUser = {...User[userIndex], ...req.body};
    Users[userIndex] = updateUser;
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(Users, null, 2), (err) => {
        if(err) {
            return res.status(500).json({message : 'Error writing to file'});
        }
        return res.json(updateUser);
    });
})

app.delete('/api/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    const userIndex = Users.findIndex(user=>user.id === id);
    if(userIndex === -1) {
        return res.status(404).json({message : 'user not found'});
    }
    Users.splice(userIndex, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(Users, null, 2), (err) => {
        if(err) {
            return res.status(500).json({message : 'Error writing to file'});
        }
        return res.status(200).json({message : 'user deleted successfully'});
    });
})


app.patch('/api/users/:id',(req, res)=>{
    const id = Number(req.params.id);
    const userIndex = Users.findIndex(user=> user.id === id);
    if(userIndex === -1) {
        return res.status(404).json({message : 'user not found'});
    }
    const updateUser = {...Users[userIndex], ...req.body};
    Users[userIndex] = updateUser;
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(Users, null, 2), (err) => {
        if(err) {
            return res.status(500).json({message : 'Error writing to file'});
        }
        return res.json(updateUser);
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});