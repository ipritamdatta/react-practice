import React, { useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {isAuthenticated,removeUser,userRole,removeRolePermission} from '../actions/index'

export default function Navbar({ fixed }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user)

    console.log(isAuth.user);

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            dispatch(isAuthenticated());
            dispatch(userRole())
        }
        else
        {
            localStorage.removeItem('token');
            navigate('/login')
        }
    },[]);

    function handleLogout()
    {
        localStorage.removeItem('token')
        dispatch(removeUser())
        dispatch(removeRolePermission())
        navigate('/login');
        
    }

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-red-200 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link
                        to="/"
                        className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                    >
                    M E R N
                    </Link>
                    <button
                    className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                    <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div
                    className={
                    "lg:flex flex-grow items-center" +
                    (navbarOpen ? " flex" : " hidden")
                    }
                    id="example-navbar-danger"
                >
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        
                        {
                            isAuth.user.length != 0 && 
                            <>
                            <li className="nav-item">
                                <Link
                                    to='/dashboard'
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                                >
                                    <i className="fab fa-buromobelexperte text-lg leading-lg opacity-75"></i><span className="ml-2">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div
                                    onClick={(e) => handleLogout()}
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75 cursor-pointer"
                                >
                                    <i className="fas fa-sign-in-alt text-lg leading-lg opacity-75"></i><span className="ml-2">Log out</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-sung hover:opacity-75 cursor-pointer">
                                <i className="fas fa-user text-lg leading-lg opacity-75"></i><span className="ml-2">{isAuth.user.userName}</span>
                                </div>
                            </li>
                            </>
                        }

                        {
                            isAuth.user.length == 0 && 

                            <>
                            <li className="nav-item">
                                <Link
                                    to='/login'
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                                >
                                    <i className="fas fa-sign-in-alt text-lg leading-lg opacity-75"></i><span className="ml-2">Login</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to='/register'
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                                >
                                    <i className="fab fa-battle-net text-lg leading-lg opacity-75"></i><span className="ml-2">Register</span>
                                </Link>
                            </li>
                            </>
                        }
                        
                    </ul>
                    
                        
                </div>
                </div>
            </nav>
        </>
    );
}