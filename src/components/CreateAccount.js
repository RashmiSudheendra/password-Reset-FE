import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

function CreateAccount() {
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let navigate = useNavigate()

  let handleSignup = async () => {
    try {
      let res = await axios.post(`https://password-reset-be-lg7a.onrender.com/signup`, {
        name,
        email,
        password
      })
      console.log(res)
      toast.success(`${name}'s Details Registered`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-100'>
      <h1 className="h3 mt-5 text-800 font-weight-bold d-flex align-items-center justify-content-center">Registration</h1>
      <div className='container-fluid' style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
        <Form className='w-50'>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" className='focus-ring focus-ring-light rounded-0' style={{ borderWidth: "0px 0px 3px 0px", borderColor: "green" }} placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
          </Form.Group>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" className='focus-ring focus-ring-light rounded-0' style={{ borderWidth: "0px 0px 3px 0px", borderColor: "green" }} placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Group>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Password</Form.Label>
            <Form.Control type="email" className='focus-ring focus-ring-light rounded-0' style={{ borderWidth: "0px 0px 3px 0px", borderColor: "green" }} placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
            <Button variant='success' onClick={() => { handleSignup() }}>
              Submit
            </Button>
          </div>
          <div  className='m-3' style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', Color:"green"}}>
            <Link to={'/login'} style={{textDecoration:'none', color:"green"}}>
              <p><strong>Have An Account</strong></p>
            </Link>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default CreateAccount
