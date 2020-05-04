import React, { useState, useEffect, useContext } from 'react'
import { Table, Form } from 'react-bootstrap';
import axios from 'axios'
import './style/ExercisesList.css'
import PathContext from '../contexts/PathContext'
const moment = require('moment');

function ExercisesList() {
  const [users, setUsers] = useState([]);
  const [exercisesByUser, setExercisesByUser] = useState([]);
  const [showTable, setShowTable] = useState(false)
  const path = useContext(PathContext);

  useEffect(() => {
    (async () => {
        const res = await axios.get(`${path}/users`);
        res.data.length > 0 && setUsers(res.data.map(user => user.username));
    })()
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
          <td className="td-date-list">{moment(date.toString()).format("DD/MM/YYYY")}</td>
        </tr>
      ))
  }

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>choose one of the users to see his exercises:</Form.Label>
          <Form.Control className="input" onChange={onChangeUserName} as="select" >
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
              <th >Duration </th>
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













