import { Empty } from 'antd'
import CardMessage from './CardMessage'
function ListCardMessage({conversationList, handleChangeType, type}) {
  return (
    <div>
      {
        conversationList.length > 0 ? conversationList.map((convers, index) => (
        <CardMessage
          key={index}
          data={convers}
          handleChangeType={handleChangeType}
          type={type}
        />
      )) : <Empty style={{marginTop: '40px'}} description='Không có tin nhắn nào gần đây'/>
      }
    </div>
  )
}
export default ListCardMessage
