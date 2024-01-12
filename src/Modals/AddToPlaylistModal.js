import React, { useEffect,useState } from 'react'
import { makeAuthenticatedGETRequest } from '../utils/serverHelper'

const AddToPlaylistModal = ({closeModal,AddSongToPlaylist}) => {
    const [myPlaylistData,setMyPlaylistData]=useState([])
    useEffect(()=>{
        const getData=async()=>{
            const response=await makeAuthenticatedGETRequest('/playlist/get/me')
            setMyPlaylistData(response.data);
        }
        getData();
    },[])
  return (
    <div className='absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center' onClick={closeModal}>
    <div className='bg-app-black w-1/3 rounded-md p-8' onClick={(e)=>{e.stopPropagation()}}>
        <div className='text-white font-bold text-xl space-y-4 mb-3'>Select Playlist</div>
        <div className='space-y-4 flex flex-col justify-center items-center'>
            {
            myPlaylistData.map((item)=>{
                return <PlaylistListComponent info={item} AddSongToPlaylist={AddSongToPlaylist}/>
            })
            }
        </div>
    </div>
</div>
  )
}

const PlaylistListComponent=({info,AddSongToPlaylist})=>{
    return(
        <div className='bg-app-black flex  items-center w-full space-x-4 hover:bg-gray-600 hover:bg-opacity-20 cursor-pointer p-4' onClick={()=>{
            AddSongToPlaylist(info._id)
        }}>
            <div>
                <img src={info.thumbnail} className='w-16 h-16 rounded'/>
            </div>
            <div>
                <div className='text-lg text-white font-semibold'>{info.name}</div>
            </div>
        </div>
    )
}

export default AddToPlaylistModal
