import React, { useState, useEffect } from 'react'
import { Table, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)

    useEffect(async () => {
        const res = await axios.get('http://localhost:5000/users');
        if (res.data.length > 0) {
            setUsers(res.data);
        }
    }, [])

    const tableGenerator = () => {
        let exercisesWithId = [];
        for (let i = 1; i < users.length + 1; i++) {
            exercisesWithId.push(
                <tr>
                    <td>{i}</td>
                    <td>{users[i - 1].username}</td>
                    <td>
                        {/* <button  onClick={onClickEditUser}>change name</button> */}
                        <button value={i - 1} onClick={onClickDeleteUser}>delete user</button>
                    </td>

                </tr>
            )
        }
        return exercisesWithId;
    }

    const onClickDeleteUser = async (e) => {
        const id = users[e.target.value]._id;
        const username = users[e.target.value].username;
        console.log(id);
        setUsers(users.filter(user => (user._id !== id)))
        await axios.delete(`http://localhost:5000/users/${id}`);
        const res = await axios.get(`http://localhost:5000/exercises/`);
        const exercisesOfUser = res.data.filter(exercise => (
            exercise.username === username
        ))
        exercisesOfUser.forEach(async exercise => {
            await axios.delete(`http://localhost:5000/exercises/${exercise._id}`);
        });

        // setExercisesByUser([...res.data]);
    }


    // const onClickEditUser = async (e) => {
    //     const user = e.target.value;
    // }


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
 *      for example at the onClickDeleteUser function the pupose is to delete the
 *      user from the users collection (easy acrion) and to delete just the 
 *      exercises from the exercises collection that their username is the same
 *      user we want to delete. i did it as above. is there a better way?
 */



















