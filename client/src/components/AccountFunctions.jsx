//choose/edit color, join household, create household,  add users to household, leave household, log out

import { useEffect } from "react"
import { useEditUserMutation } from "../storage/pantryPartyApi"

export const ColorForm = ({newColor, setNewColor, userInfo, setUserInfo}) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "gray", "teal", "brown"]
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
        }
    }, [editedUser.isSuccess])

    const colorFormSubmit = async (e, color) => {
        e.preventDefault()
        console.log(18, color)
        await editUser({id: userInfo.id, color})
    }

    return (
        <form id="colorForm" className="accountForm" onSubmit={(e) => {colorFormSubmit(e, newColor) }}>
            <label> Colors:
                <select required name="colors" onChange={(e) => {setNewColor(e.target.value)}}>
                    <option value={""}> Select </option>
                    {colors.map((color) => {
                        return (
                            <option value={color} className={color}> {color} </option>
                        )
                    })}
                </select>
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const NameForm = ({newName, setNewName, userInfo, setUserInfo}) => {
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
        }
    }, [editedUser.isSuccess])

    const nameFormSubmit = async (e, name) => {
        e.preventDefault()
        console.log(42, name)
        await editUser({id: userInfo.id, name})
    }

    return (
        <form id="nameForm" className="accountForm" onSubmit={(e) => { nameFormSubmit(e, newName) }}>
            <label> New Name:
                <input type="text" onChange={(e) => { setNewName(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
            {message && <p> {message} </p>}
        </form>
    )
}

export const PasswordForm = ({newPassword, setNewPassword, userInfo, setUserInfo}) => {
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
        }
    }, [editedUser.isSuccess])

    const passwordFormSubmit = async (e, password) => {
        e.preventDefault()
        console.log(80, password)
        await editUser({id: userInfo.id, password})
    }

    return (
        <form id="passwordForm" className="accountForm" onSubmit={(e) => { passwordFormSubmit(e, newPassword) }}>
            <label> New Password:
                <input type="text" onChange={(e) => { setNewPassword(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const sharedHouseholdForm = ({newHousehold, setNewHousehold}) => {

    return (
        <form id="sharedHouseholdForm" className="householdForms" onSubmit={(e) => { sharedHouseholdSubmit(e) }}>
            <label> New Household Name:
                <input type="text" onChange={(e) => { setNewHousehold(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const joinHouseholdForm = ({joinCode, setJoinCode}) => {

    return (
        <form id="joinHouseholdForm" className="householdForm" onSubmit={(e) => { joinHouseholdSubmit(e) }}>
            <label> Join code:
                <input type="text" onChange={(e) => { setJoinCode(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const renameHouseholdForm = ({newHouseholdName, setNewHouseholdName}) => {

    return (
        <form id="renameHouseholdForm" className="householdForms" onSubmit={(e) => { renameHouseholdSubmit(e) }}>
            <label> New Household Name:
                <input type="text" onChange={(e) => { setNewHouseholdName(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const leaveHouseholdForm = ({checked, setChecked}) => {

    return (
        <form id="leaveHouseholdForm" className="householdForms" onSubmit={(e) => {leaveHouseholdSubmit(e)}}>
            <label> Are you sure?
                <input type="checkbox" onCheck={(e) => { setChecked(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const removeMemberForm = ({removal, setRemoval, household}) => {
    return (
        <form id="removeMemberForm" className="householdForms" onSubmit={(e) => {removeMemberSubmit(e)}}>
            <label> Which member would you like to remove?
                <select name="members" onChange={(e) => { setRemoval(e.target.value) }}>
                    <option value={""}> Select </option>
                    {household.users.map((user) => {
                        return (
                            <option value={user.id}> {user.name} </option>
                        )
                    })}
                </select>
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}


export default function AccountFunctions() {
    const [createSharedHousehold, sharedHouseholdInfo] = useCreateSharedHouseholdMutation()
    const [editHousehold, editedHousehold] = useEditHouseholdMutation()
   

    const nameFormSubmit = async () => {}

    const passwordFormSubmit = async () => {}

    const sharedHouseholdSubmit = async () => {}

    const joinHouseholdSubmit = async () => {}

    const leaveHouseholdSubmit = async () => {}
    
    const renameHouseholdSubmit = async () => {}

    const removeMemberSubmit = async () => {}
    
    return (
        <div> </div>
    )
}