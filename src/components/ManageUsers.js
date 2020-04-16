import React, { useState, useEffect } from 'react'
import { Table, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'

function ManageUsers(props) {
    const [users, setUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)
    const [path, setPath] = useState(props.path)

    useEffect(async () => {
        const res = await axios.get(`${path}/users`);
        if (res.data.length > 0) {
            setUsers(res.data);
        }
    }, [])

    const tableGenerator = () => {
        let usersWithId = [];
        for (let i = 1; i < users.length + 1; i++) {
            usersWithId.push(
                <tr>
                    <td>{i}</td>
                 
                    <td>{users[i - 1].username}</td>
                    <td>
                        <button value={i - 1} onClick={onClickDeleteUser}>delete user</button>
                    </td>

                </tr>
            )
        }
        return usersWithId;
    }

    const onClickDeleteUser = async (e) => {
        const id = users[e.target.value]._id;
        const username = users[e.target.value].username;
        console.log(id);
        setUsers(users.filter(user => (user._id !== id)))
        await axios.delete(`${path}/users/${id}`);
        const res = await axios.get(`${path}/exercises/`);
        const exercisesOfUser = res.data.filter(exercise => (
            exercise.username === username
        ))
        exercisesOfUser.forEach(async exercise => {
            await axios.delete(`${path}/exercises/${exercise._id}`);
        });
        // setExercisesByUser([...res.data]);
    }


    const onClickEditUser = async (e) => {
        const user = e.target.value;
    }


    return (
        <>
    

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Actions</th>

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



















