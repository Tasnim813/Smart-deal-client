import React from 'react';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { Link } from 'react-router';

const Login = () => {
  const {register, formState:{errors},handleSubmit }=useForm()
  const handleLogin=()=>{

  }

    return (
        <div className="card mt-20 mb-20 mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className='text-4xl font-bold text-center'>Login</h1>
          <p className='text-center text-sm'>Don't have an account? <Link to="/register" className='text-[#632EE3]' >Register Now</Link></p>
          <form onSubmit={handleSubmit(handleLogin)} >
             <div >
      <div className="card-body">
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register("email",{required:true})} className="input" placeholder="Email" />
          {
            errors.email?.type ==='required' && <p className='text-red-500'>Email is required</p>
          }
          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register("password",{required:true,minLength:6})} className="input" placeholder="Password" />
          {
            errors.password?.type==='required' && <p className='text-red-500'>Password is required</p>
          }
          {
            errors.minLength?.type==='required' && <p className='text-red-500'>Password is must be 6 character</p>
          }

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn bg-gradient-to-r  from-[#632EE3] to-[#9F62F2] mt-4">Login</button>
        </fieldset>
        <div className='flex gap-3 items-center'>
          <div className='border-t flex-1 border-gray-300'></div>
          <span>OR</span>
          <div className='border-t flex-1 border-gray-300'></div>
        </div>
        <GoogleLogin></GoogleLogin>
      </div>
        
    </div>
   
          </form>
         
        </div>
    );
};

export default Login;