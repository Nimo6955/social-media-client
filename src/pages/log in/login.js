import React, { useState } from 'react';
// import { Button } from 'antd';
import './login.scss'
import { Link,useNavigate } from 'react-router-dom';
import {axiosClient} from '../../Utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../Utils/localStoregeManager';
// import Bg from '../../assets/bg3.gif'






function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e){
        try {
            e.preventDefault()
            const result = await axiosClient.post('/auth/login', {
                email,password
            })
            setItem(KEY_ACCESS_TOKEN, result.accessToken)
            navigate('/')
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='Login'>
            {/* <img style={{backgroundBlendMode: 'color-burn'}} src={Bg} alt="" /> */}
            <div className='b-ground'></div>
            <div className="log-in-box">
                <h2 className="heading">Log In</h2>
                <form className='log-in-form' onSubmit={handleSubmit}>
                    <label style={{ fontWeight: '650', marginBottom: '10px' }} htmlFor="email">Email</label>
                    <input type="email" className='email' id='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
                    <label style={{ fontWeight: '650', marginBottom: '10px', marginTop: '8px' }} htmlFor="password">Password</label>
                    <input type="password" className='password' id='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
              
                <input type="submit" className='submit btn-primary'onSubmit={handleSubmit}/>
                </form>
                <p className='signupLink '>Don't have an account ?<Link to="/signup"> Sign up</Link></p>


            </div>
            <div class="custom-shape-divider-top-1694858914">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div>
        </div>
    )
}

export default Login