import React, { useState,} from 'react'
import {useNavigate } from 'react-router-dom';
// import Spotify_logo from '../Assets/Images/spotify_logo_white.svg'
// import IconText from './shared/IconText'
// import { Icon } from '@iconify/react';
// import TextwithHover from './shared/TextwithHover';
// import {Howl,Howler} from 'howler' 
// import { useState } from 'react';
import { useEffect } from 'react';
import LoggedInContainer from '../Containers/LoggedInContainer';
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';

// const FocusCards=[
//   {
//     "title":'Focus',
//     'description':"desc",
//     'ImgUrl':'https://artwork-cdn.7static.com/static/img/sleeveart/00/339/526/0033952666_350.jpg',
//   }
// ]


const LoggedInComponent=()=>{
  const [playlistData,setPlaylistData]=useState([])
  useEffect(()=>{
    const getData=async()=>{
        const response=await makeAuthenticatedGETRequest('/playlist/get/all')
        const UserID=response.data
        const allResponses = await Promise.all(UserID.map((item) => {
          return makeAuthenticatedGETRequest(`/playlist/get/artist/${item}`)
        }))
        console.log(allResponses)
        setPlaylistData(allResponses)
    }
    getData();
},[])

  return (
      <LoggedInContainer currActiveScreen={'home'}>
        <div className='text-3xl font-semibold text-white pt-8'>Today's Hits</div>
        <div className='py-5 grid gap-5 grid-cols-5  '>
            {
                playlistData.map((item2)=>{
                  return item2.data.map((item)=>{
                    return <Card title={item.name} ImgUrl={item.thumbnail} description='' key={JSON.stringify(item)} playlistId={item._id}/>
                  })
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
    
export default LoggedInComponent