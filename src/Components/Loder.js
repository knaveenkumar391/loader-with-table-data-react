import React from 'react'
import '../Components/loader.css'

function Loder() {
  return (
    <div className='container'>
        <div className='ring'></div>
        <div className='ring'></div>
        <div className='ring'></div>
        <span className='loading'>Loading...</span>
    </div>
  )
}

export default Loder