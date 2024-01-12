import React, { useState } from 'react'
import TextInput from '../Components/shared/TextInput'
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper'

const CreatePlaylistModal = ({closeModal}) => {
    const [playlistName,setPlaylistName]=useState('')
    const [playlistThumbnail,setPlaylistThumbnail]=useState('')
    
    const createPlaylist=async()=>{
        const response=await makeAuthenticatedPOSTRequest('/playlist/create',{name:playlistName,thumbnail:playlistThumbnail,songs:[]})
        if(response._id)
        {
            closeModal();
        }
    }
    
  return (
    <div className='absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center' onClick={closeModal}>
        <div className='bg-white w-1/3 rounded-md p-8' onClick={(e)=>{e.stopPropagation()}}>
            <div className='text-white font-bold text-lg space-y-4'>Create Playlist</div>
            <div className='space-y-4 flex flex-col justify-center items-center'>
                <TextInput
                    label={'Name'}
                    labelClassName={'text-black'}
                    placeholder={'Playlist Name'}
                    value={playlistName}
                    setValue={setPlaylistName}
                    />
                <TextInput
                    label={'thumbnail'}
                    labelClassName={'text-black'}
                    placeholder={'Thumbnail'}
                    value={playlistThumbnail}
                    setValue={setPlaylistThumbnail}
                    />
                <div className='bg-white w-1/3 rounded-full flex font-semibold justify-center items-center py-3 mt-4 border border-solid border-black cursor-pointer' onClick={createPlaylist}>Create</div>
            </div>
        </div>
    </div>
  )
}

export default CreatePlaylistModal
