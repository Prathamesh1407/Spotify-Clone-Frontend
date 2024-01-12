import React, { useContext, useLayoutEffect, useRef} from 'react'
import { Cookies, useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Spotify_logo from '../Assets/Images/spotify_logo_white.svg'
import IconText from '../Components/shared/IconText'
import { Icon } from '@iconify/react';
import TextwithHover from '../Components/shared/TextwithHover';
import {Howl,Howler} from 'howler' 
import { useState } from 'react';
import songContext from '../Context/songContext';
import CreatePlaylistModal from '../Modals/CreatePlaylistModal';
import AddToPlaylistModal from '../Modals/AddToPlaylistModal';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';


const LoggedInContainer = ({children,currActiveScreen}) => {
  

  const {currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused}=useContext(songContext)
  const firstUpdate=useRef(true)

  const [createPlaylistModalOpen,setCreatePlaylistModalOpen]=useState(false)
  const [AddToPlaylistModalOpen,setAddToPlaylistModalOpen]=useState(false)
  const [cookie,setCookie,removeCookie]=useCookies(['firstName','lastName','token'])


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const LogOut=()=>{
      removeCookie('token')
      removeCookie('firstName')
      removeCookie('lastName')
  }
  useLayoutEffect(()=>{
    if(firstUpdate.current)
    {
        firstUpdate.current=false
        return 
    }
    if(!currentSong)
    {
        return;
    }
    changeSound(currentSong.track)
  },[currentSong && currentSong.track])



  const AddSongToPlaylist=async(playlistId)=>{
    const songId=currentSong._id
    const data={playlistId,songId}
    const response=await makeAuthenticatedPOSTRequest('/playlist/add/song',data)
    if(response._id)
    {
      setAddToPlaylistModalOpen(false)
    }
  }



  const playSound=()=>{
    if(!soundPlayed)
    {
        return;
    }
    soundPlayed.play()
  }
    const changeSound=(songSrc)=>{
        if(soundPlayed)
        {
            soundPlayed.stop()
        }
        let sound=new Howl({
            src:[songSrc],
            html5:true,
        })
        setSoundPlayed(sound)
        sound.play();
        setIsPaused(false);
    }
    const pauseSound=()=>{
      soundPlayed.pause();
    }
    const togglePlayPause=()=>{
      if(isPaused)
      {
        playSound(currentSong.track);
        setIsPaused(false)
      }
      else
      {
        pauseSound();
        setIsPaused(true)
      }
    }
  return (
      <div className='w-full h-full bg-app-black'>
        {createPlaylistModalOpen && <CreatePlaylistModal closeModal={
          ()=>{setCreatePlaylistModalOpen(false)}
        }/>}
        { AddToPlaylistModalOpen && <AddToPlaylistModal closeModal={
          ()=>{
            setAddToPlaylistModalOpen(false)
          }
        }
        AddSongToPlaylist={AddSongToPlaylist}
          />}
      <div className={`${currentSong?'h-9/10':'h-full'} w-full  flex`}>
          <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-10'>
            <div>
                <div className='logoDiv p-6'>
                    <img src={Spotify_logo} alt='logo' width={125}/>
                </div>
                <div>
                  <IconText iconName={'majesticons:home'} displayText={'Home'} targetLink={'/home'}  active={currActiveScreen==='home'}/>
                  <IconText iconName={'majesticons:search-line'} displayText={'Search'} targetLink={'/search'} active={currActiveScreen==='search'}/>
                  <IconText iconName={'fluent:library-20-filled'} displayText={'Your Library'} targetLink={'/library'} active={currActiveScreen==='library'}/>
                  <IconText iconName={'material-symbols:library-music'} displayText={'My Music'} targetLink={'/mymusic'} active={currActiveScreen==='myMusic'}/>
                </div>
                <div className='mt-6'>
                  <IconText iconName={'basil:add-solid'} displayText={'Create Playlist'} onClick={()=>{setCreatePlaylistModalOpen(true)}}/>
                  <IconText iconName={'solar:chat-square-like-bold'} displayText={'Liked Songs'}/>
                </div>
            </div>
            <div className='px-5'>
              <div className='border border-gray-100 text-white w-1/3 flex items-center justify-center rounded-full px-2 py-1 hover:border-white cursor-pointer'>
                <Icon icon="ph:globe-bold" color="white"/>
                <div className='text-bold'>English</div>
              </div>
            </div>
        </div>
        <div className='h-full w-4/5 bg-app-black overflow-auto'>
            <div className='navbar w-full h-1/10 bg-black bg-opacity-40 flex justify-end'>
              <div className='w-1/2 flex h-full'>
                <div className='w-2/3 flex justify-around items-center'>
                  <TextwithHover displayText={'Premium'}/>
                  <TextwithHover displayText={'Support'}/>
                  <TextwithHover displayText={'Download'}/>
                  <div className='h-1/2 border-r border-white'></div>
                </div>
                <div className='w-1/3 flex justify-around h-full items-center'>

                  <TextwithHover displayText={'Upload Song'} targetLink={'/uploadsong'}/>

                  <div className='dropdown relative bg-white w-10 text-black  h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer'>
                      <div onClick={toggleDropdown}>{(cookie.firstName.charAt(0)).toUpperCase()+(cookie.lastName.charAt()).toUpperCase()}</div>
                      {dropdownOpen && (
                        <div className="dropdown-menu absolute mt-24 mr-28 w-40 h-10 bg-white shadow-md rounded-lg text-center">
                          <Link to='' className="block px-4 py-2 rounded-lg hover:bg-gray-100">
                            <div onClick={LogOut}>Log Out</div>
                          </Link>
                        </div>
      )}
                  </div>
                </div>
              </div>
            </div>
            <div className='content p-8 pt-0 overflow-auto'>
              {children}
            </div>
        </div>
      </div>
      {/* This div is current Song player */}
      {
        currentSong &&
        <div className='w-full h-1/10 bg-black bg-opacity-30 text-white items-center flex px-4'>
          <div className='w-1/4 flex items-center'>
            <img src={currentSong.thumbnail} className='h-14 w-14'/>
            <div className='pl-4'>
              <div className='text-sm font-semibold cursor-pointer hover:underline'>{currentSong.name}</div>
              <div className='text-xs text-gray-500 cursor-pointer hover:underline'>{currentSong.artist.firstName+" "+currentSong.artist.lastName}</div>
            </div>
          </div>
        <div className='w-1/2 h-full flex justify-center items-center flex-col'>
            <div className='flex w-1/3 items-center justify-between'>
              <Icon icon="solar:shuffle-linear" fontSize={29} className='cursor-pointer text-gray-500 hover:text-white'/>
              <Icon icon="mingcute:skip-previous-fill" fontSize={29}  className='cursor-pointer text-gray-500 hover:text-white'/>
              {/* <Icon icon="gridicons:pause" fontSize={40} className='cursor-pointer text-gray-500 hover:text-white' /> */}
              <Icon icon={isPaused?'gridicons:play':'gridicons:pause'} fontSize={40} className='cursor-pointer text-gray-500 hover:text-white' onClick={togglePlayPause}/>
              <Icon icon="mingcute:skip-forward-fill" fontSize={29} className='cursor-pointer text-gray-500 hover:text-white' />
              <Icon icon="iconoir:repeat" fontSize={29} className='cursor-pointer text-gray-500 hover:text-white' />
            </div>
            {/* <div className='text-white'>
              {/* Progress Bar Here 
            </div> */}
        </div>
        <div className='w-1/4 flex justify-end pr-4 space-x-4 items-center'>
            <Icon icon="system-uicons:heart" fontSize={30} className='cursor-pointer text-gray-500 hover:text-white'/>
            <Icon icon="ic:round-playlist-add" fontSize={30} className='cursor-pointer text-gray-500 hover:text-white' onClick={()=>{setAddToPlaylistModalOpen(true)}}/>
        </div>
      </div>
        }
  </div>
    )
  }


export default LoggedInContainer
