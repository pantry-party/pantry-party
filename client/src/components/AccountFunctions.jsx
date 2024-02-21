//choose/edit color, join household, create household,  add users to household, leave household, log out

import { useEffect, useState } from "react"
import { useEditUserMutation, useCreateSharedHouseholdMutation, useGetHouseholdbyJoinCodeQuery, useEditHouseholdMutation } from "../storage/pantryPartyApi"
import { useSelector, useDispatch } from "react-redux"
import { updateUser } from "../storage/slice"

export const ColorForm = ({ setDisplayForm, setColorButton }) => {
    const userInfo = useSelector((it) => it.state.user)
    const dispatch = useDispatch()

    const [newColor, setNewColor] = useState(userInfo.color)
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "gray", "teal", "brown"]
    const [editUser, editedUser] = useEditUserMutation()

    useEffect(() => {
        if (editedUser.isSuccess) {
            dispatch(updateUser(editedUser.data))
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const colorFormSubmit = async (e, color) => {
        e.preventDefault()
        await editUser({ id: userInfo.id, color })
        setColorButton("")
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

export const NameForm = ({ setDisplayForm, setNameButton }) => {
    const userInfo = useSelector((it) => it.state.user)
    const dispatch = useDispatch()

    const [editUser, editedUser] = useEditUserMutation()
    const [newName, setNewName] = useState(userInfo.name)
    
    useEffect(() => {
        if (editedUser.isSuccess) {
            dispatch(updateUser(editedUser.data))
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const nameFormSubmit = async (e, name) => {
        e.preventDefault()
        await editUser({ id: userInfo.id, name })
        setNameButton("")
    }

    return (
        <form id="nameForm" className="accountForm" onSubmit={(e) => { nameFormSubmit(e, newName) }}>
            <label> New Name:
                <input type="text" value={newName} onChange={(e) => { setNewName(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const UsernameForm = ({ setDisplayForm, setUserNameButton }) => {
    const userInfo = useSelector((it) => it.state.user)
    const dispatch = useDispatch()

    const [editUser, editedUser] = useEditUserMutation()
    const [username, setUserame] = useState(userInfo.username)
    
    useEffect(() => {
        if (editedUser.isSuccess) {
            dispatch(updateUser(editedUser.data))
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const nameFormSubmit = async (e) => {
        e.preventDefault()
        await editUser({ id: userInfo.id, username })
        setUserNameButton("")
    }

    return (
        <form id="nameForm" className="accountForm" onSubmit={(e) => { nameFormSubmit(e, newName) }}>
            <label> New Name:
                <input type="text" value={username} onChange={(e) => { setUserame(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const PasswordForm = ({ setAccountMessage, setDisplayForm, setPasswordButton }) => {
    const userInfo = useSelector((it) => it.state.user)
    
    const [editUser, editedUser] = useEditUserMutation()
    const [newPassword, setNewPassword] = useState("")

    useEffect(() => {
        if (editedUser.isSuccess) {
            setAccountMessage("Your password has been changed!")
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const passwordFormSubmit = async (e, password) => {
        e.preventDefault()
        await editUser({ id: userInfo.id, password })
        setPasswordButton("")
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

export const SharedHouseholdForm = ({ setHouseholdMessage, setDisplayForm, setCreateButton }) => {
    const userInfo = useSelector((it) => it.state.user)
    const dispatch = useDispatch()

    const [createHousehold, createdHousehold] = useCreateSharedHouseholdMutation()
    const [editUser, editedUser] = useEditUserMutation()
    const [newHousehold, setNewHousehold] = useState("")

    useEffect(() => {
        if (createdHousehold.isSuccess) {
            updateUserHousehold(userInfo, createdHousehold.data.id)
            setNewHousehold(createdHousehold.data)
            setHouseholdMessage(`Share your join code: ${createdHousehold.data.joinCode}`)
        }
    }, [createdHousehold.isSuccess])

    useEffect(() => {
        if (editedUser.isSuccess) {
            dispatch(updateUser(editedUser.data))
            setDisplayForm("")
        }
    }, [editedUser.isSuccess])

    const sharedHouseholdSubmit = async (e, newHousehold) => {
        e.preventDefault()
        await createHousehold({ name: newHousehold })
        setCreateButton("")
    }

    const updateUserHousehold = async (userInfo, householdId) => {
        await editUser({ id: userInfo.id, sharedHouse: householdId })
    }

    return (
        <form id="sharedHouseholdForm" className="householdForm" onSubmit={(e) => { sharedHouseholdSubmit(e, newHousehold) }}>
            <label> New Household Name:
                <input type="text" onChange={(e) => { setNewHousehold(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const JoinHouseholdForm = ({ setHousehold, setHouseholdMessage, setDisplayForm, setJoinButton }) => {
    const userInfo = useSelector((it) => it.state.user)
    const dispatch = useDispatch()

    const [joinCode, setJoinCode] = useState("")
    const householdDetails = useGetHouseholdbyJoinCodeQuery(joinCode)
    const [editUser, editedUser] = useEditUserMutation()
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (householdDetails.isSuccess) {
            setHouseholdMessage("")
            if (userInfo.sharedHouse === householdDetails.data.id) {
                setHouseholdMessage("You're already a member of this house!")
            } else if (submitted) {
                editUser({ id: userInfo.id, sharedHouse: householdDetails.data.id })
                setHousehold(householdDetails.data)
            }
        }

        if (householdDetails.isError && submitted) {
            setHouseholdMessage("That code didn't work! Please try again.")
        }
    }, [householdDetails, submitted])

    useEffect(() => {
        if (editedUser.isSuccess) {
            dispatch(updateUser(editedUser.data))
            setDisplayForm("")
            setJoinButton("")
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

export const RenameHouseholdForm = ({ household, setHousehold, setDisplayForm, setRenameButton }) => {
    const [newHouseholdName, setNewHouseholdName] = useState(household.name)
    const [renameHousehold, renamedHousehold] = useEditHouseholdMutation()

    useEffect(() => {
        if (renamedHousehold.isSuccess) {
            setHousehold(renamedHousehold.data)
            setDisplayForm("")
            setRenameButton("")
        }
    }, [renamedHousehold.isSuccess])

    const renameHouseholdSubmit = async (e, newHouseholdName) => {
        e.preventDefault()
        await renameHousehold({ id: household.id, name: newHouseholdName })
    }

    return (
        <form id="renameHouseholdForm" className="householdForm" onSubmit={(e) => { renameHouseholdSubmit(e, newHouseholdName) }}>
            <label> New Household Name:
                <input type="text" value={newHouseholdName} onChange={(e) => { setNewHouseholdName(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const LeaveHouseholdForm = ({ setDisplayForm , setLeaveButton}) => {
    const userInfo = useSelector((it) => it.state.user)
    const dispatch = useDispatch()

    const [editUser, editedUser] = useEditUserMutation()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (editedUser.isSuccess) {
            dispatch(updateUser(editedUser.data))
            setDisplayForm("")
            setLeaveButton("")
        }
    }, [editedUser.isSuccess])

    const leaveHouseholdSubmit = async (e, checked) => {
        e.preventDefault()
        if (checked) {
            await editUser({ id: userInfo.id, sharedHouse: null })
        }
    }

    return (
        <form id="leaveHouseholdForm" className="householdForm" onSubmit={(e) => { leaveHouseholdSubmit(e, checked) }}>
            <label> Are you sure?
                <input type="checkbox" onChange={(e) => { setChecked(e.target.checked) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const RemoveMemberForm = ({ household, setDisplayForm, setRemoveButton }) => {
    const userInfo = useSelector((it) => it.state.user)
    const [removal, setRemoval] = useState("")
    const [editUser, editedUser] = useEditUserMutation()

    const removeMemberSubmit = async (e, removal) => {
        e.preventDefault()
        await editUser({ id: removal, sharedHouse: null })
        setRemoveButton("")
    }

    return (
        <form id="removeMemberForm" className="householdForm" onSubmit={(e) => { removeMemberSubmit(e, removal); setDisplayForm("") }}>
            <label> Which member would you like to remove?
                <select name="members" onChange={(e) => { setRemoval(e.target.value) }}>
                    <option value={""}> Select </option>
                    {household.users.map((user) => {
                        if (user.id !== userInfo.id) {
                            return (
                                <option key={user.id} value={user.id}> {user.name} </option>
                        )
                        }
                    })}
                </select>
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}
