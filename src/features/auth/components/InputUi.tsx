

const InputUi = (props: any) => {
    return (
        <div className='flex flex-col space-y-2'>
            <label htmlFor={props.htmlFor} className=''>{props.labelName}</label>
            <div className='flex items-center space-x-5 bg-[#F8FAFC] px-3 py-3 rounded-xl'>
                <span className='text-xl text-gray-500'>{props.icon}</span>
                <input
                    type={props.inputType}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    className='outline-none w-full placeholder:text-sm placeholder:text-gray-600'
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    )
}

export default InputUi