import { useCreateUserMutation, useCreateUserHouseholdMutation } from "../storage/pantryPartyApi"
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateToken, updateUser } from '../storage/slice'

export default function Register ({userInfo, setUserInfo}) {
    const [createUser, userCreation] = useCreateUserMutation()
    const [createHousehold, householdCreation] = useCreateUserHouseholdMutation()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [color, setColor] = useState('')

    useEffect(() => {
        if (householdCreation.isSuccess && !userCreation.isSuccess) {
            createUser({ name, username, password, defaultHouse: householdCreation.data.id, color })
        }

        if (userCreation.isSuccess) {
            console.log(userCreation)
            console.log(userCreation.data.user)
            setUserInfo(userCreation.data.user)
            dispatch(updateUser(userCreation.data.user))
            dispatch(updateToken(userCreation.data.token))
        }
    }, [householdCreation.isSuccess, userCreation.isSuccess])

    if (userCreation.isLoading || householdCreation.isLoading) {
        return <div>Loading...</div>
    }

    async function handleSubmit (e) {
        e.preventDefault()
        let defaultName = `${name}'s Household`

        await createHousehold({ name: defaultName }) 
    }

    return (<div>
        <form title='Account Creation Form' onSubmit={handleSubmit}>
                <h3>Create An Account</h3>
                {userCreation.isError && <p>{userCreation.error.error}</p>}
                {householdCreation.isError && <p>{householdCreation.error.error}</p>}
                <label>Name: 
                        <input
                        value={name} 
                        onChange={(event) => {setName(event.target.value)}}
                        />
                    </label>
                    <br/>
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
                <label>
                    Choose your user color:
                    <select 
                        value={color}
                        onChange={(event) => {setColor(event.target.value)}}
                    >
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                        <option value="yellow">Yellow</option>
                        <option value="pink">Pink</option>
                        <option value="green">Green</option>
                    </select>
                </label>
                <button type="submit">Create Account</button>
            </form>
    </div>)
}