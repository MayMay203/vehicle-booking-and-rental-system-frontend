import CardMessage from './CardMessage'
function ListCardMessage({conversationList, handleChangeType, type}) {
  return (
    <div>
      {conversationList.map((convers, index) => (
        <CardMessage
          key={index}
          data={convers}
          handleChangeType={handleChangeType}
          type={type}
        />
      ))}
    </div>
  )
}
export default ListCardMessage
