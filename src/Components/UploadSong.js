import React, { useState } from 'react'
import TextInput from './shared/TextInput';
import CloudinaryUpload from './shared/CloudinaryUpload'
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';
import { useNavigate } from 'react-router-dom';
import LoggedInContainer from '../Containers/LoggedInContainer';


const UploadSong=()=>{
      const [name,setName]=useState('')
      const [thumbnail,setThumbnail]=useState('')
      const [uploadedSongFileUrl,setUploadedSongFileUrl]=useState('')
      const [uploadedSongFileName,setUploadedSongFileName]=useState()
      const [uploadedSongFileDuration,setUploadedSongFileDuration]=useState(0)
      const navigate=useNavigate()


      const closeModal=()=>{
        navigate('/home')
      }

      const submitSong=async()=>{
        const data={name,thumbnail,track:uploadedSongFileUrl,duration:uploadedSongFileDuration}
        // console.log(data)
        const response=await makeAuthenticatedPOSTRequest('/song/create',data)
        if(response.err)
        {
            alert('Could not Create Song');
            return;
        }
        else
        {
            navigate('/home');
        }
    }
  return(
    <LoggedInContainer>
      <div className='w-full flex flex-col justify-center items-center'>
            <div className='text-2xl font-semibold mb-10 text-white mt-8'>
                Upload Your Music
            </div>
                <div className='w-1/3 mb-7'>
                    <TextInput label='Name' labelClassName={'text-white'} placeholder={'Name'} value={name} setValue={setName}/>
                </div>
                <div className='w-1/3'>
                    <TextInput label='Thumbnail' labelClassName={'text-white'} placeholder='Thumbnail' value={thumbnail} setValue={setThumbnail}/>
                </div>
            </div>
            <div className='w-full flex justify-center space-x-5 mt-10'>
                <div className='mt-5'>
                    {
                        uploadedSongFileName?
                        (<div className='bg-white rounded-full p-4'>{uploadedSongFileName.substring(0,30)}...</div>)
                        :
                        (
                            <CloudinaryUpload setUploadedSongFileUrl={setUploadedSongFileUrl} setName={setUploadedSongFileName} setUploadedSongFileDuration={setUploadedSongFileDuration}/>
                        )
                    }
                </div>
                <div className='bg-white mt-5 p-4 flex items-center justify-center rounded-full cursor-pointer text-black font-semibold' onClick={submitSong} >
                    Upload Song
                </div>
            </div> 
      
    </LoggedInContainer>
  )
}


// const UploadSong = () => {
//     const [name,setName]=useState('')
//     const [thumbnail,setThumbnail]=useState('')
//     const [uploadedSongFileUrl,setUploadedSongFileUrl]=useState('')
//     const [uploadedSongFileName,setUploadedSongFileName]=useState()
//     const [uploadedSongFileDuration,setUploadedSongFileDuration]=useState(0)
//     const navigate=useNavigate()
    // const submitSong=async()=>{
    //     const data={name,thumbnail,track:uploadedSongFileUrl,duration:uploadedSongFileDuration}
    //     // console.log(data)
    //     const response=await makeAuthenticatedPOSTRequest('/song/create',data)
    //     console.log("res"+response)
    //     if(response.err)
    //     {
    //         alert('Could not Create Song');
    //         return;
    //     }
    //     else
    //     {
    //         alert('Success');
    //         navigate('/home');
    //     }
    // }
//   return (
//     <div className='w-full h-full flex '>
//         <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-10'>
//           <div>
//               <div className='logoDiv p-6'>
//                   <img src={Spotify_logo} alt='logo' width={125}/>
//               </div>
//               <div>
//                 <IconText iconName={'majesticons:home'} displayText={'Home'} active/>
//                 <IconText iconName={'majesticons:search-line'} displayText={'Search'}/>
//                 <IconText iconName={'fluent:library-20-filled'} displayText={'Your Library'}/>
//                 <IconText iconName={'material-symbols:library-music'} displayText={'My Music'}/>
//               </div>
//               <div className='mt-6'>
//                 <IconText iconName={'basil:add-solid'} displayText={'Create Playlist'}/>
//                 <IconText iconName={'solar:chat-square-like-bold'} displayText={'Liked Songs'}/>
//               </div>
//           </div>
//           <div className='px-5'>
//             <div className='border border-gray-100 text-white w-1/3 flex items-center justify-center rounded-full px-2 py-1 hover:border-white cursor-pointer'>
//               <Icon icon="ph:globe-bold" color="white"/>
//               <div className='text-bold'>English</div>
//             </div>
//           </div>
//       </div>
//       <div className='h-full w-4/5 bg-app-black overflow-auto'>
//           <div className='navbar w-full h-1/10 bg-black bg-opacity-40 flex justify-end'>
//             <div className='w-1/2 flex h-full'>
//               <div className='w-2/3 flex justify-around items-center'>
//                 <TextwithHover displayText={'Premium'}/>
//                 <TextwithHover displayText={'Support'}/>
//                 <TextwithHover displayText={'Download'}/>
//                 <div className='h-1/2 border-r border-white'></div>
//               </div>
//               <div className='w-1/3 flex justify-around h-full items-center'>

//                 <TextwithHover displayText={'Upload Song'}/>

//                 <div className='bg-white w-10  h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer'>
//                   <Link to='/login'>
//                     AS
//                   </Link>
//                 </div>
                
//               </div>
//             </div>
//           </div>
//           <div className='content p-8 pt-0 overflow-auto'>
//             <div className='w-full flex flex-col justify-center items-center'>
//             <div className='text-2xl font-semibold mb-10 text-white mt-8'>
//                 Upload Your Music
//             </div>
//                 <div className='w-1/3 mb-7'>
//                     <TextInput label='Name' labelClassName={'text-white'} placeholder={'Name'} value={name} setValue={setName}/>
//                 </div>
//                 <div className='w-1/3'>
//                     <TextInput label='Thumbnail' labelClassName={'text-white'} placeholder='Thumbnail' value={thumbnail} setValue={setThumbnail}/>
//                 </div>
//             </div>
//             <div className='w-full flex justify-center space-x-5 mt-10'>
//                 <div className='mt-5'>
//                     {
//                         uploadedSongFileName?
//                         (<div className='bg-white rounded-full p-4'>{uploadedSongFileName.substring(0,30)}...</div>)
//                         :
//                         (
//                             <CloudinaryUpload setUploadedSongFileUrl={setUploadedSongFileUrl} setName={setUploadedSongFileName} setUploadedSongFileDuration={setUploadedSongFileDuration}/>
//                         )
//                     }
//                 </div>
//                 <div className='bg-white mt-5 p-4 flex items-center justify-center rounded-full cursor-pointer text-black font-semibold' onClick={submitSong} >
//                     Upload Song
//                 </div>
//             </div>
//           </div>
//       </div>
//     </div>
//   )
// }


export default UploadSong

