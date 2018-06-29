import React, { Component } from 'react';
import EditForm from './EditForm';
import { Link, Redirect } from 'react-router-dom';

class ShowTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            edit: false,
            id: '',
            done: false
            // members : [],
            // date : []
        }
        console.log(props);

    }
    handleEdit(id) {
        this.setState({
            edit: true,
            done: true,
            id: id
        })
        console.log("Edit: " + this.state.done);
    }
    handleDelete(id) {
        console.log(id);
        fetch('http://localhost:4000/task/deletetask?id=' + id)

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
        this.setState({
            done: true
        })
        console.log("Delete: " + this.state.done);
    }
    componentDidMount() {
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


    shouldComponentUpdate(prevState) {
        console.log("Prev: " + prevState.done);
        console.log("Upd: " + this.state.done);
        return true;
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

    }
    render() {
        let taskList = this.state.tasks;
        console.log(taskList);
        console.log("Done: " + this.state.done);
        return (
            <div>{
                taskList.map((item, i) => {
                    // console.log("inside map"+item);
                    return (
                        <div className="assignedTasks">
                            <div className="member">{item.member}</div>{
                                item.tasks.map((val, i) => {
                                    return <div>
                                        <span>{val.task}<span className="due-date">Due date: {val.dueDate}</span></span>
                                        <div className="editDelete">
                                            <input type="button" onClick={this.handleEdit.bind(this, val.id)} value="Edit" />
                                            {this.state.edit && this.state.id === val.id ? <EditForm id={val.id} /> : ""}
                                            <input onClick={this.handleDelete.bind(this, val.id)} type="button" value="Delete" />
                                        </div>
                                        <hr />
                                    </div>
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
