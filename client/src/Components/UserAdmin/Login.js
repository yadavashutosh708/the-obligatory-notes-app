import 'async-error-handler';
import { useState, useEffect } from 'react';
import loginService from '../../Services/login';
import noteService from '../../Services/notes';
import Notification from '../Notifications/Notification';


const Login = ({setUser}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);


    const handleLogin = async (event) => {
        event.preventDefault();

        const credentials = {
            username: userName,
            password: password
        }

        try {
            const u = await loginService.login(credentials);
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(u))
            noteService.setToken(u.token);
            setUser(u)
            setMessage(`Welcome, ${u.name}`);
            setUserName('')
            setPassword('')
            
        } catch (error) {
            setMessage('Wrong credentials');
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }

    }

    return (
        <>
            <div className='notification'>
                <Notification message={message} />
            </div>
            <div className='login-form'>
                <form onSubmit={handleLogin}>
                    <div className='username'>
                        <label htmlFor="username">Username </label>
                        <input className='text' autoComplete='username' type='text' value={userName} onChange={({ target }) => setUserName(target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password </label>
                        <input className='text' autoComplete='current-password' type='password' value={password} onChange={({ target }) => setPassword(target.value)}></input>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;