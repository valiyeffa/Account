import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        axios.get('https://matrixacademylessonapi.webluna.org/category',
            { headers: { 'matrix-access': '3fa3afc2aa0e5e2c1c17ee83f4c8fc76' } })
            .then(res => {
                setData(res.data);
                setStatus(res.status);
            })
            .catch(err => console.log(err))
    }, [])

    return <UserContext.Provider value={[data , status]}>{children}</UserContext.Provider>
}