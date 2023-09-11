import React from 'react'
import './updateProfile.scss'
import UserImg from '../../assets/man.png'



function updateProfile() {
    return (
        <div className='UpdateProfile'>
            <div className="container">
                <div className="left-part">
                    <img className='UserImg' src={UserImg} alt="" />
                </div>
                <div className="right-part">
                    <form >
                        <input type="text" placeholder='Your Name' />
                        <input type="text" placeholder='Your Bio' />
                        <input type="submit" className='btn-primary' />
                    </form>
                    <button className='Delete-Account btn-secondary'>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default updateProfile