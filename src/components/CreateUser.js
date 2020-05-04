import React, { useState, useEffect, useContext } from 'react'
import { Alert, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'
import PathContext from '../contexts/PathContext'

function CreateUser(props) {
    const [username, setUsername] = useState("");
    const [showUserList, setShowUserList] = useState(false);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [alert, setAlert] = useState(false);
    // const [path, setPath] = useState(props.path)
    const path = useContext(PathContext)

    const onChangeUserName = (e) => {
        setUsername(e.target.value);
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        console.log(username)
        const res = await axios.post(`${path}/users/add`, { username });
        console.log(res.data)
        setUsername("")
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000);
    }

    return (
        <>

           
                <Form onSubmit={onSubmitHandle} >
                    <Form.Group>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control className="input" onChange={onChangeUserName} value={username} />
                    </Form.Group>
                    <Button bsclass="submit-btn" variant="primary" type="submit">
                        save
                    </Button>
                    {alert && 
                    <Alert variant={'success'}>
                     user added successfully! you can add another user
                     </Alert>
                    }
                </Form>
            
        </>
    )
}

export default CreateUser
