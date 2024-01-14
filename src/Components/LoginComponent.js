import React from 'react'
import { Icon } from '@iconify/react';
import TextInput from './shared/TextInput';
import PasswordInput from './shared/PasswordInput';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';


const LoginComponent = () => {
  
  const [cookie,setCookie]=useCookies(['token','firstName','lastName'])
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const navigate=useNavigate()

  const Login=async(e)=>{
      const data={email,password};
      const response=await makeUnauthenticatedPOSTRequest('/auth/login',data)
      if(response && !response.err)
      {
        const token=response.token
        const firstName=response.firstName
        const lastName=response.lastName
        const date=new Date();
        date.setDate(date.getDate()+30);
        setCookie('token',token,{path:'/',expires:date})
        setCookie('firstName',firstName,{path:'/',expires:date})
        setCookie('lastName',lastName,{path:'/',expires:date})
        navigate('/home')
      }
      else alert(response.err)
    }


  return (
    <div className='w-full h-full flex flex-col items-center'>
      
        <div className='logo p-5 border-b border-solid border-gray-300 w-full flex justify-center'>
            <Icon icon="logos:spotify" width={150} />
        </div>

      <div className='inputRegion w-1/4 py-10 flex flex-col items-center justify-center'>

        <div className='font-bold mb-4'>To continue, log in to Spotify.</div>

        <TextInput label='Email address or username' placeholder='Email address or username' className='my-2' 
        value={email} setValue={setEmail}
        />

        <PasswordInput label='Password' placeholder='Password' value={password} setValue={setPassword}/>

        <div className='w-full flex items-center justify-end mt-8'>
            <button className='bg-green-400 font-semibold p-3 px-10 rounded-full' onClick={(e)=>{
              e.preventDefault();
              Login();
            }}>LOG IN</button>
        </div>

        <div className='w-full border border-solid border-gray-300 mt-4'></div>

        <div className='my-6 font-semibold text-lg'>Don't have an account?</div>

        <div className='border border-gray-500 text-gray-500 w-full flex justify-center items-center py-3 rounded-full font-bold'>
            <Link to='/signup'>
                SIGN UP FOR SPOTIFY
            </Link>
        </div>

      </div>
    </div>
  )
}

export default LoginComponent
