import React, { useState } from 'react';
// import { Button } from 'antd';
import './login.scss'
import { Link,useNavigate } from 'react-router-dom';
import {axiosClient} from '../../Utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../Utils/localStoregeManager';
// import Bg from '../../assets/bg.gif'






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
            {/* <img src={Bg} alt="" /> */}
            <div className="log-in-box">
                <h2 className="heading">Log In</h2>
                <form className='log-in-form' onSubmit={handleSubmit}>
                    <label style={{ fontWeight: '650', marginBottom: '10px' }} htmlFor="email">Email</label>
                    <input type="email" className='email' id='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
                    <label style={{ fontWeight: '650', marginBottom: '10px', marginTop: '8px' }} htmlFor="password">Password</label>
                    <input type="password" className='password' id='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
              
                <input type="submit" className='submit btn-primary'/>
                </form>
                <p className='signupLink '>Don't have an account ?<Link to="/signup"> Sign up</Link></p>


            </div>
            <section>
            <div className="custom-shape-divider-top-1694344718">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div>
</section>
        </div>
    )
}

export default Login