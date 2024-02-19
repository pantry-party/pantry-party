//display of account information

import React, { useEffect, useContext, createContext, useState } from "react"
import { userIcon, addUsersIcon, removeUserIcon, createHouseholdIcon, joinHouseholdIcon, leaveHouseholdIcon, renameHouseholdIcon, colorIcon, passwordIcon, nameIcon } from "../styles/icons"
import { useGetHouseholdbyIdQuery } from "../storage/pantryPartyApi"
import Register from "./Register"
import "../styles/colors.css"
import Login from "./Login"
import { ColorForm, NameForm, PasswordForm, SharedHouseholdForm, JoinHouseholdForm, RenameHouseholdForm, LeaveHouseholdForm, RemoveMemberForm } from "./AccountFunctions" 

export default function AccountDisplay({userInfo, setUserInfo, household, setHousehold}) {
    const [token, setToken] = useState(null)

    const householdId = userInfo?.sharedHouse || userInfo?.defaultHouse
    const householdDetails = useGetHouseholdbyIdQuery(householdId)
    
    const [displayForm, setDisplayForm] = useState("")
    const [newColor, setNewColor] = useState("")
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newHousehold, setNewHousehold] = useState("")
    const [joinCode, setJoinCode] = useState("")
    const [newHouseholdName, setNewHouseholdName] = useState("")
    const [checked, setChecked] = useState(false)
    const [removal, setRemoval] = useState("") 

    const [accountMessage, setAccountMessage] = useState("")
    const [householdMessage, setHouseholdMessage] = useState("")

    const accountInfo = () => {
        return (
            <>
                <div className="accountInfo">
                    <p className={userInfo.color} id={userInfo.id}> {userIcon} Welcome {userInfo.name}! </p>
                    {/* Choose your color */}
                    <button onClick={() => { setDisplayForm("colorForm")}}> {colorIcon}  Choose your color </button>
                    {/* Change your name */}
                    <button onClick={() => { setDisplayForm("nameForm") }}> {nameIcon} Change your name </button>
                    {/* Change your password */}
                    <button onClick={() => {  setDisplayForm("passwordForm") }}> {passwordIcon} Change your password </button>
                    <div className="accountUpdateForms">
                        {displayForm === "colorForm" && <ColorForm newColor={newColor} setNewColor={setNewColor} userInfo={userInfo} setUserInfo={setUserInfo} setDisplayForm={setDisplayForm}/>}
                        {displayForm === "nameForm" && <NameForm newName={newName} setNewName={setNewName} userInfo={userInfo} setUserInfo={setUserInfo} setDisplayForm={setDisplayForm}/>} 
                        {displayForm === "passwordForm" && <PasswordForm newPassword={newPassword} setNewPassword={setNewPassword} userInfo={userInfo} setUserInfo={setUserInfo} accountMessage={accountMessage} setAccountMessage={setAccountMessage} setDisplayForm={setDisplayForm}/>}
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
                return <div> Loading... </div>}
        return (
            <div className="householdInfo">
                <h3> {household.name}</h3>
                {household.users && household.users.map((user) => {
                    return (
                        <p className={user.color} id={user.id}> {userIcon} {user.name} </p>
                    )
                })}
            </div>
        )
            }
    

    const accountOptions = () => {
        return (
            <div className="accountOptions">
                <button onClick={()=>{setDisplayForm("joinHouseholdForm") }}> {joinHouseholdIcon} Join a household </button> 
                <button onClick={() => {  setDisplayForm("renameHouseholdForm")  }}> {renameHouseholdIcon} Rename your household </button>
                {!userInfo.sharedHouse && <button onClick={() => { setDisplayForm("sharedHouseholdForm") }}> {addUsersIcon} Create a household to share </button>}
                {userInfo.sharedHouse && <button onClick={() => {setHouseholdMessage(`Your household code is ${household.joinCode}`)}} > {addUsersIcon} Invite household members </button>}
                {userInfo.sharedHouse && <button onClick={() => { setDisplayForm("leaveHouseholdForm")  }}> {leaveHouseholdIcon} Leave this household </button>}
                {userInfo.sharedHouse && <button onClick={() => {  setDisplayForm("removeMemberForm") }}> {removeUserIcon} Remove a household member </button>}
                <div className="accountForms"> 
                    {displayForm === "sharedHouseholdForm" && < SharedHouseholdForm userInfo={userInfo} setUserInfo={setUserInfo} newHousehold={newHousehold} setNewHousehold={setNewHousehold} householdMessage={householdMessage} setHouseholdMessage={setHouseholdMessage} setDisplayForm={setDisplayForm}/>} 
                    {displayForm === "joinHouseholdForm" && < JoinHouseholdForm userInfo={userInfo} setUserInfo={setUserInfo} joinCode={joinCode} setJoinCode={setJoinCode} household={household} setHousehold={setHousehold} householdMessage={householdMessage} setHouseholdMessage={setHouseholdMessage} setDisplayForm={setDisplayForm}/>} 
                    {displayForm === "renameHouseholdForm" && < RenameHouseholdForm household={household} setHousehold={setHousehold} newHouseholdName = {newHouseholdName} setNewHouseholdName={setNewHouseholdName} setDisplayForm={setDisplayForm} />}
                    {displayForm === "leaveHouseholdForm" && < LeaveHouseholdForm checked={checked} setChecked={setChecked} userInfo={userInfo} setUserInfo={setUserInfo} setDisplayForm={setDisplayForm}/>  } 
                    {displayForm === "removeMemberForm" && < RemoveMemberForm removal={removal} setRemoval={setRemoval} household={household} setDisplayForm={setDisplayForm}/> } 
                </div> 
                {householdMessage && <p> {householdMessage} </p>}
            </div>
        )
    }

    return (
        <div>
                {!userInfo?.username && <Register userInfo={userInfo} setUserInfo={setUserInfo} />}
                {!userInfo?.username && <Login userInfo={userInfo} setUserInfo={setUserInfo} />}
                {userInfo?.username && 
                    <div className="accountPage">
                        {accountInfo()}
                        {householdInfo()}
                        {accountOptions()}
                        <button onClick={() => { setUserInfo(null) ; setHouseholdMessage(""); setAccountMessage("") }}> Log out </button>
                    </div>}
        </div>
    )
}