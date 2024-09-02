import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
     <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center '>

         <div className=' flex-1 flex flex-col justify-center'>
          <h2 className='text-2xl '> I want to learn more about npm</h2>
          <p className='text-gray-500 my-2'> Pleas checkout these resources with 100 js Projects </p>
          <Button gradientDuoTone='purpleToPink' >
            <a href='https://www.100jsprojects.com' target='_blank' rel='noopener noreferrer' className='rounded-tl-xl rounded-bl-none' >
            100js Projects </a>
          </Button>
         </div>
         <div className='p-7 flex-1'>
            <img src='https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg'/>
         </div>
     </div>
  )
}

export default CallToAction