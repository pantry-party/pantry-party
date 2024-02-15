//display of account information

import React, { useEffect, useContext, createContext, useState } from "react"
import { userIcon, addUsersIcon, removeUserIcon, createHouseholdIcon, joinHouseholdIcon, leaveHouseholdIcon, renameHouseholdIcon, colorIcon, passwordIcon, nameIcon } from "../styles/icons"
import { useGetHouseholdbyIdQuery, useCreateSharedHouseholdMutation, useEditHouseholdMutation, useEditUserMutation, useGetHouseholdbyJoinCodeQuery } from "../storage/pantryPartyApi"
import Register from "./Register"
import "../styles/colors.css"
import Login from "./Login"
import { ColorForm, NameForm, PasswordForm, SharedHouseholdForm, JoinHouseholdForm, renameHouseholdForm, leaveHouseholdForm, removeMemberForm } from "./AccountFunctions" 

export default function AccountDisplay({userInfo, setUserInfo, household, setHousehold}) {
    const [token, setToken] = useState(null)

    const householdId = userInfo.sharedHouse || userInfo.defaultHouse
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
                        {displayForm === "colorForm" && <ColorForm newColor={newColor} setNewColor={setNewColor} userInfo={userInfo} setUserInfo={setUserInfo}/>}
                        {displayForm === "nameForm" && <NameForm newName={newName} setNewName={setNewName} userInfo={userInfo} setUserInfo={setUserInfo}/>} 
                        {displayForm === "passwordForm" && <PasswordForm newPassword={newPassword} setNewPassword={setNewPassword} userInfo={userInfo} setUserInfo={setUserInfo}/>}
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        if (householdDetails.isSuccess) {
            console.log(householdDetails.data)
            setHousehold(householdDetails.data)
        }}, [householdDetails.isSuccess])

        if (householdDetails.isloading) { 
                return <div> Loading... </div>}


    const householdInfo = () => {
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
                    {displayForm === "sharedHouseholdForm" && < SharedHouseholdForm userInfo={userInfo} setUserInfo={setUserInfo} newHousehold={newHousehold} setNewHousehold={setNewHousehold} householdMessage={householdMessage} setHouseholdMessage={setHouseholdMessage}/>} 
                    {displayForm === "joinHouseholdForm" && < JoinHouseholdForm userInfo={userInfo} setUserInfo={setUserInfo} joinCode={joinCode} setJoinCode={setJoinCode} />} 
                    {displayForm === "renameHouseholdForm" && renameHouseholdForm({newHouseholdName, setNewHouseholdName})}
                    {displayForm === "leaveHouseholdForm" && leaveHouseholdForm({checked, setChecked})} 
                    {displayForm === "removeMemberForm" && removeMemberForm({removal, setRemoval, household})} 
                </div> 
                {householdMessage && <p> {householdMessage} </p>}
            </div>
        )
    }

    return (
        <div>
                {!userInfo.username && <Register userInfo={userInfo} setUserInfo={setUserInfo} />}
                {!userInfo.username && <Login userInfo={userInfo} setUserInfo={setUserInfo} />}
                {userInfo.username && 
                    <div className="accountPage">
                        {accountInfo()}
                        {householdInfo()}
                        {accountOptions()}
                        <button onClick={() => { setUserInfo(null); setHousehold(null) }}> Log out </button>
                    </div>}
        </div>
    )
}