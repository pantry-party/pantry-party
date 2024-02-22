import { useLoginUserMutation } from "../storage/pantryPartyApi"
import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { updateToken, updateUser } from '../storage/slice'

export default function Login() {
    const [login, userLogin] = useLoginUserMutation()
    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (userLogin.isError) {
            setError("Invalid Username and Password combination")
        }
    }, [userLogin.isError])

    useEffect(() => {
        if (userLogin.isSuccess) {
            dispatch(updateUser(userLogin.data.user))
            dispatch(updateToken(userLogin.data.token))
        }
    }, [userLogin.isSuccess])

    async function handleSubmit(e) {
        e.preventDefault()
        await login({ username, password })
    }

    return (<div>
        <form title='Login Form' className="loginForm" onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            {error && <p>{error}</p>}
            <label>Username:
                <input
                    value={username}
                    onChange={(event) => { setUsername(event.target.value) }}
                />
            </label>
            <br />
            <label>Password:
                <input
                    value={password}
                    type='password'
                    onChange={(event) => { setPassword(event.target.value) }}
                />
            </label>
            <br />
            <button type="submit">Sign in</button>
        </form>
    </div>)
}