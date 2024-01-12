import React from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const IconText = ({iconName,displayText,active,targetLink,onClick}) => {
  return (
    <Link to={targetLink} className='block' onClick={onClick}>
      <div className='flex items-center justify-start cursor-pointer'>
        <div className='px-5 py-1'>
              <Icon icon={iconName} color={active?'white':'gray'} fontSize={30}/>
        </div>
        <div className={`${active?'text-white':'text-gray-400'} font-semibold hover:text-white`}>{displayText}</div>
      </div>
    </Link>
  )
}

export default IconText
