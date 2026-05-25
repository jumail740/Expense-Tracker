import { useState } from "react"
import API from "../services/api"

function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async()=>{
        try{
            const response = await API.post(
                'auth/login/',
                {
                    username,
                    password
                }
            )
            localStorage.setItem(
    'token',
    response.data.access
)

localStorage.setItem(
    'role',
    response.data.role
)

if (response.data.role === 'admin') {

    window.location.href = '/admin'

} else {

    window.location.href = '/dashboard'
}
        } catch (error) {

    console.log(error.response)

    alert('Login Failed')
}
    }
    
    return (

    <div
        style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5'
        }}
    >

        <div
            style={{
                width: '350px',
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px gray'
            }}
        >

            <h1
                style={{
                    textAlign: 'center',
                    marginBottom: '20px'
                }}
            >
                Login
            </h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '15px',
                    borderRadius: '5px',
                    border: '1px solid gray'
                }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '15px',
                    borderRadius: '5px',
                    border: '1px solid gray'
                }}
            />

            <button
                onClick={handleLogin}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Login
            </button>

            <p
                style={{
                    textAlign: 'center',
                    marginTop: '20px'
                }}
            >
                <a href="/signup">
                    Create New Account
                </a>
            </p>

        </div>

    </div>
)
}

export default Login