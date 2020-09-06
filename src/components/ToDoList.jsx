import React from 'react';
import '../styles/ToDoList.scss';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            activeTasks: [],
            compltTasks: [],
            onCompleted: false,
            onActive: false,
            onAll: true
        };
        this.createTasks = this.createTasks.bind(this);
        this.addTask = this.addTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.onEdit = this.onEdit.bind(this); 
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.filter = this.filter.bind(this);
        this.hoveringTask = this.hoveringTask.bind(this);
        this.notHoveringTask = this.notHoveringTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.completeAll = this.completeAll.bind(this);
    }

    addTask(e) {
        if (this._inputElement.value !== "") {
            let newTask = {
                text: this._inputElement.value,
                key: Date.now(),
                isCompleted: false,
                isHover: false
            };

            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(newTask), 
                    activeTasks: prevState.activeTasks.concat(newTask)
                };
            });
        }
        this._inputElement.value = "";
        e.preventDefault();
    }

    filter(newTasks) {
        this.setState({
            tasks: newTasks
        });

        let newActiveTasks = newTasks.filter(function (task) {
            return (task.isCompleted === false);
        });

        let newCompletedTasks = newTasks.filter(function (task) {
            return (task.isCompleted === true);
        });

        this.setState({
            activeTasks: newActiveTasks,
            compltTasks: newCompletedTasks
        });
    }

    completeTask(key) {
        let newTasks = [...this.state.tasks];
        for(let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].key === key) {
                newTasks[i].isCompleted = !newTasks[i].isCompleted;
            }
        }
        this.filter(newTasks);
    }

    onEdit(key) {
        let newTasks = [...this.state.tasks];
        for(let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].key === key) {
                newTasks[i].onEdit = true;
            }
        }
        this.filter(newTasks);
    }

    editTask(e) {
        let newTasks = [...this.state.tasks];
        let text = this._inputElement.value;
        for(let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].onEdit === true) {
                newTasks[i].onEdit = false;
                if (text !== "")
                    newTasks[i].text = text;
            }
        }
        this._inputElement.value = "";
        console.log("1111111");
        console.log(newTasks);
        this.filter(newTasks);
        e.preventDefault();
    }

    deleteTask() {
        let newTasks = this.state.tasks.filter(function (task) {
            return (task.isCompleted !== true);
        });
        this.filter(newTasks);
    }

    hoveringTask(key) {
        //console.log(key);
        let newTasks = [...this.state.tasks];
        for(let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].key === key) {
                newTasks[i].isHover = true;
            }
        }
        this.filter(newTasks);
        //console.log(newTasks);
    }

    notHoveringTask(key) {
        let newTasks = [...this.state.tasks];
        for(let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].key === key)
                newTasks[i].isHover = false;
        }
        this.filter(newTasks);
    }

    removeTask(key) {
        let newTasks = this.state.tasks.filter(function (task) {
            return (task.key !== key);
        });
        this.filter(newTasks);
    }

    completeAll() {
        let newTasks = [...this.state.tasks];
        for(let i = 0; i < newTasks.length; i++) {
            newTasks[i].isCompleted = true;
        }
        this.filter(newTasks);
    }

    createTasks(task) {
        let button = "";
        console.log(task);
        if (task.isHover === true)
            button = <svg onClick = {() => this.removeTask(task.key)} width = "20px" height = "20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                    </svg>;
        if (task.onEdit === true) {
            return (
                <div className = "edit" key = {task.key}>
                    <form onSubmit = {this.editTask}>
                        <input ref = {(a) => this._inputElement = a} 
                            placeholder = "Edit task"></input>
                    </form>
                </div>
            );
        } else if (task.isCompleted) {
            return (
                <div className = "completed" key = {task.key} onMouseOver = {() => this.hoveringTask(task.key)} onMouseLeave = {() => this.notHoveringTask(task.key)}>
                    <table border = "0">
                        <tbody>
                            <tr>
                                <td>
                                    <svg onClick = {() => this.completeTask(task.key)} width = "20px" height = "20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/>
                                    </svg>
                                </td>
                                <td className = "completedTasks" onDoubleClick = {() => this.onEdit(task.key)}>{task.text}</td>
                                <td>{button}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className = "unCompleted" key = {task.key} onMouseOver = {() => this.hoveringTask(task.key)} onMouseLeave = {() => this.notHoveringTask(task.key)}>
                    <table border = "0">
                        <tbody>
                            <tr>
                                <td><svg stroke = "black" fill = "none" onClick = {() => this.completeTask(task.key)} width = "20" height = "20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path stroke-width = "20px" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
                                </svg>
                                </td>
                                <td><i className = "far fa-circle" ></i></td>
                                <td className = "unCompletedTasks" onDoubleClick = {() => this.onEdit(task.key)}>{task.text}</td>
                                <td>{button}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    render() {
        let listTasks = this.state.tasks.map(this.createTasks);
        if (this.state.onActive === true)
            listTasks = this.state.activeTasks.map(this.createTasks);
        else if (this.state.onCompleted === true) 
            listTasks = this.state.compltTasks.map(this.createTasks);
        return (
            <div className = "ToDoListMain">
                <div className = "header">
                    <form onSubmit = {this.addTask}>
                        <input ref = {(a) => this._inputElement = a} 
                            placeholder = "Enter new task"></input>
                    </form>
                </div> 

                <ul className = "theList">
                    {listTasks}
                </ul>

                <p>{this.state.activeTasks.length} active tasks</p>
                <button type = "button" onClick = {this.deleteTask}>Clear completed tasks</button> <br />
                <button type = "button" onClick = {() => {
                    this.setState({
                        onActive: true,
                        onCompleted: false,
                        onAll: false
                    });
                }}>Active tasks</button>
                
                <button type = "button" onClick = {() => {
                    this.setState({
                        onActive: false,
                        onCompleted: false,
                        onAll: true
                    });
                }}>All tasks</button>

                <button type = "button" onClick = {() => {
                    this.setState({
                        onActive: false,
                        onCompleted: true,
                        onAll: false
                    });
                }}>Completed tasks</button>

                <button type = "button" onClick = {this.completeAll}>Complete all tasks</button>
            </div>
        );
    }

    componentDidUpdate() {
        const json = JSON.stringify(this.state.tasks);
        localStorage.setItem("tasks", json);
    }

    componentDidMount() {
        const json = localStorage.getItem("tasks");
        if (json !== null) {
            let taskList;
            if (localStorage['tasks']) 
                taskList = JSON.parse(json);
            if (taskList) {
                this.filter(taskList);
            }
        }
    }
}

export default ToDoList;