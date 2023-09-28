import React, { useState } from 'react';
import './signup.scss'
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../Utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../Utils/localStoregeManager';
// import user from '../../assets/sugnUpUser.png'
import Bg from '../../assets/Signup.gif'
import user from '../../assets/user.png'







function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    async function handleSubmit(e){
        try {
            e.preventDefault()
            const response = await axiosClient.post('/auth/signup', {
                email,password,name
            })
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken)
            navigate(`/profile/${response?.result?.user?._id}`)
            
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }



  

    return (
        <div className='Signup'>
              <div className='b-ground'>
            <img draggable='false' style={{backgroundBlendMode: 'color-burn'}} src={Bg} alt="" />

            </div>
            <div className="sign-up-box">
                <img draggable='false' className='user' src={user} alt="" />
                <h2 className="heading">Sign Up</h2>
                <p className='heading-p'>We'll create an account if you <div></div> don't have one</p>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    {/* <label style={{ fontWeight: '650', marginBottom: '10px' }} htmlFor="email">Name</label> */}
                    <input type="name" className='name' id='name' placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
                    
                    {/* <label style={{ fontWeight: '650', marginBlock: '10px' }} htmlFor="email">Email</label> */}
                    <input type="email" className='email' id='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                    
                    {/* <label style={{ fontWeight: '650', marginBottom: '10px', marginTop: '8px' }} htmlFor="password">Password</label> */}
                    <input type="password" className='password' id='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit" className='submit btn-primary'onClick={handleSubmit}>Sign Up</button>

                </form>
                
                <p className='signinLink'>Already have an account ?<Link className='linkToLogIN' to="/login"> Log In</Link></p>


            </div>

            <div className="custom-shape-divider-top-1694858914">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
    </svg>
</div>
        </div>
    )
}

export default Signup