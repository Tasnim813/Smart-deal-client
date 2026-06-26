import React from 'react';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { Link } from 'react-router';
import useAuth from '../../../hook/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
    const {register, handleSubmit, formState:{errors}}=useForm()
    const {registerUser,UpdateUserProfile}=useAuth()
    const handleRegister=(data)=>{
      const profileImage=data.photo[0]
      registerUser(data.email,data.password)
      .then(result=>{
        console.log(result)
        toast.success("Successfully Register")
        // Store the image and get photoURL
        const formData=new FormData()
        formData.append("image",profileImage)
        const Image_Api_URL=`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_Image_host}`
        axios.post(Image_Api_URL,formData)
        .then(res=>{
          console.log("After Image upload",res.data.data.display_url)
          const userProfile={
          displayName:data.name,
          photoURL:res.data.data.display_url,
        }
        UpdateUserProfile(userProfile)
        .then(()=>{
          console.log("after image upload")
        }).catch(error=>{
          console.log(error)
        })
        })
      }).catch(error=>{
        console.log(error)
        toast.error("Error")
      })
    }
   
    return (
        <div className="card bg-base-100 mx-auto mt-20 mb-20 w-full max-w-sm shrink-0 shadow-2xl">
       <h1 className='text-3xl font-bold text-center mt-7'>Register Now!</h1>
       <p className='text-sm text-center mt-2'>Already have an account? <Link to="/login" className='text-[#632EE3]'>Login Now</Link></p>
          <form onSubmit={handleSubmit(handleRegister)} >
             <div >
      <div className="card-body">
        <fieldset className="fieldset">
            {/* Name */}
          <label className="label">Name</label>
          <input type="text" {...register('name', {required:true})} className="input" placeholder="Your Name" />
          {
            errors.name?.type=== 'required'&& <p className='text-red-500'>Name is required</p>
          }
           {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required:true})} className="input" placeholder="Email" />
          {
            errors.email?.type=== 'required'&& <p className='text-red-500'>Email is required</p>
          }
            {/* Image */}
          <label className="label">Photo</label>
          <input {...register('photo', {required:true})}  type="file" className="file-input" placeholder="photo" />
          {
            errors.photo?.type=== 'required'&& <p className='text-red-500'>photo is required</p>
          }
           
          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true, minLength:6})} className="input" placeholder="Password" />
          {
            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
          }
          {
            errors.password?.type === 'minLength' && <p className='text-red-500'>Password is must 6 character</p>
          }
          
         
          <button className="btn bg-gradient-to-r  from-[#632EE3] to-[#9F62F2] mt-4">Login</button>

          <div className='flex items-center gap-3'>
            <div className='border-t flex-1 border-gray-300'></div>
           <span>OR</span>
            <div className='border-t flex-1 border-gray-300'></div>
          </div>

          <GoogleLogin></GoogleLogin>
        </fieldset>
      </div>
    </div>
          </form>
        </div>
    );
};

export default Register;