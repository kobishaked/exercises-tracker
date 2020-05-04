import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, FormControl, Col, InputGroup, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import './style/CreateExercise.css'
import axios from 'axios'
import PathContext from '../contexts/PathContext'
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify'


const moment = require('moment');



function CreateExercise() {
    const [username, setUsername] = useState("choose...");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(null);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [alert, setAlert] = useState(false);
    const path = useContext(PathContext);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`${path}/users`);
            res.data.length > 0 && setUsers(res.data.map(user => user.username));
        })()
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
        if (username === "choose...") {
            setAlert(true)
            toast.warning("please choose one of the usernames.")
        }
        else {
            const exercise = {
                username: username,
                description: description,
                duration: duration,
                date: date,
            }
            const res = await axios.post(`${path}/exercises/add`, exercise);
            setDescription("");
            setDuration("");

            setDate(new Date());
            setIsFirstRender(false);
            setAlert(true)
            toast.success("exercise added successfully! you can add another exercise")
        }





    }

    return (
        <>
            <Form className="input" onSubmit={onSubmitHandle}>
                <Form.Group >
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={onChangeUserName} as="select" >
                        {isFirstRender
                            ? <option selected="true" disabled="disabled">Choose...</option>
                            : <option selected="true" >{username}</option>
                        }
                        {/* <option selected="true" disabled="disabled">Choose...</option> */}
                        {
                            users.map((user) => (
                                <option key={user}>{user}</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label >Exercise name</Form.Label>
                    <Form.Control value={description} onChange={onChangeDescription} />
                </Form.Group>

                <Form.Group>
                    <Form.Label >How long did it take? <br></br> (in minutes)</Form.Label>
                    <Form.Control value={duration} onChange={onChangeDuration} as="input" type="number" />
                </Form.Group>

                <Form.Group>
                    <Form.Label > What date did you do the exercise?</Form.Label>
                    <br />
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={date}
                        onChange={onCahngeDate}
                    />
                </Form.Group>

                <br />

                <Button bsclass="submit-btn" variant="primary" type="submit">
                    create an exercise
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

export default CreateExercise