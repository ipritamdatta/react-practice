1. npm start
2. In app.js write:

```
import './App.css';
import {useState} from 'react'

function App() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function registerUser(event)
  {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/register',{
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" /> <br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" /> <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" /> <br />
        <input type="submit" value="Register" /> <br />
      </form>
    </div>
  );
}

export default App;

```

3. Create login.js file and write: 

```
import './App.css';
import {useState} from 'react'

function App() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function loginUser(event)
  {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/login',{
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" /> <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" /> <br />
        <input type="submit" value="Login" /> <br />
      </form>
    </div>
  );
}

export default App;

```

4. Move login.js and (rename App.js to register.js) move to src->pages folder. 

5. npm install react-router-dom

6. Create App.js file. 
##################################
```
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
```
##################################
6. remove ./App.css code from login and register view.

7. Create Dashboard.js file inside pages folder.

8. in App.js write:

```
<Route path="/dashboard" exact element={<Dashboard />} />
```
###### Authentication check and dashboard view

9. npm install jsonwebtoken

10. In Dashboard.js write: 

```

```