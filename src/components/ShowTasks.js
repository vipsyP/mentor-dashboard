import React, { Component } from 'react';
import EditForm from './EditForm';
import { Link, Redirect } from 'react-router-dom';

class ShowTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            id: '',
            done: false,
            editfunc : this.props.handleEdit,
            deleteFunc : this.props.handleDelete,
            // members : [],
            // date : []
            authState:true
        }
        console.log(props);

    }
    handleEdit(e, id) {
        const self=this;
        console.log(e.currentTarget.previousSibling.innerText);
        console.log(id);
        let task = e.currentTarget.previousSibling.innerText
            fetch('http://localhost:4000/task/updatetask?task='+task+'&id='+id,{
                method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            } 
            })
            .then(function(response) {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.fetchFunc();
                self.setState({
                    authState:response.status 
                  });
            }) 
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            })
        this.props.handleEdit
    }
    handleDelete(id) {
        const self=this;
        console.log(id);
        fetch('http://localhost:4000/task/deletetask?id=' + id,{
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            } 
        })
            .then(function (response) {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.fetchFunc()
                self.setState({
                    authState:response.status 
                  });

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
        const self=this;
        fetch('http://localhost:4000/mentor/tasks',{
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
            
        })
        .then(function (response) {
            return response.json();
        })
        .then(response => {
            console.log("inside mentor tasks response",response);
            console.log("inside mentor tasks response.status=",response.status);
            self.setState({
                authState:response.status 
              });
            this.getTasks(response)
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
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
        if(this.state.authState==false){
            return <Redirect to = "/" />
          }
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
// <<<<<<< HEAD
                                    return (<div className = "task">
                                       
                                        <span className="due_date">Due date: {val.dueDate}</span>
                                        <div className="buttons">
                                            <span contenteditable="true">{val.task}</span>
                                            <input  className = "button" type="button" onClick={(e) => this.handleEdit(e, val.id)} value="Edit" />
                                            <input  className = "button" onClick={this.handleDelete.bind(this, val.id)} type="button" value="Delete" />
{/* =======
                                    return (<div className = "task">
                                        <span>{val.task}<span className="due_date">Due date: {val.dueDate}</span></span>
                                        <div className="buttons">
                                            <input className = "button" type="button" onClick={this.handleEdit.bind(this, val.id)} value="Edit" />
                                            {this.state.edit && this.state.id === val.id ? <EditForm id={val.id} /> : ""}
                                            <input className = "button" onClick={this.handleDelete.bind(this, val.id)} type="button" value="Delete" />
>>>>>>> ui-updates */}
                                        </div>
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
