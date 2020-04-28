import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import MyNavbar from './components/MyNavbar';
import ExercisesList from './components/ExercisesList';
import ManageExercises from './components/ManageExercises';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
import ManageUsers from './components/ManageUsers'

//
function App() {
  const [path, setPath] = useState("")
  console.log('debug server path: ', process.env.NODE_ENV);
  return (
    <div className="App">
      <Container>
        <Router>
          <MyNavbar />
          <br />
          <Route exact path="/" render={() => <ExercisesList path={path}  />} />
          <Route path="/createUser" render={() => <CreateUser path={path}  />} />
          <Route path="/manageUsers" render={() => <ManageUsers path={path}  />} />
          <Route path="/createExercise" render={() => <CreateExercise path={path}  />} />
          <Route path="/ManageExercises" render={() => <ManageExercises path={path}  />} />
        </Router>
      </Container>
    </div>
  );
}

export default App;




//123


/**
 * questions:
 * 1.   (git):
 *      understanding how can i use 2 computers with one repository in github and what is the difference from ssh\new repository\
 *      exist repository and upload repository that shown after i open a new repository in the github user.
 * 2.   (package.json and globally packages)
 *      for this project i used some packages that i wanted to install globally such as nodemon and concurrently but after i installed
 *      with -g flag the console still not recognized it and for use it i had to install it as a defDependency and to add
 *      a script to the local package.json
 * 3.   (package.json):
 *      understanding the hirarchy of package.json. if i have a folder with package.json and inside it i have another folder with
 *      package.json. if im doing npm install in the inner folder should it do first on the inner package.json,
 *      after that in the outer package.json and finnaly in the globally?
 * 4.   (debugging):
 *      what are the easiest and most efficient way to debugg both client and server side
 * 
 *      webstorm
 *      solid principle
 * 
 * 5.   get through the Router components and specially the importance of Link and Switch
 *      and generally what is a best practise of using Router. because i saw some differents implementions.
 * 6.   what are the differences (in deep view) between using import and using require. what each does in the background?
 * 7.   summary of all the ways to communicate between client and server (uri params, req body etc..).
 *      when should i use each way? what are the reasons to do that?
 *      
 *      USERS:
 *      POST /users
 *      {
 *        name: '',
 *        id: ''
 *      }     
 * 
 *      PUT/PATCH /users/15
 *      {
 *        name: ''
*       }

        /users&name=adi

        GET /search&filter={name: adi, age: 15}&sort=asc

        POST /search
        {
          filter: {
            
          }
        }
 * 
 * 8.  how can i use properly the console in the chrome inspect (for example to see the content of variables)?
 * 9.  get through react-bootstrap uses and tricks and to get deep understanding on how to style with scalabilty way.
 * 
 * 
 * 
 *      **********all bellow sections are about the manage exercises menu in the app and the ManageExercises component in the code.**********
 * 
 * 1.  in the tableGenerator function after clicking the edit button of a specific row i tried to use a regular input
 *      but react sent the error: "input is a void element tag and must neither have `children`" i change it to a bootstrap component
 *      and it worked. what the meaning of this error?
 *      
 * 2.  after we press the edit button in one of the rows in the table of manage exercises, the fields changed to be editable
 *      but at each input field i put onChange event. there is other better way to handle the 3 events?
 * 3.  any better sugestions to implement the tableGenerator functions (ManageExercises component)?
 * 4.  how to make the update of a field faster after we edit and click save?
 * 
 * 5.   for example in the function onChangeUserName, how can i use the path of an ajax request to the server for both the local
 *      version that should be `http://localhost:5000/exercises/${e.target.value}` and  the production version should be `/exercises/${e.target.value}`
 *      or in other word how can i check at runtime if im in local or production?
 *      can i use the (process.env.NODE_ENV ==='production') like in the server side?
 *      after lesson with ivgeni (see the comment in the code then read this): 
 *      the setPath update the path just after finish the useeffect function so the
        get method inside the useEffect send undefine instead of http://localhost:5000/
 */


