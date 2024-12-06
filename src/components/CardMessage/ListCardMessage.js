import CardMessage from './CardMessage'
function ListCardMessage({conversationList}) {
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
