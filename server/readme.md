1. npm install express
2. npm install nodemon
3. In package.json write:

```
"scripts": {
    "dev":"nodemon index.js"
  },
```

4. Inside index.js write:
```
const express = require('express');
const app = express();

app.get('/hello', (req,res) => {
    res.send('hello');
});

app.listen(1337, () => {
    console.log('Server started 1337');
})
```

and, run: npm run dev. check: http://localhost:1337/hello

5. npm install cors

6. in index.js write:
```
const express = require('express');
const app = express();
const cors = require('cors');

// to remove cross origin errors use cors
app.use(cors())

app.use(express.json())

app.post('/api/register', (req,res) => {
    
    console.log(req.body);
    res.json({status:'ok'})

});

app.listen(1337, () => {
    console.log('Server started 1337');
})
```

###### Add mongo

1. npm install mongoose
2. Create models folder inside the root and inside models folder create user.model.js file.
3. Inside user.model.js write:

```
const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        quote: {
            type: String
        }
    },
    {collection: 'user-data'}
)

const model = mongoose.model('UserData', User);

module.exports = model;
```

4. npm install dotenv

5. Inside index.js write:

```
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/user.model');

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

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        res.json({ status: 'ok' });
    } catch(err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }

});

app.post('/api/login', async (req,res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(user)
    {
        return res.json({
            status: 'ok',
            user: true
        })
    }
    else{
        return res.json({ status: 'error', user: false })
    }

});

app.listen(1337, () => {
    console.log('Server started 1337');
})
```

###### AUTHENTICATION

1. npm install jsonwebtoken
2. inside index.js write: 
```
const jwt = require('jsonwebtoken');

app.post('/api/login', async (req,res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(user)
    {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, process.env.TOKEN_SECRET);

        return res.json({
            status: 'ok',
            user: token
        })
    }
    else{
        return res.json({ status: 'error', user: false })
    }

});
```

and once you login you will get a token.


###### Quote

1. Inside index.js write: 

```
// get quote
app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];

    try{

        const decoded   = jwt.verify(token, process.env.TOKEN_SECRET);
        const email     = decoded.email
        const user      = await User.findOne({ email: email })

        return {status: 'ok', quote: user.quote}

    } catch (error) {
        console.log(error);
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

        return {status: 'ok'}

    } catch (error) { 
        console.log(error);
    }
})
```

###### Hashing password

1) npm install bcryptjs
2) 