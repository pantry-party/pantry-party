import { useEffect } from "react"
import { useGetMessagesbyHouseholdIdQuery, useUpdateMessageMutation, useDeleteMessageMutation, useCreateMessageMutation } from "../storage/pantryPartyApi"

export default function Messages ({ id }) {
    const messages = useGetMessagesbyHouseholdIdQuery(id)
    const [create, created] = useCreateMessageMutation()
    const [edit, edited] = useUpdateMessageMutation()
    const [deleteMessage, deletedMessage] = useDeleteMessageMutation()

    console.log(messages.data)

    useEffect(() => {
        create({content: "test", userId: 1, householdId: 1, date: new Date()})
    }, [])
    

    useEffect(() => {
        if (created.isSuccess && !edited.isSuccess) {
            console.log(created.data)
            edit({id: 4, content: "updated"})
        } else if (edited.isSuccess) {
            console.log(edited.data)
            deleteMessage(4)
        }
    }, [created.isSuccess, edited.isSuccess])
}