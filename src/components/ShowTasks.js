import React, { Component } from 'react';

class ShowTasks extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks: [],
            // members : [],
            // date : []
        }
       console.log(props);
       
    }
    componentWillMount(){
        fetch('http://localhost:4000/mentor/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.getTasks(response)
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }
    getTasks(res){
        console.log(res);
        // var taskList=[],members=[],date=[];
        var groups = {};
        for (var i = 0; i < res.length; i++) {
            {
                var groupName = res[i].member;
                if (!groups[groupName]) {
                     groups[groupName] = [];
                }
             groups[groupName].push({task: res[i].task , dueDate: res[i].dueDate});
            }
        }   
        let myArray=[];
        for (groupName in groups) {
            myArray.push({member: groupName, tasks: groups[groupName]});
        }
    
        console.log(myArray);
        this.setState({
            tasks : myArray
        })
    
    //     res.forEach((item,i)=>{
    //         taskList.push(item.task);
    //         members.push(item.member);
    //         date.push(item.dueDate);
    //     })
    //     console.log(taskList);
    //     console.log(members);
    //     this.setState({
    //         tasks : taskList,
    //         members : members,
    //         date : date
    //     })
    //     console.log(this.state.tasks);
    }
  render() {
    let taskList = this.state.tasks;
    // let members = this.state.members;
    // let date = this.state.date;
    console.log(taskList);
        return(
            <div>{
                taskList.map((item,i)=>{
                    // console.log("inside map"+item);
                    return (
                    <div className="assignedTasks">
                        <div className="member">{item.member}</div>{
                        item.tasks.map((val,i)=>{
                           return <div><span>{val.task}</span><span className="due-date">Due date: {val.dueDate}</span></div>
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
