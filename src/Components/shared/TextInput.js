import React from 'react'

const TextInput = ({label,placeholder,className,value,setValue,labelClassName}) => {
  return (
    <div className={`textInputdiv flex flex-col space-y-2 w-full ${className}`}>
        <label htmlFor={label} className={`font-semibold ${labelClassName}`}>{label}</label>
        <input type='text' placeholder={placeholder} className='p-3 border border-solid border-gray-400 rounded placeholder-gray-500' id={label}
          value={value}
          onChange={(e)=>{
            setValue(e.target.value)
          }}
        />
    </div>
  )
}

export default TextInput
