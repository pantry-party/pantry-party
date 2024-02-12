//display of account information
import React from "react"
import { useContext, createContext, useState } from "react"
import { userIcon } from "../styles/icons"
import { useCreateSharedHouseholdMutation, useEditHouseholdMutation, useEditUserMutation, useGetHouseholdbyJoinCodeQuery } from "../storage/pantryPartyApi"
import Register from "./Register"
import {colorForm, nameForm, passwordForm, sharedHouseholdForm, joinHouseholdForm, renameHouseholdForm, leaveHouseholdForm, removeMemberForm} from "./AccountFunctions"
import "../styles/colors.css"

export const userContext = createContext({ id: 1, name: "Paulina", color: "pink", sharedHousehold: 5 })
export const tokenContext = createContext(null)
export const householdContext = createContext({ users: [{ id: 2, name: "Cara", color: "yellow" }, { id: 3, name: "Samantha", color: "purple" }, { id: 4, name: "Lindsay", color: "blue" }] })
export const housenameContext = createContext("Paulina's household")

export default function AccountDisplay() {
    const [token, setToken] = useState(null)
    const userInfo = useContext(userContext)
    const housename = useContext(housenameContext)
    const household = useContext(householdContext)
    const [createSharedHousehold, sharedHouseholdInfo] = useCreateSharedHouseholdMutation()
    const [editHousehold, editedHousehold] = useEditHouseholdMutation()
    const [editUser, editedUser] = useEditUserMutation()
    const [displayForm, setDisplayForm] = useState("")
    console.log(token)
    const [newColor, setNewColor] = useState("")
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newHousehold, setNewHousehold] = useState("")
    const [joinCode, setJoinCode] = useState("")
    const [newHouseholdName, setNewHouseholdName] = useState("")
    const [checked, setChecked] = useState(false)
    const [removal, setRemoval] = useState("") 

    const accountInfo = () => {
        return (
            <>
                <div className="accountInfo">
                    <p className={userInfo.color} id={userInfo.id}> {userIcon} Welcome {userInfo.name}! </p>
                    {/* Choose your color */}
                    <button onClick={() => { setDisplayForm("colorForm")}}> Choose your color </button>
                    {/* Change your name */}
                    <button onClick={() => { setDisplayForm("nameForm") }}> Change your name </button>
                    {/* Change your password */}
                    <button onClick={() => {  setDisplayForm("passwordForm") }}> Change your password </button>
                    <div className="accountUpdateForms">
                        {displayForm === "colorForm" && colorForm({newColor, setNewColor})} 
                        {displayForm === "nameForm" && nameForm({newName, setNewName})} 
                        {displayForm === "passwordForm" && passwordForm({newPassword, setNewPassword})}
                        {console.log(newColor)}
                    </div>
                </div>
            </>
        )
    }

    const householdInfo = () => {
        return (
            <div className="householdInfo">
                <h3> {housename}</h3>
                {household.users.map((user) => {
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
                {!userInfo.sharedHousehold && <button onClick={() => { setDisplayForm("sharedHouseholdForm") }}> Create a household to share </button>}
                {/* <button onClick={()=>{setDisplayForm("joinHouseholdForm") }}> Join a household </button>  */}
                <button onClick={() => {  setDisplayForm("renameHouseholdForm")  }}> Rename your household </button>
                {userInfo.sharedHousehold && <button onClick={() => { setDisplayForm("leaveHouseholdForm")  }}> Leave this household </button>}
                {userInfo.sharedHousehold && <button onClick={() => {  setDisplayForm("removeMemberForm") }}> Remove a household member </button>}
                <div className="accountForms"> 
                    {displayForm === "sharedHouseholdForm" && sharedHouseholdForm({newHousehold, setNewHousehold})} 
                    {displayForm === "joinHouseholdForm" && joinHouseholdForm({joinCode, setJoinCode})} 
                    {displayForm === "renameHouseholdForm" && renameHouseholdForm({newHouseholdName, setNewHouseholdName})}
                    {displayForm === "leaveHouseholdForm" && leaveHouseholdForm({checked, setChecked})} 
                    {displayForm === "removeMemberForm" && removeMemberForm({removal, setRemoval, household})} 
                </div> 
            </div>
        )
    }

    return (
        <div>
            <userContext.Provider value={userInfo}>
                {!token && <Register />}
                {}
                {
                    <div className="accountPage">
                        {accountInfo()}
                        {householdInfo()}
                        {accountOptions()}
                        <button onClick={() => { setToken(null) }}> Log out </button>
                    </div>}
            </userContext.Provider>
        </div>
    )
}