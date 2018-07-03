import React, { Component } from 'react';
import EditForm from './EditForm';
import { Link, Redirect } from 'react-router-dom';
import logo from '../delete.png';

class ShowTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            id: '',
            done: false,
            editfunc : this.props.handleEdit,
            deleteFunc : this.props.handleDelete
            // members : [],
            // date : []
        }
        console.log(props);

    }
    handleEdit(e, id) {
        console.log("edittext text: "+e.currentTarget.innerText);
        console.log(id);
        let task = e.currentTarget.innerText
            fetch('http://localhost:4000/task/updatetask?task='+task+'&id='+id,{
                method:'POST'
            })
            .then(function(response) {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.fetchFunc();
            }) 
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            })
        this.props.handleEdit
    }
    handleDelete(id) {
        console.log(id);
        fetch('http://localhost:4000/task/deletetask?id=' + id)

            .then(function (response) {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.fetchFunc()
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
            this.props.handleDelete
    }
    componentDidMount() {
            this.fetchFunc()
            this.props.func
    }
    fetchFunc(){
        fetch('http://localhost:4000/mentor/tasks')
        .then(function (response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.getTasks(response)
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
    }


    clicked() {
        console.log("clicked");
    }
    focused() {
        console.log("focused");
    }
    blurred() {
        console.log("blurred");
    }
    getTasks(res) {
        console.log(res);
        // var taskList=[],members=[],date=[];
        var groups = {};
        for (var i = 0; i < res.length; i++) {
            {
                var groupName = res[i].member;
                if (!groups[groupName]) {
                    groups[groupName] = [];
                }
                groups[groupName].push({ task: res[i].task, dueDate: res[i].dueDate, id: res[i]._id });
            }
        }
        let myArray = [];
        for (groupName in groups) {
            myArray.push({ member: groupName, tasks: groups[groupName] });
        }

        console.log(myArray);
        this.setState({
            tasks: myArray
        })
        this.props.func

    }
    render() {
        let taskList = this.state.tasks;
        console.log(taskList);
        console.log("Done: " + this.state.done);
        return (
            <div className= "tasks">{
                taskList.map((item, i) => {
                    // console.log("inside map"+item);
                    return (
                        <div className="tasksPerUser">
                            <div className="member">{item.member}</div>{
                                item.tasks.map((val, i) => {

                                    return (

                                        <div className = "task">

                                            <div className="deleteContainer">
                                                <img className = "delete" src={logo} alt="Smiley face" onClick={this.handleDelete.bind(this, val.id)}/>
                                            </div>
                                            
                                            <div className="taskNameContainer">
                                                <p contenteditable="true" onBlur={(e) => this.handleEdit(e, val.id)}>{val.task}</p>
                                            </div>


                                                    {/* <input  className = "button" type="button" onClick={(e) => this.handleEdit(e, val.id)} value="Edit" /> */}
                                                    {/* <input  className = "button" onClick={this.handleDelete.bind(this, val.id)} type="button" value="Delete" /> */}
                                                    {/* <img className = "delete" src={logo} alt="Smiley face" onClick={this.handleDelete.bind(this, val.id)}/> */}

                                                <span className="due_date">Due date: {val.dueDate}</span>
                                    </div>)
                                })
                            }
                        </div>
                    )
                })

            }
            </div>
        )
    }
}

export default ShowTasks;
