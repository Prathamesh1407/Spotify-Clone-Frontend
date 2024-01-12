import React from 'react'
import { useContext } from 'react'
import songContext from '../../Context/songContext'


const SingleSongCard = ({info,playSound}) => {
  const {currentSong,setCurrentSong}=useContext(songContext)
//  console.log(info);
  return (
    <div className='flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm' 
    onClick={()=>{
      setCurrentSong(info);
    }}>
      <div className='w-12 h-12 bg-cover bg-center' style={{backgroundImage:`url('${info.thumbnail}')`}}>
        
      </div>
      <div className='flex w-full'>
        <div className='text-white flex flex-col justify-center pl-4 w-5/6'>
                <div className='hover:underline cursor-pointer'>{info.name}</div>
                <div className='text-xs text-gray-500 hover:underline cursor-pointer'>{info.artist.firstName+" "+info.artist.lastName}</div>
        </div>
        <div className='w-1/6 flex items-center justify-center text-gray-400 text-sm font-semibold'>
            {Math.floor(info.duration/60)}:{(info.duration%60).toPrecision(2)}
        </div>
      </div>
    </div>
  )
}

export default SingleSongCard
