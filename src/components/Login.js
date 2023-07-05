import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let navigate = useNavigate('')

    let handleSignIn = async () => {
        try {
            let res = await axios.post(`https://password-reset-be-lg7a.onrender.com/login`, {
                email,
                password
            })
            console.log(res.data)
            sessionStorage.setItem('token', res.data.token)
            navigate('/loggedInPage')

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div>
            <div className='w-100'>
                <h1 className="h3 mt-5 text-800 font-weight-bold d-flex align-items-center justify-content-center">LogIn</h1>
                <div className='container-fluid' style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
                    <Form className='w-50'>
                        <Form.Group className="text-md mb-3 mx-5">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" className='focus-ring focus-ring-light rounded-0' style={{ borderWidth: "0px 0px 3px 0px", borderColor: "green" }} placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="text-md mb-3 mx-5">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" className='focus-ring focus-ring-light rounded-0' style={{ borderWidth: "0px 0px 3px 0px", borderColor: "green" }} placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Group>
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant='success' onClick={() => { handleSignIn() }}>
                                Login
                            </Button>
                        </div>
                        <div className='m-3' style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', text: "green" }}>
                            <Link to={'/email'} style={{ textDecoration: 'none', color: "green" }}>
                                <p className='m-3'><strong>Forgot Password</strong></p>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: "green"}} to={"/createAccount"}>
                                <p className='m-3'><strong>Create New Account</strong></p>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
