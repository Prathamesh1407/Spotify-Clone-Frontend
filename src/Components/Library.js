import React, { useEffect, useState } from 'react'
import LoggedInContainer from '../Containers/LoggedInContainer'
import { makeAuthenticatedGETRequest } from '../utils/serverHelper'
import { useNavigate } from 'react-router-dom'
const Library = () => {
    const [myPlaylistData,setMyPlaylistData]=useState([])
    useEffect(()=>{
        const getData=async()=>{
            const response=await makeAuthenticatedGETRequest('/playlist/get/me')
            setMyPlaylistData(response.data);
        }
        getData();
    },[])
  return (
    <LoggedInContainer currActiveScreen={'library'}>
        <div className='text-white text-3xl font-semibold pt-8 mb-8'>My Playlists</div>
        <div className='py-5 grid gap-5 grid-cols-5  '>
            {
                myPlaylistData.map((item)=>{
                    return <Card title={item.name} ImgUrl={item.thumbnail} description='' key={JSON.stringify(item)} playlistId={item._id}/>
                })
            }
        </div>
    </LoggedInContainer>
  )
}

const Card=({title,description,ImgUrl,playlistId})=>{
  const navigate=useNavigate()
    return(
      <div className='bg-black bg-opacity-60 w-full p-3 rounded-lg cursor-pointer' onClick={()=>{navigate('/playlist/'+playlistId)}}>
        <div className='py-4'>
          <img className='w-full rounded-md' src={ImgUrl} alt=''/>
        </div>
        <div className='text-white font-semibold py-3'>{title}</div>
        <div className='text-gray-500 text-sm'>{description}</div>
      </div>
    )
  }



export default Library
