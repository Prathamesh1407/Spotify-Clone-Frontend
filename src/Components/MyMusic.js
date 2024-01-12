import React, { useState,useEffect,useContext } from 'react'
import songContext from '../Context/songContext';
import SingleSongCard from './shared/SingleSongCard'
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
import LoggedInContainer from '../Containers/LoggedInContainer';
import CreatePlaylistModal from '../Modals/CreatePlaylistModal';

const MyMusic=()=>{
    const [songData,setSongData]=useState([])
    useEffect(()=>{
        const getData=async()=>{
            const response=await makeAuthenticatedGETRequest('/song/get/mysongs')
            // console.log(response)
            setSongData(response.data)
        }
        getData();
    },[])

    return(
        <LoggedInContainer currActiveScreen={'myMusic'}>
            <div className='text-white font-semibold text-3xl pt-8 pb-4 pl-2'>My Songs</div>
            <div className='space-y-3 overflow-auto'>
                {songData.map((item)=>{
                    return <SingleSongCard info={item} key={JSON.stringify(item)} playSound={()=>{}}/>
                })}
            </div>
        </LoggedInContainer>
    )
}

export default MyMusic
