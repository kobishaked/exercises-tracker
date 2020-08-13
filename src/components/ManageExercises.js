import React, { useState, useEffect, useContext } from 'react'
import { Table, Form } from 'react-bootstrap';
import axios from 'axios'
import './style/ManageExercises.css'
import DatePicker from "react-datepicker";
import PathContext from '../contexts/PathContext'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
const moment = require('moment');


function ManageExercises() {
    const [users, setUsers] = useState([]);
    const [choosenUser, setChoosenUser] = useState("")
    const [exercisesByUser, setExercisesByUser] = useState([]);
    const [tempId, setTempId] = useState(null);
    const [tempDescription, setTempDescription] = useState("");
    const [tempDuration, setTempDuration] = useState(0);
    const [tempDate, setTempDate] = useState(new Date());
    const [showTable, setShowTable] = useState(false);
    const path = useContext(PathContext);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        getData()
        // (async () => {
        //     const res = await axios.get(`${path}/users`);
        //     res.data.length > 0 && setUsers(res.data.map(user => user.username));
        // })()
    }, [])

    async function getData() {
        const res = await axios.get(`${path}/users`);
        res.data.length > 0 && setUsers(res.data.map(user => user.username));
    }

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

        try {
            const res = await axios.put(`${path}/exercises/update/${id}`, newExercise);
            setExercisesByUser([...res.data]);
            setTempId(null);
            toast.success("changes saved!")
        }
        catch (e) {
            toast.error("there is a network problem, please try again later.")
        }
        setAlert(true)




    }

    const onClickDeleteExercise = async (id) => {
        try {
            setExercisesByUser(exercisesByUser.filter(exercise => (exercise._id !== id)))
            await axios.delete(`${path}/users/${id}`);
            toast.success("exercise deleted successfully!")
        }
        catch (e) {
            toast.error("there is a network problem, please try again later.")
        }
        setAlert(true)
    }

    const tableGenerator = () => {
        return exercisesByUser.map(({
            description, date, duration, _id
        }, index) => (
                tempId === _id ? (
                    <tr key={_id}>
                        <td className='index'>{index + 1}</td>
                        <td className="td-description-manage-exercises"><input className="shorter-input " value={tempDescription} onChange={onChangeNewDescription} /></td>
                        <td className="td-duration-manage-exercises"><input className="shorter-input " value={tempDuration} onChange={onChangeNewDuration} as="input" type="number" /></td>
                        <td className="td-date-manage-exercises">
                            <DatePicker className='shorter-input '
                                dateFormat="dd/MM/yyyy"
                                selected={tempDate}
                                onChange={onChangeDate}
                            />
                        </td>
                        <td className="btn-margin">
                            <button onClick={() => onClickSaveNewExercise(_id)}>save</button>
                        </td>
                    </tr >
                ) : (
                        <tr key={_id}>
                            <td className='index'>{index + 1}</td>
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
            {
                alert &&
                <ToastContainer
                    className="alert"
                    autoClose={4000}
                    position={toast.POSITION.BOTTOM_CENTER}
                />
            }
        </>
    )
}

export default ManageExercises








// const onClickDeleteUser = async (e, username, id) => {
//     try {
//         setUsers(users.filter(user => (user._id !== id)))
//         await axios.delete(`${path}/users/${id}`);
//         const res = await axios.get(`${path}/exercises/`);
//         const exercisesOfUser = res.data.filter(exercise => (
//             exercise.username === username
//         ))
//         exercisesOfUser.forEach(async exercise => {
//             await axios.delete(`${path}/exercises/${exercise._id}`);
//         });
//         toast.success("user deleted successfully!")
//     }
//     catch (e) {
//         toast.error("please insert a name with at least 3 characters")
//     }
//     setAlert(true)

// }

















