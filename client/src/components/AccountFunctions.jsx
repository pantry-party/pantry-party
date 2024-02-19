//choose/edit color, join household, create household,  add users to household, leave household, log out

import { useEffect, useState } from "react"
import { useEditUserMutation, useCreateSharedHouseholdMutation, useGetHouseholdbyJoinCodeQuery, useEditHouseholdMutation } from "../storage/pantryPartyApi"

export const ColorForm = ({ newColor, setNewColor, userInfo, setUserInfo, setDisplayForm }) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "gray", "teal", "brown"]
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const colorFormSubmit = async (e, color) => {
        e.preventDefault()
        console.log(color)
        await editUser({ id: userInfo.id, color })
    }

    return (
        <form id="colorForm" className="accountForm" onSubmit={(e) => { colorFormSubmit(e, newColor)}}>
            <label> Colors:
                <select required name="colors" onChange={(e) => { setNewColor(e.target.value) }}>
                    <option value={""}> Select </option>
                    {colors.map((color, index) => {
                        return (
                            <option key={index} value={color} className={color}> {color} </option>
                        )
                    })}
                </select>
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const NameForm = ({ newName, setNewName, userInfo, setUserInfo, setDisplayForm }) => {
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const nameFormSubmit = async (e, name) => {
        e.preventDefault()
        console.log(42, name)
        await editUser({ id: userInfo.id, name })
    }

    return (
        <form id="nameForm" className="accountForm" onSubmit={(e) => { nameFormSubmit(e, newName) }}>
            <label> New Name:
                <input type="text" onChange={(e) => { setNewName(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const PasswordForm = ({ newPassword, setNewPassword, userInfo, setUserInfo, setAccountMessage, setDisplayForm }) => {
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
            setAccountMessage("Your password has been changed!")
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const passwordFormSubmit = async (e, password) => {
        e.preventDefault()
        console.log(80, password)
        await editUser({ id: userInfo.id, password })
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

export const SharedHouseholdForm = ({ userInfo, setUserInfo, newHousehold, setNewHousehold, setHouseholdMessage, setDisplayForm }) => {
    const [createHousehold, createdHousehold] = useCreateSharedHouseholdMutation()
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (createdHousehold.isSuccess) {
            console.log(createdHousehold.data)
            updateUserHousehold(userInfo, createdHousehold.data.id)
            setNewHousehold(createdHousehold.data)
            setHouseholdMessage(`Share your join code: ${createdHousehold.data.joinCode}`)
        }
    }, [createdHousehold.isSuccess])

    useEffect(() => {
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const sharedHouseholdSubmit = async (e, newHousehold) => {
        e.preventDefault()
        console.log(newHousehold)
        await createHousehold({ name: newHousehold })
    }

    const updateUserHousehold = async (userInfo, householdId) => {
        await editUser({ id: userInfo.id, sharedHouse: householdId })
    }

    return (
        <form id="sharedHouseholdForm" className="householdForms" onSubmit={(e) => { sharedHouseholdSubmit(e, newHousehold) }}>
            <label> New Household Name:
                <input type="text" onChange={(e) => { setNewHousehold(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const JoinHouseholdForm = ({ userInfo, setUserInfo, setHousehold, joinCode, setJoinCode, setHouseholdMessage, setDisplayForm }) => {
    const householdDetails = useGetHouseholdbyJoinCodeQuery(joinCode)
    const [editUser, editedUser] = useEditUserMutation()
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (householdDetails.isSuccess) {
            setHouseholdMessage("")
            console.log(householdDetails)
            if (userInfo.sharedHouse === householdDetails.data.id) {
                setHouseholdMessage("You're already a member of this house!")
            } else if (submitted) {
                console.log("house", householdDetails.data.id)
                console.log("user", userInfo.id)
                editUser({ id: userInfo.id, sharedHouse: householdDetails.data.id })
                setHousehold(householdDetails.data)
                console.log("check")
            }
        }

        if (householdDetails.isError) {
            setHouseholdMessage("That code didn't work! Please try again.")
        }
    }, [householdDetails, submitted])

    useEffect(() => {
        console.log(editedUser)
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    return (
        <form id="joinHouseholdForm" className="householdForm" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
            <label> Join code:
                <input type="text" onChange={(e) => { setJoinCode(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const RenameHouseholdForm = ({ household, setHousehold, newHouseholdName, setNewHouseholdName, setDisplayForm }) => {
    const [renameHousehold, renamedHousehold] = useEditHouseholdMutation()

    useEffect(() => {
        if (renamedHousehold.isSuccess) {
            console.log(renamedHousehold.data)
            setHousehold(renamedHousehold.data)
            setDisplayForm("")
        }
    }, [renamedHousehold.isSuccess])

    const renameHouseholdSubmit = async (e, newHouseholdName) => {
        e.preventDefault()
        await renameHousehold({ id: household.id, name: newHouseholdName })
    }

    return (
        <form id="renameHouseholdForm" className="householdForms" onSubmit={(e) => { renameHouseholdSubmit(e, newHouseholdName) }}>
            <label> New Household Name:
                <input type="text" onChange={(e) => { setNewHouseholdName(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const LeaveHouseholdForm = ({ checked, setChecked, userInfo, setUserInfo, setDisplayForm }) => {
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (editedUser.isSuccess) {
            console.log(editedUser.data)
            setUserInfo(editedUser.data)
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const leaveHouseholdSubmit = async (e, checked) => {
        e.preventDefault()
        console.log(215, checked)
        await editUser({ id: userInfo.id, sharedHouse: null })
        console.log(userInfo)
    }

    return (
        <form id="leaveHouseholdForm" className="householdForms" onSubmit={(e) => { leaveHouseholdSubmit(e, checked) }}>
            <label> Are you sure?
                <input type="checkbox" onChange={(e) => { setChecked(e.target.checked) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const RemoveMemberForm = ({ removal, setRemoval, household }) => {
    const [editUser, editedUser] = useEditUserMutation()

    const removeMemberSubmit = async (e, removal) => {
        e.preventDefault()
        await editUser({ id: removal, sharedHouse: null })
        console.log(userInfo)
    }

    return (
        <form id="removeMemberForm" className="householdForms" onSubmit={(e) => { removeMemberSubmit(e, removal); setDisplayForm("") }}>
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
