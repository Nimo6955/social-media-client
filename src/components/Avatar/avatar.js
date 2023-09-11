import React from 'react'
import './avatar.scss'
import AvavtarImg from '../../assets/man.png'


function avatar({src}) {
  return (
    <div className='Avatar'>
        <img src={src ? src : AvavtarImg} alt="AvavtarImg" />
        
    </div>
    
  )
}

export default avatar