import React, { useState, useEffect } from 'react'
import { Form, Button, FormControl, Col, InputGroup, Alert} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import './style/CreateExercise.css'
import axios from 'axios'

function CreateExercise(props) {
    const [username, setUsername] = useState("choose...");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(null);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [alert, setAlert] = useState(false);
    const [path, setPath] = useState(props.path)

    
    
 

    useEffect(async () => {
        // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        //     setPath("http://localhost:5000")
        // }
        const res = await axios.get(`${path}/users`);
        if (res.data.length > 0) {
            setUsers(res.data.map(user => user.username));
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
            const res = await axios.post(`${path}/exercises/add`, exercise);
            setDescription("");
            setDuration(0);
            setDate(new Date());
            setIsFirstRender(false);
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 4000);


        }

    }



  
    
        
    



    return (
        <>
            <Form onSubmit={onSubmitHandle}>
                <Form.Group>
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
                    <Form.Label >Description</Form.Label>
                    <Form.Control value={description} onChange={onChangeDescription} />
                </Form.Group>

                <Form.Group>
                    <Form.Label >Duration</Form.Label>
                    <Form.Control value={duration} onChange={onChangeDuration} as="input" type="number" />
                </Form.Group>

                <DatePicker
                    selected={date}
                    onChange={onCahngeDate}
                />

                <br />

                <Button bsclass="submit-btn" variant="primary" type="submit">
                    create an exercise
                </Button>
                {alert && 
                <Alert variant={'success'}>
                exercise added successfully! you can add another exercise
                </Alert>
                }
            </Form>
        </>
    )
}

export default CreateExercise




