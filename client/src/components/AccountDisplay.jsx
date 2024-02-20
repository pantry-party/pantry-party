//display of account information

import { useState } from "react"
import { userIcon, addUsersIcon, removeUserIcon, createHouseholdIcon, joinHouseholdIcon, leaveHouseholdIcon, renameHouseholdIcon, colorIcon, passwordIcon, nameIcon, editIcon, plusIcon } from "../styles/icons"
import { useGetHouseholdbyIdQuery, pantryPartyApi } from "../storage/pantryPartyApi"
import Register from "./Register"
import "../styles/colors.css"
import Login from "./Login"
import { ColorForm, NameForm, UsernameForm, PasswordForm, SharedHouseholdForm, JoinHouseholdForm, RenameHouseholdForm, LeaveHouseholdForm, RemoveMemberForm } from "./AccountFunctions"
import { useSelector, useDispatch } from "react-redux"
import { updateToken, updateUser } from "../storage/slice"

export default function AccountDisplay({ household, setHousehold }) {
    const userInfo = useSelector((it) => it.state.user)
    const dispatch = useDispatch()

    const householdId = userInfo?.sharedHouse || userInfo?.defaultHouse
    const householdDetails = useGetHouseholdbyIdQuery(householdId)

    const [displayForm, setDisplayForm] = useState("")
    const [showUserEdits, setShowUserEdits] = useState(false)
    const [showHouseholdEdits, setShowHouseholdEdits] = useState(false)

    const [accountMessage, setAccountMessage] = useState("")
    const [householdMessage, setHouseholdMessage] = useState("")

    const accountInfo = () => {
        return (
            <>
                <div className="accountInfo">
                    <h2 className={userInfo.color} id={userInfo.id}> {userIcon} Welcome {userInfo.name}! &nbsp; {<span onClick={() => { setShowUserEdits(!showUserEdits) }}>{editIcon}</span>} </h2>
                    {/* Choose your color */}
                    {showUserEdits && <button onClick={() => { setDisplayForm("colorForm") }}> {colorIcon}  Choose your color </button>}
                    {/* Change your name */}
                    {showUserEdits && <button onClick={() => { setDisplayForm("nameForm") }}> {nameIcon} Change your name </button>}
                    {/* Change your username */}
                    {showUserEdits && <button onClick={() => { setDisplayForm("usernameForm") }}> {nameIcon} Change your username </button>}
                    {/* Change your password */}
                    {showUserEdits && <button onClick={() => { setDisplayForm("passwordForm") }}> {passwordIcon} Change your password </button>}
                    <div className="accountUpdateForms">
                        {displayForm === "colorForm" && <ColorForm setDisplayForm={setDisplayForm} />}
                        {displayForm === "nameForm" && <NameForm setDisplayForm={setDisplayForm} />}
                        {displayForm === "usernameForm" && <UsernameForm setDisplayForm={setDisplayForm} />}
                        {displayForm === "passwordForm" && <PasswordForm accountMessage={accountMessage} setAccountMessage={setAccountMessage} setDisplayForm={setDisplayForm} />}
                    </div>
                    {accountMessage && <p> {accountMessage} </p>}
                </div>
            </>
        )
    }

    const householdInfo = () => {
        if (householdDetails.isSuccess) {
            setHousehold(householdDetails.data)
        }

        if (householdDetails.isloading) {
            return <div> Loading... </div>
        }

        return (
            <div className="householdInfo">
                <h3> {household.name} &nbsp; {!userInfo.sharedHouse?<span onClick={() => { setShowHouseholdEdits(!showHouseholdEdits) }}>{plusIcon}</span>:<span onClick={() => { setShowHouseholdEdits(!showHouseholdEdits) }}>{editIcon}</span>}  </h3>
                {household.users && household.users.map((user) => {
                    return (
                        <p className={user.color} key={user.id} id={user.id}> {userIcon} {user.name} </p>
                    )
                })}
            </div>
        )
    }


    const accountOptions = () => {
        return (
            <div className="accountOptions">
                {showHouseholdEdits && <button onClick={() => { setDisplayForm("joinHouseholdForm") }}> {joinHouseholdIcon} Join a household </button>}
                {showHouseholdEdits && <button onClick={() => { setDisplayForm("renameHouseholdForm") }}> {renameHouseholdIcon} Rename your household </button>}
                {showHouseholdEdits && !userInfo.sharedHouse && <button onClick={() => { setDisplayForm("sharedHouseholdForm") }}> {addUsersIcon} Create a household to share </button>}
                {showHouseholdEdits && userInfo.sharedHouse && <button onClick={() => { setHouseholdMessage(`Your household code is ${household.joinCode}`) }} > {addUsersIcon} Invite household members </button>}
                {showHouseholdEdits && userInfo.sharedHouse && <button onClick={() => { setDisplayForm("leaveHouseholdForm") }}> {leaveHouseholdIcon} Leave this household </button>}
                {showHouseholdEdits && userInfo.sharedHouse && <button onClick={() => { setDisplayForm("removeMemberForm") }}> {removeUserIcon} Remove a household member </button>}
                <div className="accountForms">
                    {displayForm === "sharedHouseholdForm" && < SharedHouseholdForm setHouseholdMessage={setHouseholdMessage} setDisplayForm={setDisplayForm} />}
                    {displayForm === "joinHouseholdForm" && < JoinHouseholdForm setHousehold={setHousehold} setHouseholdMessage={setHouseholdMessage} setDisplayForm={setDisplayForm} />}
                    {displayForm === "renameHouseholdForm" && < RenameHouseholdForm household={household} setHousehold={setHousehold} setDisplayForm={setDisplayForm} />}
                    {displayForm === "leaveHouseholdForm" && < LeaveHouseholdForm setDisplayForm={setDisplayForm} />}
                    {displayForm === "removeMemberForm" && < RemoveMemberForm household={household} setDisplayForm={setDisplayForm} />}
                </div>
                {householdMessage && <p> {householdMessage} </p>}
            </div>
        )
    }

    const logout = () => {
        dispatch(updateUser(null))
        dispatch(updateToken(null))
        pantryPartyApi.util.invalidateTags("User")
        setHouseholdMessage("")
        setAccountMessage("")
    }

    return (
        <div>
            {!userInfo?.username && <Register userInfo={userInfo} />}
            {!userInfo?.username && <Login userInfo={userInfo} />}
            {userInfo?.username &&
                <div className="accountPage">
                    {accountInfo()}
                    {householdInfo()}
                    {accountOptions()}
                    <button onClick={() => { logout() }}> Log out </button>
                </div>}
        </div>
    )
}