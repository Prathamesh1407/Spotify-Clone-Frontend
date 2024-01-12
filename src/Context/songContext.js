import { createContext} from "react";

const songContext=createContext(
    {
        currentSong:null,
        setCurrentSong:(currentSong)=>{},
        soundPlayed:null,
        setSoundPlayed:()=>{},
        isPaused:null,
        setIsPaused:()=>{},
        currentUserName:null,
        setCurrentUserName:(currentUserName)=>{},
    }
    )
export default songContext