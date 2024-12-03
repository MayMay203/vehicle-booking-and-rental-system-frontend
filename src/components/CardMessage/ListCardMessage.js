import CardMessage from './CardMessage'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllConversation } from '~/apiServices/messageService/getAllConversation'
function ListCardMessage() {
  const [conversationList, setConversationList] = useState([])
  const { currentUser } = useSelector((state) => state.user)
  const {currentRole} = useSelector((state) => state.menu)
 useEffect(() => {
   async function fetchAllConversation() {
     const conversations = await getAllConversation(currentUser.id, currentRole)
     if (conversations) {
       setConversationList(conversations.filter(conversation => conversation.lastMessage !== null))
     }
   }
   fetchAllConversation()
 }, [currentUser.id, currentRole])
  return (
    <div>
      {conversationList.map((convers, index) => (
        <CardMessage
          key={index}
          data={convers}
        />
      ))}
    </div>
  )
}
export default ListCardMessage
