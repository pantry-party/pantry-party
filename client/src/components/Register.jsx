import { useCreateUserMutation } from "../storage/pantryPartyApi"
import { useState, useEffect } from 'react'

export default function Register () {
    const [createUser, userCreation] = useCreateUserMutation()
    console.log(userCreation)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if (userCreation.isLoading) {
        return <div>Loading...</div>
    }

    async function handleSubmit (e) {
        e.preventDefault()
        await createUser({ username, password, defaultHouse: 1, name: 'Test' })
    }

    return (<div>
        <form title='Login Form' onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                {userCreation.isError && <p>{userCreation.error.error}</p>}
                <label>Username: 
                        <input
                        value={username} 
                        onChange={(event) => {setUsername(event.target.value)}}
                        />
                    </label>
                    <br/>
                <label>Password: 
                    <input
                        value={password}
                        type='password'
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                </label>
                <br/>
                <button type="submit">Sign in</button>
            </form>
    </div>)
}