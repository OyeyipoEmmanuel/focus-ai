
const CardUi = (props:any) => {
  return (
    <div className='bg-white border-[0.5px] border-gray-300 p-5 rounded-3xl shadow-md md:p-7' key={props.idKey}>{props.children}</div>
  )
}

export default CardUi