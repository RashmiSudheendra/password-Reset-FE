import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';

function LoggedInPage() {
    let token = sessionStorage.getItem("token")

    let data = jwt(token)

    return (
        <div>
            <div className='w-100'>
                <h1 className="h3 mt-5 text-800 font-weight-bold d-flex align-items-center justify-content-center text-dark">Welcome to your account</h1>
                <h3 className='container-fluid' style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', color: "black" }}>
                    Hello {data.name}</h3>
            </div>
            <div className='m-3' style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                <Link to={'/login'}>
                    <Button variant='primary'>
                        Logout
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LoggedInPage
