import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoggedInContainer from '../Containers/LoggedInContainer'
import { makeAuthenticatedGETRequest } from '../utils/serverHelper'
import SingleSongCard from './shared/SingleSongCard'

const SinglePlaylistView = () => {
    const [playlistDetails,setPlaylistDetails]=useState({})
    const {playlistId}=useParams()
useEffect(()=>{
    const getData=async()=>{
        const response=await makeAuthenticatedGETRequest('/playlist/get/playlist/'+playlistId)
        setPlaylistDetails(response)
    }
    getData()
},[])

  return (
    <LoggedInContainer currActiveScreen={'library'}>
        <div className='text-white text-3xl pt-8 font-semibold'>{playlistDetails.name}</div>
        {
        playlistDetails._id?
        (
            <div className='pt-10 space-y-2'>
                {
                    playlistDetails.songs.map((item)=>{
                        return <SingleSongCard info={item} key={JSON.stringify(item)}/>
                    })
                }
            </div>
        )
        :
        (
            <div className='text-white text-xl font-semibold pt-6'>Sorry, Nothing to Show Here :(</div>
        )
        }
    </LoggedInContainer>
  )
}

export default SinglePlaylistView
