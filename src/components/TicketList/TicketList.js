import TicketItem from "./TicketItem";
function TicketList({status}) {
    return (
      <div>
        <TicketItem status={status} />
        <TicketItem status={status} />
        <TicketItem status={status} />
        <TicketItem status={status} />
      </div>
    )
}

export default TicketList;