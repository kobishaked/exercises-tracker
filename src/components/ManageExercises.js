import React, { useState, useEffect, useContext } from 'react'
import { Table, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'
import './style/ManageExercises.css'
import DatePicker from "react-datepicker";
import PathContext from '../contexts/PathContext'
const moment = require('moment');


function ManageExercises(props) {
    const [users, setUsers] = useState([]);
    const [choosenUser, setChoosenUser] = useState("")
    const [exercisesByUser, setExercisesByUser] = useState([]);
    const [tempId, setTempId] = useState(null);
    const [tempDescription, setTempDescription] = useState("");
    const [tempDuration, setTempDuration] = useState(0);
    const [tempDate, setTempDate] = useState(new Date());
    const [showTable, setShowTable] = useState(false);
    // const [path, setPath] = useState(null)

    const path = useContext(PathContext);


    
    useEffect(async () => {
        const res = await axios.get(`${path}/users`);
        if (res.data.length > 0) {
            setUsers(res.data.map(user => user.username));
        }
    }, [])






    // useEffect(() => {
    //     let path = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    //     // if (process.env.NODE_ENV === "development") {
    //     //     path = "http://localhost:5000";
    //     // }
    //     // else {
    //     //     path = "";
    //     // }
    //     (async function fetchUsers() {
    //         const res = await axios.get(`${path}/users`);
    //         res.data.length > 0 && setUsers(res.data.map(user => user.username));
    //         // if (res.data.length > 0) {
    //         //     setUsers(res.data.map(user => user.username));
    //         // }
    //     })();
    //     // fetchUsers()
    //     setPath(path);
    // }, [])




    const onChangeUserName = async (e) => {
        setChoosenUser(e.target.value);
        const res = await axios.get(`${path}/exercises/${e.target.value}`);
        setExercisesByUser([...res.data]);
        setShowTable(true)
    }
    const onChangeNewDuration = async (e, duration) => {
        setTempDuration(e.target.value)
    }

    const onChangeNewDescription = async (e, description) => {
        setTempDescription(e.target.value);
    }

    const onChangeDate = date => {
        setTempDate(date);
    }

    const onClickEditExercise = async (description, date, duration, id) => {

        setTempId(id);
        setTempDescription(description);
        setTempDuration(duration)
        setTempDate(new Date(date))
    }

    const onClickSaveNewExercise = async (id) => {
        const newExercise = {
            username: choosenUser,
            description: tempDescription,
            duration: tempDuration,
            date: tempDate,
        }
        const res = await axios.put(`${path}/exercises/update/${id}`, newExercise);
        setExercisesByUser([...res.data]);
        setTempId(null);
    }

    const onClickDeleteExercise = async (id) => {
        setExercisesByUser(exercisesByUser.filter(exercise => (exercise._id !== id)))
        await axios.delete(`${path}/users/${id}`);
    }

    const tableGenerator = () => {
        return exercisesByUser.map(({
            description, date, duration, _id
        }, index) => (
                tempId === _id ? (
                    <tr key={_id}>
                        <td>{index + 1}</td>
                        <td ><input className="shorter-input" value={tempDescription} onChange={onChangeNewDescription} /></td>
                        <td ><input className="shorter-input" value={tempDuration} onChange={onChangeNewDuration} as="input" type="number" /></td>
                        <td >
                            <DatePicker className='shorter-input'
                                dateFormat="dd/MM/yyyy"
                                selected={tempDate}
                                onChange={onChangeDate}
                            />
                        </td>
                        <td>
                            <button onClick={() => onClickSaveNewExercise(_id)}>save</button>
                        </td>
                    </tr >
                ) : (
                        <tr key={_id}>
                            <td>{index + 1}</td>
                            <td className="td-description-manage-exercises">{description}</td>
                            <td className="td-duration-manage-exercises">{duration}</td>
                            <td className="td-date-manage-exercises">{moment(date.toString()).format("DD/MM/YYYY")}</td>
                            <td className="btn-margin">
                                <button className="btn-margin" onClick={() => onClickEditExercise(description, date, duration, _id)}>edit exercise</button>
                                <button className="btn-margin" onClick={() => onClickDeleteExercise(_id)}>delete exercise</button>
                            </td>
                        </tr>
                    )
            ));
    }



    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>choose one of the users in the list:</Form.Label>
                    <Form.Control className="input" onChange={onChangeUserName} as="select" >
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
                <Table size="sm" striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Duration </th>
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













