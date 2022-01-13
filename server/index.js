const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// to remove cross origin errors use cors
app.use(cors())
app.use(express.json())

dotenv.config();

// connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },() => console.log('connected to db'));


app.post('/api/register', async (req,res) => {
    
    console.log(req.body);

    try{
        const newPassword = await bcrypt.hash(req.body.password, 10);

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            role: 'admin',
            permission: ['create','edit','update','delete']
        });

        res.json({ status: 'ok' });
    } catch(err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }

});

app.post('/api/login', async (req,res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if(!user) {
        return res.json({
            status: 'error',
            error: 'Invalid login'
        })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if(isPasswordValid)
    {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, process.env.TOKEN_SECRET);

        return res.json({
            status: 'ok',
            user: token,
            userDetails: user
        })
    }
    else{
        return res.json({ status: 'error', user: false })
    }

});


// get quote
app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];

    try{

        const decoded   = jwt.verify(token, process.env.TOKEN_SECRET);
        const email     = decoded.email
        const user      = await User.findOne({ email: email })

        return res.json({status: 'ok', quote: user.quote});

    } catch (error) {
        console.log(error);
        res.json({
            status: 'error',
            error: 'invalid token'
        })
    }

})

app.get('/api/get-role', async (req, res) => {
    const token = req.headers['x-access-token'];

    try{

        const decoded   = jwt.verify(token, process.env.TOKEN_SECRET);
        const user      = await User.findOne({ email: decoded.email })

        return res.json({status: 'ok', role: user.role, permission: user.permission});
    } catch (error) {
        res.json({
            status: 'error',
            error: 'invalid token'
        })
    }
})

// post quote
app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];

    try{

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const email = decoded.email
        await User.updateOne(
            {email: email},
            {$set: { quote: req.body.quote }}
        )

        return res.json({status: 'ok'})

    } catch (error) { 
        console.log(error);
    }
})

app.listen(1337, () => {
    console.log('Server started 1337');
})