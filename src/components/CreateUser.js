import React, { useState, useEffect } from 'react'
import { Alert, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'

function CreateUser() {
    const [username, setUsername] = useState("");
    const [showUserList, setShowUserList] = useState(false);
    const [showCreateUser, setShowCreateUser] = useState(false);

    const onChangeUserName = (e) => {
        setUsername(e.target.value);
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        console.log(username)
        const res = await axios.post('http://localhost:5000/users/add', { username });
        console.log(res.data)
        setUsername("")
    }

    return (
        <>

           
                <Form onSubmit={onSubmitHandle} >
                    <Form.Group>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control onChange={onChangeUserName} value={username} />
                    </Form.Group>
                    <Button bsclass="submit-btn" variant="primary" type="submit">
                        save
                    </Button>
                </Form>
            
        </>
    )
}

export default CreateUser
