import { useEffect, useState } from "react"
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
    const [check, setCheck] = useState(false)

    const [showAdd, setShowAdd] = useState(false)
    const [content, setContent] = useState("")
    const date = new Date()

    const [edits, setEdits] = useState(false)
    const [editId, setEditId] = useState(null)
    const [editcontent, setEditcontent] = useState("")

    useEffect(() => {
        if (created.isSuccess && !edited.isSuccess) {
            console.log(created.data)
            edit({ id: 4, content: "updated" })
        } else if (edited.isSuccess) {
            console.log(edited.data)
            deleteMessage(4)
        }
    }, [created.isSuccess, edited.isSuccess])

    if (messages.isLoading) {
        return <div>Reading sticky notes...</div>
    } else if (messages.isError) {
        return <div>No sticky notes found</div>
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
            try {
                await edit({
                    id: editId,
                    content: editcontent
                })
            } catch (error) {
                setError(error.message)
            }
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
        <>
            <div>
                <h3>Message Board <span onClick={(e) => { setShowAdd(!showAdd) }}>{addNoteIcon}</span></h3>
                {showAdd &&
                    <>
                        <input
                            type="text"
                            placeholder="Add a message"
                            value={content}
                            onChange={(e) => { setContent(e.target.value) }}
                        ></input>
                        <span onClick={handleAdd}> {addIcon}</ span>
                        <br />
                    </>}
                {messagesData.map((message) => {
                    return (
                        <>
                            <span>{parseDate(message.date)}</span>
                            <span className={`${message.color} CB${check} initial`} title={`Belongs to ${message.name}`} > {message.userInitial} </span>
                            {/* {<span>{message.content}</span>} */}
                            {edits && message.id === editId
                                ? <> <input
                                    type="text"
                                    value={editcontent}
                                    onChange={(e) => { setEditcontent(e.target.value) }}>
                                </input>
                                    &nbsp;
                                    <span onClick={handleEdits}>{sharingIcon}</span></>
                                : <span>{message.content}</span>}
                            &nbsp;
                            {!edits && message.userId === userInfo.id &&
                                <>
                                    <span onClick={(e) => { showEditor(message.id, message.content) }}>{editIcon}</span>
                                    &nbsp;
                                    <span onClick={(e) => { deleteMessage(message.id) }}>{deleteIcon}</span>
                                </>}
                            <br />
                        </>)
                })}
            </div>
        </>
    )
}