import { useState } from "react"
import { useSelector } from "react-redux"
import { useGetMessagesbyHouseholdIdQuery, useUpdateMessageMutation, useDeleteMessageMutation, useCreateMessageMutation } from "../storage/pantryPartyApi"
import { addNoteIcon, editIcon, deleteIcon, addIcon, sharingIcon } from "../styles/icons"

export default function Messages({ id }) {
    const messages = useGetMessagesbyHouseholdIdQuery(id)
    const messagesData = messages.data
    const userInfo = useSelector((it) => it.state.user)

    const [create, created] = useCreateMessageMutation()
    const [edit, edited] = useUpdateMessageMutation()
    const [deleteMessage, deletedMessage] = useDeleteMessageMutation()

    const [showAdd, setShowAdd] = useState(false)
    const [content, setContent] = useState("")
    const date = new Date()

    const [edits, setEdits] = useState(false)
    const [editId, setEditId] = useState(null)
    const [editcontent, setEditcontent] = useState("")

    if (messages.isLoading) {
        return <div>Reading sticky notes...</div>
    } else if (messages.isError) {
        return <div className="noMessages"><p>No sticky notes found</p></div>
    }

    function parseDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }

    async function handleAdd(e) {
        e.preventDefault()
        if (!content) {
            alert("Don't post blank notes please!")
        } else {
            try {
                await create({
                    content,
                    userId: userInfo.id,
                    householdId: id,
                    date
                })
            } catch (error) {
                setError(error.message)
            }
        }
        setShowAdd(false)
        setContent("")
    }

    async function handleEdits(e) {
        e.preventDefault()
        if (!editcontent) {
            alert("Please delete note instead of leaving it blank")
        } else {
            await edit({
                id: editId,
                content: editcontent
            })
        }
        setEdits(false)
        setEditcontent("")
    }

    function showEditor(messageId, messageContent) {
        setEdits(!edits)
        setEditId(messageId)
        setEditcontent(messageContent)
    }

    return (
        <div className="messageArea">
            <h3>Message Board <span className="accountEditButton" onClick={() => { setShowAdd(!showAdd) }}>{addNoteIcon}</span></h3>
            {showAdd &&
                <div className="messageEdit" id="addMessage">
                    <textarea
                        rows={3}
                        cols={25}
                        maxLength={255}
                        placeholder="Add a Message"
                        value={content}
                        onChange={(event) => { setContent(event.target.value) }}
                    />
                    <span onClick={handleAdd}> {addIcon}</ span>
                </div>}
            <div className="messageBoard">
                {messagesData.map((message) => {
                    return (
                        <div className={`message ${message.color}`} key={message.id} >
                            <span className="messageDate"><strong> {parseDate(message.date)} </strong> </span>
                            {edits && message.id === editId
                                ? <div className="messageEdit">
                                    <textarea
                                        rows={3}
                                        cols={25}
                                        maxLength={255}
                                        value={editcontent}
                                        onChange={(event) => { setEditcontent(event.target.value) }}
                                    />
                                    &nbsp;
                                    <span onClick={handleEdits}>{sharingIcon}</span>
                                </div>
                                : <>
                                    <span className="messageText">
                                        <p id="messageBody">{message.content}</p>
                                        <p id="messageUser"> -{message.name}</p>
                                    </span>
                                    <span className="messageEdits"> </span>
                                </>}
                            {!edits && message.userId === userInfo.id &&
                                <span className="messageEdits">
                                    <span className="messageEditButton" onClick={() => { deleteMessage(message.id) }}>{deleteIcon}</span>
                                    &nbsp;
                                    <span className="messageEditButton" onClick={() => { showEditor(message.id, message.content) }}>{editIcon}</span>
                                </span>}
                        </div>)
                })}
            </div>
        </div>
    )
}