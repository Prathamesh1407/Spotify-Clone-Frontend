import React, { useState } from 'react'
import LoggedInContainer from '../Containers/LoggedInContainer'
import { Icon } from '@iconify/react';
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
import SingleSongCard from './shared/SingleSongCard';

const SearchPageComponent = () => {
    const [isInputFocused,setIsInputFocused]=useState(false)
    const [searchText,setSearchText]=useState('');
    const [songData,setSongData]=useState([])

    const searchSong=async()=>{
        const response=await makeAuthenticatedGETRequest('/song/get/songname/'+searchText)
        setSongData(response.data)
    }


  return (
    <LoggedInContainer currActiveScreen={'search'}>
        <div className='w-full py-6'>
            <div className={`w-1/3 p-3 py-5 text-sm rounded-full bg-black px-5 flex justify-center items-center space-x-3 ${isInputFocused?'border border-white':''}`}>
            <Icon icon="iconoir:search" className='text-white' fontSize={18} />                
            <input type='text' placeholder='What do you want to listen to?' className='w-full bg-black text-white focus:outline-none' 
                onFocus={()=>{
                    setIsInputFocused(true);
                }}   
                onBlur={()=>{
                    setIsInputFocused(false);
                }}
                value={searchText}
                onChange={(e)=>{setSearchText(e.target.value)}}
                onKeyDown={(e)=>{
                    if(e.key==='Enter')
                    {
                        searchSong()
                    }
                }}
            />
            </div>
            {songData.length>0?
                (
                    <div className='pt-10 space-y-2'>
                        <div className='text-white text-2xl pl-2 mb-6'>
                            Showing search results for <span className='font-bold'>{searchText}</span>
                            </div>
                        {
                            songData.map((item)=>{
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
        </div>
    </LoggedInContainer>
  )
}

export default SearchPageComponent
