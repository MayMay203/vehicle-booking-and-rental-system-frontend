import CardMessage from './CardMessage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function ListCardMessage({ buttonSelect, handleClose }) {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Bùi Thiên Bảo', message: 'Chào bạn....', time: '12h00, 23/08/2024', isSeen: false },
    { id: 2, name: 'Nguyễn Văn A', message: 'Xin chào!', time: '12h01, 23/08/2024', isSeen: false },
    { id: 3, name: 'Trần Thị B', message: 'Bạn khỏe không?', time: '12h02, 23/08/2024', isSeen: false },
    { id: 4, name: 'Lê Văn C', message: 'Tạm biệt!', time: '12h03, 23/08/2024', isSeen: false },
    { id: 5, name: 'Trần Thị B', message: 'Bạn khỏe không?', time: '12h02, 23/08/2024', isSeen: false },
    { id: 6, name: 'Lê Văn C', message: 'Tạm biệt!', time: '12h03, 23/08/2024', isSeen: false },
  ])
  const navigate = useNavigate()
  const handleShowMessage = (id, name) => {
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === id ? { ...msg, isSeen: true } : msg)));
    handleClose();
    navigate('/message', { state: { id: id, name: name} });
    
  }
  const filteredMessages = buttonSelect === 'Unread' ? messages.filter((msg) => !msg.isSeen) : messages
  return (
    <div>
      {filteredMessages.map((msg) => (
        <CardMessage
          key={msg.id}
          isSeen={msg.isSeen}
          handleShowMessage={() => handleShowMessage(msg.id, msg.name)}
          name={msg.name}
          message={msg.message}
          time={msg.time}
        />
      ))}
    </div>
  )
}
export default ListCardMessage
