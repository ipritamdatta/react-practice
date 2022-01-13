import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function App() {
  const navigate = useNavigate();

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

    if(data.status === 'ok')
    {
      navigate('/login');
    }

  }

  return (
    // <div>
    //   <h2>Register</h2>
    //   <form onSubmit={registerUser}>
    //     <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" /> <br />
    //     <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" /> <br />
    //     <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" /> <br />
    //     <input type="submit" value="Register" /> <br />
    //   </form>
    // </div>

    <div className='flex justify-center'>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={registerUser}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" placeholder="Name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="Email" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            </div>
            <div className="flex items-center justify-between">
              <input className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" value="Sign Up" type="submit" />
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
      </div>
    </div>
  );
}

export default App;
