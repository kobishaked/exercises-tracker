import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import MyNavbar from './components/MyNavbar';
import ExercisesList from './components/ExercisesList';
import ManageExercises from './components/ManageExercises';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
import ManageUsers from './components/ManageUsers'


function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <MyNavbar />
          <br />
          <Route exact path="/" component={ExercisesList} />
          <Route path="/createUser" component={CreateUser} />
          <Route path="/manageUsers" component={ManageUsers} />
          <Route path="/createExercise" component={CreateExercise} />
          <Route path="/ManageExercises" component={ManageExercises} />
        </Router>
      </Container>
    </div>
  );
}

export default App;










/**
 * questions:
 * 1.   (git):
 *      understanding how can i use 2 computers with one repository
 *      in github and what is the difference from ssh\new repository\
 *      exist repository and upload repository that shown after i open
 *      a new repository in the github user.
 * 2.   how can i run both api server and react server at the same time?
 * 3.   how should i deploy the 2 server and front sides?
 *
 * 4.   (package.json and globally packages)
 *      for this profect i used some packages that i wanted to install globally such
 *      as nonemon and concurrently but after i installed with -g flag the console still
 *      not recognized it and for use it i had to install it as a defDependency and to add
 *      a script to the local package.json
 * 5.   (package.json):
 *      to understand the hirarchy of package.json. if i have a folder
 *      with package.json and inside it i have another folder with
 *      package.json. if im doing npm install in the inner folder should it
 *      do first on the inner package.json, after that in the outer package.json
 *      and finnaly in the globally?
 * 6.   (debugging):
 *      what are the easiest and most efficient way to debugg both client and
 *      server side

 */