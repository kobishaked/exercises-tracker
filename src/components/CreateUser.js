import React, { useState, useEffect, useContext } from 'react'
import { Alert, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'
import PathContext from '../contexts/PathContext'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'

function CreateUser() {
    const [username, setUsername] = useState("");
    const [alert, setAlert] = useState(false);
    const path = useContext(PathContext)

    const onChangeUserName = (e) => {
        setUsername(e.target.value);
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        console.log(username)
        try{
        const res = await axios.post(`${path}/users/add`, { username });
        toast.success("user added successfully! you can add another user")
        }
        catch(e){
            toast.error("please insert a name with at least 3 characters")
        }
        setUsername("")
        setAlert(true)
    }

    return (
        <>
            <Form onSubmit={onSubmitHandle} >
                <Form.Group>
                    <Form.Label>User Name (with at least 3 character)</Form.Label>
                    <Form.Control className="input" onChange={onChangeUserName} value={username} />
                </Form.Group>
                <Button bsclass="submit-btn" variant="primary" type="submit">
                    save
                    </Button>
                {alert &&
                    <ToastContainer
                        className="alert"
                        autoClose={4000}
                        position={toast.POSITION.BOTTOM_CENTER}
                    />
                }
            </Form>

        </>
    )
}

export default CreateUser
