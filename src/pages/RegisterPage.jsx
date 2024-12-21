import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';
import Cookies from 'universal-cookie';

const RegisterPage = () => {
  const [data] = useContext(UserContext);
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const dateRef = useRef();
  const passRef = useRef();
  // const [visiblePass, setVisible] = useState(false);

  const cookies = new Cookies(null, { path: '/' });
  const newUser = (e) => {
    e.preventDefault();
    const nameInput = nameRef.current.value;
    const emailInput = emailRef.current.value;
    const dateInput = dateRef.current.value;
    const passInput = passRef.current.value;

    const userEmail = data.find(p => p.titleEn === String(emailInput));

    if (userEmail) {
      Swal.fire({
        title: "Error",
        text: "Use different email address!",
        icon: "error"
      })
    } else {
      const userData = data.find(p => p.titleEn === String(emailInput) && p.row === Number(passRef.current.value));
      axios.post('https://matrixacademylessonapi.webluna.org/ad/category',
        {
          'row': passInput,
          'titleAz': nameInput,
          'titleEn': emailInput,
          'titleRu': dateInput,
        },
        { headers: { 'matrix-access': '3fa3afc2aa0e5e2c1c17ee83f4c8fc76' } })
        .then(res => {
          if (res.status === 200) {
            Swal.fire({
              title: "Success",
              text: "Welcome!",
              icon: "success"
            })
            navigate(`/${userData._id}`);
            cookies.set('user', userData._id);
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className='container'>
      <div className="row align-items-center g-lg-5 py-5 my-1">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Register Now</h1>
          <p className="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form onSubmit={newUser} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
              <input type="text" ref={nameRef} className="form-control" id="floatingInput" placeholder="name@example.com" style={{ backgroundImage: 'url("data:image/png', backgroundRepeat: 'no-repeat', backgroundSize: 20, backgroundPosition: '97% center', cursor: 'auto' }} data-temp-mail-org={0} />
              <label htmlFor="floatingInput">Name Surname</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" ref={emailRef} className="form-control" id="floatingInput" placeholder="name@example.com" style={{ backgroundImage: 'url("data:image/png', backgroundRepeat: 'no-repeat', backgroundSize: 20, backgroundPosition: '97% center', cursor: 'auto' }} data-temp-mail-org={0} />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="date" ref={dateRef} className="form-control" id="floatingInput" placeholder="dd/mm/yyyy" style={{ backgroundImage: 'url("data:image/png', backgroundRepeat: 'no-repeat', backgroundSize: 20, backgroundPosition: '97% center', cursor: 'auto' }} data-temp-mail-org={0} />
              <label htmlFor="floatingInput">Birth date</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" ref={passRef} className="form-control" id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-dark" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage