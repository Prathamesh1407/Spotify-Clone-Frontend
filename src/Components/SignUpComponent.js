import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import TextInput from './shared/TextInput';
import PasswordInput from './shared/PasswordInput';
import { Link,useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';
import {useCookies} from 'react-cookie'

const SignUpComponent = () => {
  const [email,setEmail]=useState('')
  const [confirmEmail,setConfirmEmail]=useState('')
  const [userName,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [firstName,setFirstname]=useState('')
  const [lastName,setLastname]=useState('')
  const [cookie,setCookie]=useCookies(['token','firstName','lastName'])
  const navigate=useNavigate()


  const signUp=async(e)=>{
    if(email!==confirmEmail)
    {
      alert("Email and Confirm Email fields must match, Please check again")
      return;
    }
    const data={email,password,userName,firstName,lastName};
    const response=await makeUnauthenticatedPOSTRequest('/auth/register',data)
    if(response && !response.err)
    {
      const token=response.token
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
        <div className='logo p-5 w-full flex justify-center'>
            <Icon icon="logos:spotify" width={150} />
        </div>
      <div className='inputRegion w-1/3 py-10 flex flex-col items-center justify-center'>

        <div className='font-bold mb-4 text-3xl'>Sign up for free to start listening.</div>

        <TextInput label="What's your email?" placeholder='Enter your email.' className='my-2' value={email} setValue={setEmail}/>

        <TextInput label="Confirm your email" placeholder='Enter your email again.' className='my-2 mb-2' value={confirmEmail} setValue={setConfirmEmail}/>

        <TextInput label="Username" placeholder='Enter your Username.' className='my-2 mb-4' value={userName} setValue={setUsername}/>

        <PasswordInput label='Create a password' placeholder='Create a password' className='my-2 mb-4' value={password} setValue={setPassword}/>
        <div className=' w-full flex justify-between items-center space-x-8'>
          <TextInput label="First Name" placeholder='Enter Your First Name.' className='my-2 mb-4' value={firstName} setValue={setFirstname} />
          <TextInput label="Last Name" placeholder='Enter Your Last Name.' className='my-2 mb-4' value={lastName} setValue={setLastname} />
        </div>

        <div className='w-full flex items-center justify-center mt-8'>
            <button className='bg-green-400 font-semibold p-3 px-10 rounded-full' onClick={e=>{
              e.preventDefault();
              signUp();
            }}>SIGN UP</button>
        </div>

        <div className='w-full border border-solid border-gray-300 mt-4'></div>

        <div className='my-6 font-semibold text-lg'>Already have an account?</div>

        <div className='border border-gray-500 text-gray-500 w-full flex justify-center items-center py-3 rounded-full font-bold'>
            <Link to='/login'>
                LOG IN INSTEAD
            </Link>
        </div>

      </div>
    </div>
  )
}

export default SignUpComponent
