import React from 'react'
import { Link } from 'react-router-dom';
import Spotify_logo from '../Assets/Images/spotify_logo_white.svg'
import IconText from './shared/IconText'
import { Icon } from '@iconify/react';
import TextwithHover from './shared/TextwithHover';

const FocusCards=[
  {
    "title":'Focus',
    'description':"desc",
    'ImgUrl':'https://artwork-cdn.7static.com/static/img/sleeveart/00/339/526/0033952666_350.jpg',
  }
]

const HomeComponent = () => {
  return (
    <div className='w-full h-full flex '>
        <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-10'>
          <div>
              <div className='logoDiv p-6'>
                  <img src={Spotify_logo} alt='logo' width={125}/>
              </div>
              <div>
                <IconText iconName={'majesticons:home'} displayText={'Home'} active/>
                <IconText iconName={'majesticons:search-line'} displayText={'Search'}/>
                <IconText iconName={'fluent:library-20-filled'} displayText={'Your Library'}/>
              </div>
              <div className='mt-6'>
                <IconText iconName={'basil:add-solid'} displayText={'Create Playlist'}/>
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
              <div className='w-3/5 flex justify-around items-center'>
                <TextwithHover displayText={'Premium'}/>
                <TextwithHover displayText={'Support'}/>
                <TextwithHover displayText={'Download'}/>
                <div className='h-1/2 border-r border-white'></div>
              </div>
              <div className='w-2/5 flex justify-around h-full items-center'>

                <TextwithHover displayText={'Sign Up'} targetLink={'/signup'}/>

                <div className='bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer'>
                  <Link to='/login'>
                    Log In
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
          <div className='content p-8 pt-0 overflow-auto'>
            <Playlist titleText={'Focus'} cardsData={FocusCards}></Playlist>
            <Playlist titleText={'This is Taylor swift'} cardsData={FocusCards} ></Playlist>
            <Playlist titleText={'Sound of India'} cardsData={FocusCards} ></Playlist>
          </div>
      </div>
    </div>
  )
}
const Playlist=({titleText,cardsData})=>{
    return(
      <div className='text-white mt-8'>
        <div className='text-2xl font-semibold mb-5'>{titleText}</div>
        <div className='w-full flex justify-between space-x-3'>
            {
              cardsData.map((item) => {
                return <Card title={item.title} description={item.description} ImgUrl={item.ImgUrl} key={JSON.stringify(item)}/>;
              })
            }
        </div>
      </div>
    )
}
const Card=({title,description,ImgUrl})=>{
  return(
    <div className='bg-black bg-opacity-60 w-1/5 p-3 rounded-lg'>
      <div className='py-4'>
        <img className='w-full rounded-md' src={ImgUrl} alt=''/>
      </div>
      <div className='text-white font-semibold py-3'>{title}</div>
      <div className='text-gray-500 text-sm'>{description}</div>
    </div>
  )
}

export default HomeComponent
