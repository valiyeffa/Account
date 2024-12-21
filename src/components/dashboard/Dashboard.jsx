import React, { useContext, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const { id } = useParams();
    const [data] = useContext(UserContext);
    const [delData, setDelData] = useState();
    const selectedData = data.find(p => p._id === id)
    const updateNameRef = useRef();
    const updateEmailRef = useRef();
    const updateDateRef = useRef();
    const updatePassRef = useRef();

    const updateData = (e) => {
        e.preventDefault();
        axios.put(`https://matrixacademylessonapi.webluna.org/ad/category/${selectedData._id}`, {
            'row': updatePassRef.current.value,
            'titleAz': updateNameRef.current.value,
            'titleEn': updateEmailRef.current.value,
            'titleRu': updateDateRef.current.value
        }, { headers: { 'matrix-access ': '3fa3afc2aa0e5e2c1c17ee83f4c8fc76' } })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: "Successfully!",
                        text: "Account updated!",
                        icon: "success"
                    })
                }
            })
            .catch(error => console.log(error))
    }

    const deleteData = () => {
        axios.delete(`https://matrixacademylessonapi.webluna.org/ad/category/${selectedData._id}`,
            { headers: { 'matrix-access ': '3fa3afc2aa0e5e2c1c17ee83f4c8fc76' } })
            .then((res) => {
                if (res.status === 200) {
                    setDelData(res.data)
                    Swal.fire({
                        text: "Account deleted!",
                        icon: "success"
                    })
                } else {
                    setDelData([]);
                }
            })
            .catch((err) => console.log(err.status))
    }

    return (
        <div className='container col-4'>
            <h1 className='text-center my-5'>Account Dasboard</h1>
            <form onSubmit={updateData} className='my-2'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name Surname</label>
                    <input ref={updateNameRef} defaultValue={selectedData && selectedData.titleAz} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input ref={updateEmailRef} defaultValue={selectedData && selectedData.titleEn} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Birth Date</label>
                    <input ref={updateDateRef} defaultValue={selectedData && selectedData.titleRu} type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input ref={updatePassRef} defaultValue={selectedData && selectedData.row} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <NavLink to={`/${id}`} type="submit" className="btn btn-outline-dark">Back to Page</NavLink>
                <button type="submit" className="btn btn-dark mx-2">Update</button>
                <button onClick={deleteData} className="btn btn-danger">Delete Account</button>
            </form>
        </div>
    )
}

export default Dashboard