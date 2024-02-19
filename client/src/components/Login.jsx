import { useLoginUserMutation } from "../storage/pantryPartyApi"
import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { updateToken, updateUser } from '../storage/slice'

export default function Login ({userInfo, setUserInfo}) {
    const [login, userLogin] = useLoginUserMutation()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() => {    
        if (userLogin.isSuccess) {
            console.log(userLogin)
            setUserInfo(userLogin.data.user)
            dispatch(updateUser(userLogin.data.user))
            dispatch(updateToken(userLogin.data.token))
            console.log(userLogin.data.user)
        }
            
    }, [userLogin.isSuccess])
    
    if (userLogin.isLoading) {
        return <div>Loading...</div>
    }

    async function handleSubmit (e) {
        e.preventDefault()
        await login({ username, password })
    }

    return (<div>
        <form title='Login Form' onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                {userLogin.isError && <p>{userLogin.error.error}</p>}
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