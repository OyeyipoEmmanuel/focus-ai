
type SubmitProp = {
  btnName:string;
  loadingState?:boolean
}

const SubmitBtn = (props:SubmitProp) => {
  return (
    <button className={`text-center w-full bg-black py-[10px] text-white rounded-2xl mb-2 cursor-pointer hover:border-[0.5px] hover:border-black hover:bg-[#F9FAFB] hover:transition-all hover:text-black hover:ease-in-out duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed`} disabled={props.loadingState || false} >{props.btnName}</button>
  )
}

export default SubmitBtn