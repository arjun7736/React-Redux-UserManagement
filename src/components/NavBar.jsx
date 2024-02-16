import React from 'react'
import { Button } from './ui/button'

const NavBar = () => {
  return (
    <div className='w-screen flex items-center justify-center h-24 bg-blue-400'>
        <input type="text" placeholder='Search . . . . . .' className='w-96 h-10 bg-blue-400 placeholder-white border-b focus:outline-none' />
        <Button className="bg-transparent hover:bg-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 512 512"><path fill="white" d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8"></path></svg></Button>
    </div>
  )
}

export default NavBar