//choose/edit color, join household, create household,  add users to household, leave household, log out

import { useContext } from "react"

export default function AccountFunctions() {

    return (
        <div> </div>
    )
}

export const colorForm = ({newColor, setNewColor}) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "gray", "teal", "brown"]

    return (
        <form id="colorForm" className="accountForm" onSubmit={(e) => { colorFormSubmit(e) }}>
            <label> Colors:
                <select required name="colors" onChange={(e) => { setNewColor(e.target.value) }}>
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

export const nameForm = ({newName, setNewName}) => {

    return (
        <form id="nameForm" className="accountForm" onSubmit={(e) => { nameFormSubmit() }}>
            <label> New Name:
                <input type="text" onChange={(e) => { setNewName(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const passwordForm = ({newPassword, setNewPassword}) => {

    return (
        <form id="passwordForm" className="accountForm" onSubmit={(e) => { passwordFormSubmit(e) }}>
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
        <form>
            <label> Are you sure?
                <input type="checkbox" onCheck={(e) => { setChecked(e.target.value) }} />
            </label>
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}

export const removeMemberForm = ({removal, setRemoval, household}) => {
    {console.log(household)}
    return (
        <form>
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