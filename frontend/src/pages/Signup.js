import { useState } from 'react'
import API from '../services/api'

function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async () => {

        try {

            await API.post(
                'auth/register/',
                {
                    username,
                    email,
                    password
                }
            )

            alert('Signup Success')

            window.location.href = '/'

        } catch (error) {

            console.log(error)

            alert('Signup Failed')
        }
    }

    return (
        <div
         style={{
            width: '300px',
            margin: '100px auto',
            padding: '20px',
            border: '1px solid gray',
            borderRadius: '10px',
            textAlign: 'center'
        }}
    >

            <h1>Signup</h1>

            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                style={{
                width: '90%',
                padding: '10px',
                marginBottom: '10px'
            }}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                width: '90%',
                padding: '10px',
                marginBottom: '10px'
            }}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                 style={{
                width: '90%',
                padding: '10px',
                marginBottom: '10px'
            }}
            />

            <br /><br />

            <button onClick={handleSignup}
            style={{
                width: '100%',
                padding: '10px',
                cursor: 'pointer'
            }}>
                Signup
            </button>
            <br /><br />

        <a href="/">
            Already have an account? Login
        </a>

        </div>
    )
}

export default Signup