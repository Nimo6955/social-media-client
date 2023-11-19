import React, { useState } from 'react';
// import { Button } from 'antd';
import './login.scss'
import { Link,useNavigate } from 'react-router-dom';
import {axiosClient} from '../../Utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../Utils/localStoregeManager';
import Bg from '../../assets/Signin.gif'
import user from '../../assets/user.png'
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";






function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e){
        try {
            e.preventDefault()
            const response = await axiosClient.post('/auth/login', {
                email,password
            })
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    function displayFaRegEyeSlash(){
        const FaRegEye = document.getElementById('FaRegEye')
        FaRegEye.style.display = 'block'
        const FaRegEyeSlash = document.getElementById('FaRegEyeSlash')
        FaRegEyeSlash.style.display = 'none'
        const input = document.getElementById('password')
        input.setAttribute('type', 'text')

}
function displayFaRegEye(){
        const FaRegEye = document.getElementById('FaRegEye')
        FaRegEye.style.display = 'none'
        const FaRegEyeSlash = document.getElementById('FaRegEyeSlash')
        FaRegEyeSlash.style.display = 'block'
        const input = document.getElementById('password')
        input.setAttribute('type', 'password')
}
    return (

        <div className='Login'>
            <div className='b-ground'>
            <img draggable='false' style={{backgroundBlendMode: 'color-burn'}} src={Bg} alt="" />

            </div>
            <div className="log-in-box">
                <img draggable='false' className='user' src={user} alt="" />
                <h2 className="heading">Wellcom Back!</h2>
                <form className='log-in-form' onSubmit={handleSubmit}>
                    {/* <label style={{ fontWeight: '650', marginBottom: '10px' }} htmlFor="email">Email</label> */}
                    <input type="email" className='email' id='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                    {/* <label style={{ fontWeight: '650', marginBottom: '10px', marginTop: '8px' }} htmlFor="password">Password</label> */}
                    <input type="password" className='password' id='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    <FaRegEye color='#455a64' className='FaRegEye' id='FaRegEye' style={{display: 'none'}} onClick={displayFaRegEye}/>
                    <FaRegEyeSlash  color='#455a64' className='FaRegEye' id='FaRegEyeSlash' onClick={displayFaRegEyeSlash}/>
                <button type="submit" className='submit btn-primary'onClick={handleSubmit}>Log in</button>
                </form>
                <p className='signupLink'>Don't have an account ?<Link className='linkToSignUp' to="/signup"> Sign up</Link></p>


            </div>
            <div class="custom-shape-divider-top-1695467425">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div>  
</div>
    )
}

export default Login