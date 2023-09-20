import React, { useState } from 'react';
import './signup.scss'
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../Utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../Utils/localStoregeManager';





function Signup({user}) {

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
            <div className="sign-up-box">
                <h2 className="heading">Sign Up</h2>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <label style={{ fontWeight: '650', marginBottom: '10px' }} htmlFor="email">Name</label>
                    <input type="name" className='name' id='name' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
                    
                    <label style={{ fontWeight: '650', marginBlock: '10px' }} htmlFor="email">Email</label>
                    <input type="email" className='email' id='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
                    
                    <label style={{ fontWeight: '650', marginBottom: '10px', marginTop: '8px' }} htmlFor="password">Password</label>
                    <input type="password" className='password' id='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                <input type="submit" onSubmit={handleSubmit}/>
                </form>
                
                <p>Already have an account ?<Link to="/login"> Sign up</Link></p>


            </div>
        </div>
    )
}

export default Signup