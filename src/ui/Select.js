import {useState} from "react";

export default function Select({defValue, onChange, options}){
    const initialSelected = options.filter((opt)=> opt.value === defValue)
    const [selected, setSelected] = useState(initialSelected[0])
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div>
            <div
                className='flex justify-between w-[340px] px-[20px] py-[9px]
                rounded-3xl border-2 border-[#000AFF] cursor-pointer hover:text-[#000AFF]'
                onClick={() => setIsOpen(!isOpen)}>
                {selected.text}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     className={isOpen? 'w-6 h-6 stroke-[#000AFF] transition duration-150'
                         :'w-6 h-6 stroke-[#000AFF] transition duration-150 rotate-180' }>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
            </div>
            {isOpen &&
                <div
                    className='absolute bg-white w-[340px] px-[20px] py-[9px] rounded-3xl
                    border-2 border-[#000AFF] grid grid-flow-row'
                >
                {options.filter((opt) => opt.value !== selected.value).map((opt, index) => {
                    return (
                        <div
                            className='cursor-pointer hover:text-[#000AFF]'
                            key={index}
                            value={opt.value}
                            onClick={() => {
                                setSelected(opt)
                                setIsOpen(false)
                                onChange(opt.value)
                            }}
                        >
                            {opt.text}

                        </div>
                    )
                })}
            </div>}
        </div>
    )
}