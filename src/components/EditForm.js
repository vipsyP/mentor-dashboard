import React, { Component } from 'react';

class EditForm extends Component{
    constructor(props){
        super(props);
        this.state={
            editTask : false
        }
    }
    handleClick(){
        let id=this.props.id;
        let task = document.getElementById("editTask").value
        fetch('http://localhost:4000/task/updatetask?id='+id+'&task='+task,{
            method:'POST'
        })
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
    render(){
        console.log(this.props)
        return(
            <div>
                <input id="editTask" type="text" name="task" />
                <input type="button" value="submit" onClick={this.handleClick.bind(this)} />
            </div>
        )
    }
}

export default EditForm;