import React, { createContext, useState, useContext, useEffect } from 'react'

const PathContext = createContext({});

export const PathContextProvider = (props) => {
    // let path
    // // const [path, setPath] = useState(null)
    
    // useEffect(() => {
    //     path = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    //     // setPath(path);
    // }, [])

    return (
        <PathContext.Provider value={process.env.NODE_ENV === "development" ?"http://localhost:5000":""}>
            {props.children}
        </PathContext.Provider>
    )
}

export default PathContext







