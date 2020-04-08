import React, { useState, useEffect } from 'react'
import { Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import './style/CreateExercise.css'
import axios from 'axios'

function CreateExercise() {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(null);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const res = await axios.get('http://localhost:5000/users');
        if (res.data.length > 0 ){
            setUsers(res.data.map(user=>user.username));
        }
    }, [])

    const onChangeUserName = (e) => {
        setUsername(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    }

    const onCahngeDate = date => {
        setDate(date);
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        if (username === "") {
            console.log("please choose one of the usernames.");
        }
        else {
            const exercise = {
                username: username,
                description: description,
                duration: duration,
                date: date,
            }
            const res = await axios.post('http://localhost:5000/exercises/add', exercise);
        }
        window.location = '/';
    }


    
  



    return (
        <>
            <Form onSubmit={onSubmitHandle}>
                <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={onChangeUserName} as="select" >
                        <option selected="true" disabled="disabled">Choose...</option>
                        {
                            users.map((user) => (
                                <option key={user}>{user}</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label >Description</Form.Label>
                    <Form.Control onChange={onChangeDescription} />
                </Form.Group>

                <Form.Group>
                    <Form.Label >Duration</Form.Label>
                    <Form.Control onChange={onChangeDuration} as="input" type="number" />
                </Form.Group>

                <DatePicker
                    selected={date}
                    onChange={onCahngeDate}
                />

                <br />

                <Button bsclass="submit-btn" variant="primary" type="submit">
                    create an exercise
                </Button>
            </Form>
        </>
    )
}

export default CreateExercise




/**
 * questions:
 * 1.   get throw all the react-bootstrap tricks and to get deep understanding on
 *      how to style with scalabilty way.
 * 2.   how can i use properly the console in the chrome inspect (for example to
 *      see the content of variables) ?
 */
