import React, { useState, useEffect, useContext } from 'react'
import { Table, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'
import './style/ManageUsers.css'
import PathContext from '../contexts/PathContext'

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const path = useContext(PathContext)

    useEffect(() => {
        getData();
        // (async () => {
        //     const res = await axios.get(`${path}/users`);
        //     res.data.length > 0 && setUsers(res.data);
        // })()
    }, [])

    async function getData() {
        const res = await axios.get(`${path}/users`);
        res.data.length > 0 && setUsers(res.data);
    }

    const tableGenerator = () => {
        return users.map(({
            username, _id
        }, index) => (
                <tr key={_id}>
                    <td >{index + 1}</td>
                    <td className="td-username-manage-users">{username}</td>
                    <td className="td-action-manage-users"><button className="btn-size" onClick={(e) => onClickDeleteUser(e, username, _id)}>delete user</button></td>
                </tr>
            ))
    }

    const onClickDeleteUser = async (e, username, id) => {
        setUsers(users.filter(user => (user._id !== id)))
        await axios.delete(`${path}/users/${id}`);
        const res = await axios.get(`${path}/exercises/`);
        const exercisesOfUser = res.data.filter(exercise => (
            exercise.username === username
        ))
        exercisesOfUser.forEach(async exercise => {
            await axios.delete(`${path}/exercises/${exercise._id}`);
        });
    }

    return (
        <>
            <Form.Label>the users in the system. <br></br>
                <b>notice</b> - if you delete one of the users, all his exercises will deleted as well!</Form.Label>
            <Table size="sm" className="short-table-manage-users" striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="td-username-manage-users">User Name</th>
                        <th className="td-action-manage-users">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableGenerator()}
                </tbody>
            </Table>
        </>
    )
}

export default ManageUsers


/**
 * questions:
 * 1.   what is the best practice to delete part of a collection?
 *      for example at the onClickDeleteUser function the purpose is to delete the
 *      user from the users collection (this is an easy action) in addition to that, we should also delete just the
 *      exercises from the exercises collection that their username is the same user we want to delete.
 *      i did it as above. is there a better way?
 */



















