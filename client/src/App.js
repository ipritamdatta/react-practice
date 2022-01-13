import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './pages/Navbar'

const App = () => {

    return (
        <div className="App">
            <Router>
                <Navbar />
                <div>
                    <Routes>
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/register" exact element={<Register />} />
                        <Route path="/dashboard" exact element={<Dashboard />} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default App;