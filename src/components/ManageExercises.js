import React, { useState, useEffect } from 'react'
import { Table, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'
import './style/ManageExercises.css'
import DatePicker from "react-datepicker";

function ManageExercises() {
    const [users, setUsers] = useState([]);
    const [choosenUser, setChoosenUser] = useState("");
    const [exercisesByUser, setExercisesByUser] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [index, setIndex] = useState(0);
    const [isTableEditable, setIsTableEditable] = useState(false)
    const [tempDescription, setTempDescription] = useState("");
    const [tempDuration, setTempDuration] = useState(0);
    const [tempDate, setTempDate] = useState(new Date());

    useEffect(async () => {
        const res = await axios.get('http://localhost:5000/users');
        if (res.data.length > 0) {
            setUsers(res.data.map(user => user.username));
        }
    }, [])


    const onChangeUserName = async (e) => {
        const res = await axios.get(`http://localhost:5000/exercises/${e.target.value}`);
        setChoosenUser();
        setExercisesByUser([...res.data]);
        setShowTable(true)
    }
    const onChangeNewDuration = async (e) => {
        setTempDuration(e.target.value)
    }

    const onChangeNewDescription = async (e) => {
        setTempDescription(e.target.value);
    }

    const onCahngeDate = date => {
        setTempDate(date);
    }

    const onClickSaveNewUser = async (e) => {
        const id = exercisesByUser[e.target.value]._id;
        const username = exercisesByUser[e.target.value].username;
        const newExercise = {
            username: username,
            description: tempDescription,
            duration: tempDuration,
            date: tempDate,
        }
        const res = await axios.post(`http://localhost:5000/exercises/update/${id}`, newExercise);
        setIsTableEditable(false);
        const res1 = await axios.get(`http://localhost:5000/exercises/${username}`);
        setExercisesByUser([...res1.data]);

    }


    const tableGenerator = () => {

        if (isTableEditable) {

            let exercisesWithIndex = [];
            for (let i = 1; i < exercisesByUser.length + 1; i++) {

                if (index === i - 1) {
                    exercisesWithIndex.push(
                        <tr>
                            <td>{i}</td>
                            <td><Form.Control bsPrefix="shorter-input" value={tempDescription} onChange={onChangeNewDescription} /></td>
                            <td><Form.Control bsPrefix="shorter-input" value={tempDuration} onChange={onChangeNewDuration} as="input" type="number" /></td>
                            <td>
                                
                                <DatePicker className='shorter-input'
                                    selected={tempDate}
                                    onChange={onCahngeDate}
                                />
                              
                            </td>
                        <td>
                            <button value={i - 1} onClick={onClickSaveNewUser}>save</button>
                        </td>
                        </tr >
                    )
}

                else {
    exercisesWithIndex.push(
        <tr>
            <td>{i}</td>
            <td>{exercisesByUser[i - 1].description}</td>
            <td>{exercisesByUser[i - 1].duration}</td>
            <td>{exercisesByUser[i - 1].date.slice(0, 10)}</td>
            <td>
                <button value={i - 1} onClick={onClickEditExercise}>edit exercise</button>
                <button value={i - 1} onClick={onClickDeleteExercise}>delete exercise</button>
            </td>
        </tr>
    )
}
            }
return exercisesWithIndex;
        }
        else {

    let exercisesWithIndex = [];
    for (let i = 1; i < exercisesByUser.length + 1; i++) {
        exercisesWithIndex.push(
            <tr>
                <td>{i}</td>
                <td>{exercisesByUser[i - 1].description}</td>
                <td>{exercisesByUser[i - 1].duration}</td>
                <td>{exercisesByUser[i - 1].date.slice(0, 10)}</td>
                <td>

                    <button value={i - 1} onClick={onClickEditExercise}>edit exercise</button>
                    <button value={i - 1} onClick={onClickDeleteExercise}>delete exercise</button>
                </td>
            </tr>
        )
    }
    return exercisesWithIndex;
}
    }


const onClickDeleteExercise = async (e) => {
    const id = exercisesByUser[e.target.value]._id;
    console.log(id);
    setExercisesByUser(exercisesByUser.filter(exercise => (exercise._id !== id)))
    await axios.delete(`http://localhost:5000/users/${id}`);
    // setExercisesByUser([...res.data]);
}


const onClickEditExercise = async (e) => {
    setIsTableEditable(true);
    setIndex(Number(e.target.value))
    setTempDescription(exercisesByUser[Number(e.target.value)].description);
    setTempDuration(exercisesByUser[Number(e.target.value)].duration)
    setTempDate(new Date(exercisesByUser[Number(e.target.value)].date))
    // window.location = "/"
}



return (
    <>
        <Form>
            <Form.Group>
                <Form.Label>choose one of the users in the list:</Form.Label>
                <Form.Control onChange={onChangeUserName} as="select" >
                    <option selected={true} disabled="disabled">Choose...</option>
                    {
                        users.map((user) => (
                            <option key={user}>{user}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
        </Form>
        {showTable && (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {tableGenerator()}
                </tbody>
            </Table>
        )}

    </>
)
}
export default ManageExercises












/**
 * questions:
 * 1.   in the tableGenerator after clicking the edit button of a specific
 *      row i tried to use a regular input but react sent the error:
 *      "input is a void element tag and must neither have `children`" i change it
 *      to a bootstrap component and it worked. what is mean this error?
 * 2.   after we press the edit button about a specific row there the fields open
 *      but at each input field i put a onChange event. there is other better way to
 *      handle the 3 events?
 *
 *
 */



