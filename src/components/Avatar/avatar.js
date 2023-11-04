import React from 'react'
import './avatar.scss'
import user from '../../assets/sugnUpUser.png'



function avatar({src}) {
  return (
    <div className='Avatar'>
        <img src={src ? src : user} alt="AvavtarImg" />
        
    </div>
    
  )
}

export default avatar