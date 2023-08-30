import React, { useState } from 'react';
// import { Button } from 'antd';
import './login.scss'
import { Link,useNavigate } from 'react-router-dom';
import {axiosClient} from '../../Utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../Utils/localStoregeManager';





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
            <div className="log-in-box">
                <h2 className="heading">Log In</h2>
                <form className='log-in-form' onSubmit={handleSubmit}>
                    <label style={{ fontWeight: '650', marginBottom: '10px' }} htmlFor="email">Email</label>
                    <input type="email" className='email' id='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
                    <label style={{ fontWeight: '650', marginBottom: '10px', marginTop: '8px' }} htmlFor="password">Password</label>
                    <input type="password" className='password' id='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
              
                <input type="submit"/>
                </form>
                <p>Don't have an account ?<Link to="/signup"> Sign up</Link></p>


            </div>
        </div>
    )
}

export default Login