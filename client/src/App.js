import Notes from './Components/Notes/Notes';
import Login from './Components/UserAdmin/Login';
import noteService from './Services/notes'

import { useState, useEffect } from 'react';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect( () => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if(loggedUserJSON){
            const u = JSON.parse(loggedUserJSON);
            setUser(u)
            noteService.setToken(u.token);
        }
    }, [])

    return (
        <div>
            <h1>Notes</h1>
            {(!user) ? <Login setUser={setUser} /> : <Notes user={user} />}
        </div>
    )
}

export default App;