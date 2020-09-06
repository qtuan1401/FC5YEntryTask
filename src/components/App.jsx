import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import User from './User.jsx';
import ToDoList from './ToDoList.jsx';
import '../styles/App.scss';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className = "option">
                    <li><Link tag = "li" to = "/">Home page</Link></li>
                    <li><Link tag = "li" to = "/ToDoList">Todo List Page</Link></li>
                    <li><Link tag = "li" to = "/User"> Users Page</Link></li>
                </div> <br />
                <Switch>
                    <Route exact path = "/" component = {Home} />
                    <Route path = "/TodoList" component = {ToDoList} />
                    <Route path = "/User" component = {User} />
                </Switch>
            </Router>
        );
    }
}   

const Home =  () => (
    <div> 
        <h1>Home page</h1>
        <h2>Welcome to my page</h2>
    </div>  
);

export default App;