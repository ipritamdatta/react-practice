import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'

function Dashboard() {

    const user = useSelector((state) => state.user);
    const rolePermission = useSelector((state) =>state.rolePermission);
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')
    const navigate = useNavigate();

    async function populateQuote(){
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-access-token' : localStorage.getItem('token')
            }
        });

        const data = await req.json();
        
        if(data.status === 'ok') 
        {
            setQuote(data.quote);
        }
        else {
            alert(data.error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token)
        {
            const user = jwt_decode(token);
            if(!user)
            {
                localStorage.removeItem('token');
                navigate('/login');
            }
            else {
                populateQuote();
            }
        }

    }, [])

    async function updateQuote()
    {
        const req = await fetch('http://localhost:1337/api/quote', {

            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: tempQuote
            })

        });

        const data = await req.json();
        if(data.status === 'ok')
        {
            setQuote(tempQuote);
            setTempQuote('')
        }
        else
        {
            alert(data.error);
        }
    }

    return (
        <div className='flex items-center flex-col'>
            <h1 className="items-center">Welcome <span className="font-bold uppercase">{user.user.userName} ({rolePermission.roleState.role})</span></h1>
            <h1 className='my-4'><span className="font-semibold">Your quote:</span> {quote || 'No quote found'} </h1>
            <form onSubmit={updateQuote}>
                <input 
                    type="text" 
                    placeholder='Quote' 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    value={tempQuote} 
                    onChange={(e) => setTempQuote(e.target.value)}
                />
                <input type="submit" value="Update quote" className='bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer w-full'/>
            </form>
        </div>
    )
}

export default Dashboard
