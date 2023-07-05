import React, {useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function Email() {

  let navigate = useNavigate('')
  let [email,setEmail]=useState('')
  let [id,setId] = useState('')
  let [verificationCode,setverificationCode] = useState('')

  let userid = async()=>{
    try{
      let response = await axios.get(`https://password-reset-be-lg7a.onrender.com/all`)
      // console.log(response.data.data)
      let users = response.data.data
      email = email.toLowerCase()
      let userData = users.filter((e)=>e.email===email)
      // console.log(userData[0]._id)
      setId(userData[0]._id)
      sessionStorage.setItem('id',userData[0]._id)
    }catch(error){
      console.log(error)
    }
  }


  let proceed = async()=>{
    try{
      let res = await axios.put(`https://password-reset-be-lg7a.onrender.com/sendEmail/${id}`)
      console.log(res)
      handleShow()
    }catch(error){
      console.log(error)
    }
  }

  let reset = async()=>{
    try{
      let res = await axios.post(`https://password-reset-be-lg7a.onrender.com/check/${id}`,{verificationCode})
      // console.log(res.status)
      if(res.status===200){
        navigate('/newPassword')
      }
    }catch(error){
      console.log(error)
      toast.error(`Invalid Code`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='w-100'>
      <h1 className="h3 mt-5 text-800 font-weight-bold d-flex align-items-center justify-content-center">Email verification </h1>
      <div className='container-fluid' style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
        <Form className='w-50 m-5'>
          <Form.Group className="text-md mb-3 mx-5">
            {/* <Form.Label>Email</Form.Label> */}
            <Form.Control type="text" className='focus-ring focus-ring-light' placeholder="Enter Email" onInput={(e) =>setEmail(e.target.value)} onKeyUp={()=>userid()} />
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
            <Button className="m-3" variant='dark' onClick={()=>proceed()}>
            Proceed
            </Button>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header className="py-0" closeButton>
                <Modal.Body className="h5 text-danger p-0 m-0 text-800 d-flex align-items-center justify-content-center">Alert !!</Modal.Body>
              </Modal.Header>
              <Modal.Body className="d-flex align-items-center justify-content-center">Password sent to your mail id</Modal.Body>
              <div className="d-flex justify-content-center" >
                <Form className='w-50 mb-5'>
                  <Form.Group className="text-md mb-3 mx-5">
                    {/* <Form.Label><strong>New Password</strong></Form.Label> */}
                    <Form.Control type="text" className='focus-ring focus-ring-light rounded-0' style={{ borderWidth: "0px 0px 3px 0px", borderColor: "red" }} placeholder="Enter Password" onChange={(e) => { setverificationCode(e.target.value) }} />
                  </Form.Group>
                  <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant='danger' onClick={()=>reset()}>
                      Reset Password
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal>
            <Link style={{ textDecoration: 'none' }} to={"/createAccount"}>
              <Button className="m-3" variant='dark'>Create New Account</Button>
            </Link>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Email
