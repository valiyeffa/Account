import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { NavLink, useParams } from 'react-router-dom';

const UserHome = () => {
    const [data, status] = useContext(UserContext);
    const { id } = useParams();
    const selectedData = data.find(p => p._id === id);

    return (
        <>
            {!selectedData ? <div className='container d-flex justify-content-center'>
                <img src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif" alt="" />
            </div> : status === 502 || status===401 ? <><h1>User not found!</h1></> : <div className='container'>
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold text-body-emphasis">Welcome,{selectedData.titleAz}!</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <NavLink to={`/account/${id}`} type="button" className="btn btn-dark btn-lg px-4 gap-3">Go to Dashboard</NavLink>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
export default UserHome