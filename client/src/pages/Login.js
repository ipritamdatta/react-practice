import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {isAuthenticated,userRole} from '../actions/index'

function App() {
  // const isAuthenticated = useSelector((state) => state.changeIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function loginUser(event)
  {
    event.preventDefault();
    const response = await fetch(`http://localhost:1337/api/login`,{
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

    if(data.user)
    {
      localStorage.setItem('token', data.user);

      dispatch(isAuthenticated())
      dispatch(userRole())
      // window.location.href = '/dashboard';

      navigate('/dashboard')
    }
    else
    {
      alert('Please check your email & password');
    }

    // console.log(data);
  }

  return (

    <div className='flex justify-center'>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={loginUser}>
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
              <input className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" value="Sign In" type="submit" />
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
