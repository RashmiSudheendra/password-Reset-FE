import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewPassword() {

  let navigate = useNavigate()
  let id = sessionStorage.getItem("id")
  let [password,setPassword] = useState('')
  let [pw,setPw] = useState('')

  let resetpasword = async()=>{
    if(password===pw){
      try{
        let res = await axios.put(`https://password-reset-be-lg7a.onrender.com/reset/${id}`,{password})
        console.log(res.data.message)
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        if(res.status===201){
          sessionStorage.clear()
          setTimeout(()=>{
            navigate('/login')
          },1500)
        }
      }catch(err){
        console.log(err)
      }
    }
    else{
      toast.warn(`password does not match`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }
   
  return (
    <div className='w-100'>
      <h1 className="h3 m-5 text-800 font-weight-bold d-flex align-items-center justify-content-center">Reset Password</h1>
    <div className='container-fluid' style={{display:'flex', flexDirection:"row", justifyContent:'center'}}>
    <Form className='w-25 m-5'>
      <Form.Group className="text-md mb-3 mx-5">
        {/* <Form.Label><strong>New Password</strong></Form.Label> */}
        <Form.Control type="password" className='focus-ring focus-ring-light rounded-0' style={{ borderWidth: "0px 0px 3px 0px", borderColor: "orange" }} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="text-md mb-3 mx-5">
        {/* <Form.Label><strong>Re-enter New Password</strong></Form.Label> */}
        <Form.Control type="password" className='focus-ring focus-ring-light rounded-0' style={{ borderWidth: "0px 0px 3px 0px", borderColor: "orange" }} placeholder="Re-Enter Password" onChange={(e)=>setPw(e.target.value)}/>
      </Form.Group>
      <div style={{display:'flex', flexDirection:"row", alignItems:'center', justifyContent:'center'}}>
      <Button variant='warning' onClick={()=>resetpasword()}>
        Reset
      </Button>
      </div>
    </Form>
    </div>
    <ToastContainer />
    </div>
  )
}

export default NewPassword
