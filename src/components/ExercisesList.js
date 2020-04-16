import React, { useState, useEffect } from 'react'
import { Table, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'

function ExercisesList() {
  const [users, setUsers] = useState([]);
  const [exercisesByUser, setExercisesByUser] = useState([]);
  const [showTable, setShowTable] = useState(false)

  useEffect(async () => {
    const res = await axios.get('http://localhost:5000/users');
    if (res.data.length > 0) {
      setUsers(res.data.map(user => user.username));
    }
  }, [])


  const onChangeUserName = async (e) => {
    
    const user = e.target.value;
    const res = await axios.get(`http://localhost:5000/exercises/${user}`);
    setExercisesByUser([...res.data]);
    setShowTable(true)
  }


  const tableGenerator = () => {
    let exercisesWithIndex = [];
    for (let i = 1; i < exercisesByUser.length + 1; i++) {
      exercisesWithIndex.push(
        <tr>
          <td>{i}</td>
          <td>{exercisesByUser[i - 1].description}</td>
          <td>{exercisesByUser[i - 1].duration}</td>
          <td>{exercisesByUser[i - 1].date.slice(0,10)}</td>
        </tr>
      )
    }
    return exercisesWithIndex;
  }


  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>choose one of the users to see his exercises:</Form.Label>
          <Form.Control onChange={onChangeUserName} as="select" >
            <option selected="true" disabled="disabled">Choose...</option>
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
export default ExercisesList













