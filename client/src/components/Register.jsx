import { useCreateUserMutation, useCreateUserHouseholdMutation } from "../storage/pantryPartyApi"
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateToken, updateUser } from '../storage/slice'

export default function Register() {
    const [createUser, userCreation] = useCreateUserMutation()
    const [createHousehold, householdCreation] = useCreateUserHouseholdMutation()
    const dispatch = useDispatch()

    const [error, setError] = useState("")

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [color, setColor] = useState('')

    useEffect(() => {
        if (householdCreation.isSuccess && !userCreation.isSuccess) {
            createUser({ name, username, password, defaultHouse: householdCreation.data.id, color })
        }

        if (userCreation.isSuccess) {
            dispatch(updateUser(userCreation.data.user))
            dispatch(updateToken(userCreation.data.token))
        }
    }, [householdCreation.isSuccess, userCreation.isSuccess])

    if (userCreation.isLoading || householdCreation.isLoading) {
        return <div>Loading...</div>
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let defaultName = `${name}'s Household`
        if (!name) {
            setError("Must include a NAME")
        } else if (!username) {
            setError("Must include a USERNAME")
        } else if (!password) {
            setError("Must include a PASSWORD")
        }
        await createHousehold({ name: defaultName })
    }

    return (<div>
        <form title='Account Creation Form' className="registerForm" onSubmit={handleSubmit}>
            <h3>Create An Account</h3>
            {/* {userCreation.isError && <p>{userCreation.error.error}</p>} */}
            {error && <p>{error}</p>}
            {householdCreation.isError && <p>{householdCreation.error.error}</p>}
            <label>Name:
                <input
                    value={name}
                    onChange={(event) => { setName(event.target.value) }}
                />
            </label>
            <br />
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
            <label>
                Choose your user color:
                <select
                    value={color}
                    onChange={(event) => { setColor(event.target.value) }}
                >
                    <option value="red" className="message red">Red</option>
                    <option value="orange" className="message orange">Orange</option>
                    <option value="yellow" className="message yellow">Yellow</option>
                    <option value="green" className="message green">Green</option>
                    <option value="teal" className="message teal" >Teal</option>
                    <option value="blue" className="message blue">Blue</option>
                    <option value="purple" className="message purple"> Purple </option>
                    <option value="pink" className="message pink"> Pink </option>
                </select>
            </label>
            <button type="submit">Create Account</button>
        </form>
    </div>)
}