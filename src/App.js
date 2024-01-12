import HomeComponent from './Components/HomeComponent';
import HelloComponent from './Components/HomeComponent';
import LoginComponent from './Components/LoginComponent';
import SignUpComponent from './Components/SignUpComponent';
import './output.css';
import { BrowserRouter,Routes,Route, Navigate, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoggedInComponent from './Components/LoggedInComponent';
import UploadSong from './Components/UploadSong';
import MyMusic from './Components/MyMusic';
import songContext from'./Context/songContext'
import { useState } from 'react';
import SearchPageComponent from './Components/SearchPageComponent';
import Library from './Components/Library';
import SinglePlaylistView from './Components/SinglePlaylistView';

function App() {
  const [currentSong,setCurrentSong]=useState(null)
  const [soundPlayed,setSoundPlayed]=useState(null)
  const [isPaused,setIsPaused]=useState(true)
  const [cookie,setCookie]=useCookies(['token'])
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
          {cookie.token?(
            //Logged In routes
              <songContext.Provider value={{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused}}>
            <Routes>
              <Route path='/' element={<HelloComponent/>}/>
              <Route path='/home' element={<LoggedInComponent/>}/>
              <Route path='/uploadsong' element={<UploadSong/>}/>
              <Route path='/mymusic' element={<MyMusic/>}/>
              <Route path='/search' element={<SearchPageComponent/>}/>
              <Route path='/library' element={<Library/>}/>
              <Route path='/playlist/:playlistId' element={<SinglePlaylistView/>}/>
              <Route path='*' element={<Navigate to="/home"/>}/>
            </Routes>
              </songContext.Provider>
          ):
          (
            <Routes>
              <Route path='/login' element={<LoginComponent/>}/>
              <Route path='/signup' element={<SignUpComponent/>}/>
              <Route path='/home' element={<HomeComponent/>}/>
              <Route path='*' element={<Navigate to="/login"/>}/>
            </Routes>
          )}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
