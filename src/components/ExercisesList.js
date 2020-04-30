import React, { useState, useEffect } from 'react'
import { Table, Form, Button, FormControl, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'
import './style/ExercisesList.css'

function ExercisesList(props) {
  const [users, setUsers] = useState([]);
  const [exercisesByUser, setExercisesByUser] = useState([]);
  const [showTable, setShowTable] = useState(false)
  const [path, setPath] = useState(props.path)

  useEffect(async () => {
    const res = await axios.get(`${path}/users`);
    if (res.data.length > 0) {
      setUsers(res.data.map(user => user.username));
    }
  }, [])


  const onChangeUserName = async (e) => {

    const user = e.target.value;
    const res = await axios.get(`${path}/exercises/${user}`);
    setExercisesByUser([...res.data]);
    setShowTable(true)
  }

  const tableGenerator = () => {
    return exercisesByUser.map(({
      description, date, duration, _id
    }, index) => (
        <tr key={_id}>
          <td >{index + 1}</td>
          <td className="td-description-list">{description}</td>
          <td className="td-duration-list">{duration}</td>
          <td className="td-date-list">{date.slice(0, 10)}</td>
        </tr>
      ))
  }

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>choose one of the users to see his exercises:</Form.Label>
          <Form.Control className="input"  onChange={onChangeUserName} as="select" >
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
        <Table size="sm" className="short-table-list" striped bordered hover responsive>
          <thead >
            <tr >
              <th>#</th>
              <th >Description</th>
              <th >Duration</th>
              <th >Date</th>
            </tr>
          </thead>
          <tbody >
            {tableGenerator()}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ExercisesList













