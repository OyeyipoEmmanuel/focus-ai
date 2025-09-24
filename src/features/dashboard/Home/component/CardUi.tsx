
const CardUi = (props:any) => {
  return (
    <div className={`rounded-2xl bg-white px-4 py-4 shadow-sm ${props.className}`} key={props?.key}>
        {props.children}
    </div>
  )
}

export default CardUi