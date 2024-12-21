import React, { useContext, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [data] = useContext(UserContext);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passRef = useRef();

    const loginPage = (e) => {
        e.preventDefault();

        if (!emailRef.current.value || !passRef.current.value) {
            Swal.fire({
                title: "Empty",
                text: "Please fill input!",
                icon: "info"
            })
        } else {
            const userData = data.find(p => p.titleEn === String(emailRef.current.value) && p.row === Number(passRef.current.value));

            console.log(userData);
            if (userData) {
                Swal.fire({
                    title: "Success",
                    text: "Welcome!",
                    icon: "success"
                })
                navigate(`/${userData._id}`)
                localStorage.setItem('user', true);
            } else {
                Swal.fire({
                    title: "Wrong!",
                    text: "Email or Password was wrong!",
                    icon: "error"
                })
            }
        }
    }

    return (
        <div className='container'>
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Login your Account</h1>
                    <p className="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                </div>
                <div className="col-md-10 mx-auto col-lg-5">
                    <form onSubmit={loginPage} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                        <h3>Login Account</h3><br />
                        <div className="form-floating mb-3">
                            <input ref={emailRef} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" style={{ backgroundImage: 'url("data:image/png', backgroundRepeat: 'no-repeat', backgroundSize: 20, backgroundPosition: '97% center', cursor: 'auto' }} data-temp-mail-org={0} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input ref={passRef} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-dark" type="submit">Log in</button>
                        <hr className="my-4" />
                        <small className="text-body-secondary">Don't you have account? <NavLink to={'/register'}>Register here!</NavLink></small>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage