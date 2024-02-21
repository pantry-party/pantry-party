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
import "../styles/account.css"

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

    const [colorButton, setColorButton] = useState("")
    const [nameButton, setNameButton] = useState("")
    const [userNameButton, setUserNameButton] = useState("")
    const [passwordButton, setPasswordButton] = useState("")
    const [createButton, setCreateButton] = useState("")
    const [joinButton, setJoinButton] = useState("")
    const [leaveButton, setLeaveButton] = useState("")
    const [renameButton, setRenameButton] = useState("")
    const [removeButton, setRemoveButton] = useState("")
    const [inviteButton, setInviteButton] = useState("")


    const accountInfo = () => {
        return (
            <>
                <div className="accountInfo">
                    <div className="welcome">
                        <h2 className={userInfo.color}> {userIcon} &nbsp; </h2>
                        <h2> Welcome &nbsp; </h2>
                        <h2 className={userInfo.color} id={userInfo.id}>{userInfo.name}! &nbsp; </h2>
                        <h2> {<span onClick={() => { setShowUserEdits(!showUserEdits); setDisplayForm(""); setColorButton("") ; setNameButton("") ; setUserNameButton("") ; setPasswordButton("") ; setShowHouseholdEdits(false)}}>{editIcon}</span>} </h2>
                    </div>
                    <div className="accountButtons">
                        {/* Choose your color */}
                        {showUserEdits && <button id="colorFormButton" className={colorButton} onClick={() => { setDisplayForm("colorForm"); setColorButton("clicked") ; setNameButton("") ; setUserNameButton(""); setPasswordButton("") }}> {colorIcon}  Choose your color </button>}
                        {/* Change your name */}
                        {showUserEdits && <button id="nameFormButton" className={nameButton} onClick={() => { setDisplayForm("nameForm") ; setNameButton("clicked") ; setColorButton("") ; setUserNameButton(""); setPasswordButton("")}}> {nameIcon} Change your name </button>}
                        {/* Change your username */}
                        {showUserEdits && <button id="usernameFormButton" className={userNameButton} onClick={() => { setDisplayForm("usernameForm") ; setUserNameButton("clicked") ; setColorButton("") ; setPasswordButton("") ; setNameButton("") }}> {nameIcon} Change your username </button>}
                        {/* Change your password */}
                        {showUserEdits && <button id="passwordFormButton" className={passwordButton} onClick={() => { setDisplayForm("passwordForm") ; setPasswordButton("clicked") ; setColorButton(""); setNameButton(""), setUserNameButton("")}}> {passwordIcon} Change your password </button>}
                    </div>
                    <div className="accountForms">
                        {displayForm === "colorForm" && <ColorForm setDisplayForm={setDisplayForm} setColorButton={setColorButton}/>}
                        {displayForm === "nameForm" && <NameForm setDisplayForm={setDisplayForm} setNameButton={setNameButton} />}
                        {displayForm === "usernameForm" && <UsernameForm setDisplayForm={setDisplayForm} setUserNameButton={setUserNameButton} />}
                        {displayForm === "passwordForm" && <PasswordForm accountMessage={accountMessage} setAccountMessage={setAccountMessage} setDisplayForm={setDisplayForm} setPasswordButton={setPasswordButton} />}
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
                <h3> {household.name} &nbsp; {!userInfo.sharedHouse ? <span onClick={() => { setShowHouseholdEdits(!showHouseholdEdits) ; setShowUserEdits(false) }}>{plusIcon}</span> : <span onClick={() => { setShowHouseholdEdits(!showHouseholdEdits) ; setShowUserEdits(false) ; setDisplayForm("")  }}>{editIcon}</span>}  </h3>
                {household.users && household.users.map((user) => {
                    return (
                        <div className="userInfo">
                            <p className={user.color} > {userIcon} &nbsp; </p>
                            <p key={user.id} id={user.id}> {user.name} </p>
                        </div>
                    )
                })}
            </div>
        )
    }


    const accountOptions = () => {
        return (
            <div className="accountOptions">
                <div className="accountButtons">
                    {showHouseholdEdits && <button id="joinButton" className={joinButton} onClick={() => { setDisplayForm("joinHouseholdForm") ; setHouseholdMessage("") ; setJoinButton("clicked") ; setRenameButton("") ; setCreateButton(""); setInviteButton("") ; setRemoveButton("") ; setLeaveButton("") }}> {joinHouseholdIcon} Join a household </button>}
                    {showHouseholdEdits && <button id="renameButton" className={renameButton} onClick={() => { setDisplayForm("renameHouseholdForm") ; setHouseholdMessage("") ; setRenameButton("clicked"); setJoinButton(""); setCreateButton("") ; setInviteButton("") ; setRemoveButton(""); setLeaveButton("") }}> {renameHouseholdIcon} Rename your household </button>}
                    {showHouseholdEdits && !userInfo.sharedHouse && <button id="createButton" className={createButton} onClick={() => { setDisplayForm("sharedHouseholdForm") ; setHouseholdMessage("") ; setCreateButton("clicked"); setJoinButton("") ; setRenameButton(""); setInviteButton(""); setRemoveButton(""); setLeaveButton("") }}> {addUsersIcon} Create a household to share </button>}
                    {showHouseholdEdits && userInfo.sharedHouse && <button id="inviteButton" className={inviteButton} onClick={() => { setHouseholdMessage(`Your household code is ${household.joinCode}`) ; setDisplayForm(""); setInviteButton("clicked") ; setCreateButton("") ; setJoinButton(""); setRenameButton(""); setRemoveButton(""); setLeaveButton("")}} > {addUsersIcon} Invite household members </button>}
                    {showHouseholdEdits && userInfo.sharedHouse && <button id="leaveButton" className={leaveButton} onClick={() => { setDisplayForm("leaveHouseholdForm") ; setHouseholdMessage("") ; setLeaveButton("clicked"); setJoinButton(""); setCreateButton(""); setRenameButton(""); setRemoveButton(""); setInviteButton("")}}> {leaveHouseholdIcon} Leave this household </button>}
                    {showHouseholdEdits && userInfo.sharedHouse && <button id="removeButton" className={removeButton} onClick={() => { setDisplayForm("removeMemberForm") ; setHouseholdMessage("") ; setRemoveButton("clicked") ; setLeaveButton(""); setJoinButton(""); setCreateButton(""); setRenameButton(""); setInviteButton("")}}> {removeUserIcon} Remove a household member </button>}
                </div>
                <div className="accountForms">
                    {displayForm === "sharedHouseholdForm" && < SharedHouseholdForm setHouseholdMessage={setHouseholdMessage} setDisplayForm={setDisplayForm} setCreateButton={setCreateButton} />}
                    {displayForm === "joinHouseholdForm" && < JoinHouseholdForm setHousehold={setHousehold} setHouseholdMessage={setHouseholdMessage} setDisplayForm={setDisplayForm} setJoinButton={setJoinButton} />}
                    {displayForm === "renameHouseholdForm" && < RenameHouseholdForm household={household} setHousehold={setHousehold} setDisplayForm={setDisplayForm} setRenameButton={setRenameButton} />}
                    {displayForm === "leaveHouseholdForm" && < LeaveHouseholdForm setDisplayForm={setDisplayForm} setLeaveButton={setLeaveButton} />}
                    {displayForm === "removeMemberForm" && < RemoveMemberForm household={household} setDisplayForm={setDisplayForm} setRemoveButton={setRemoveButton} />}
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

                </div>}
            {userInfo?.username &&
                <div className="logOut">
                    <button className="logOutButton" onClick={() => { logout() }}> Log out </button>
                </div>}
        </div>
    )
}