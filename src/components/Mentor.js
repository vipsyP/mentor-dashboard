import React, { Component } from 'react';
// import { withRouter } from 'react-router';
// import {Redirect,Link} from 'react-router-dom';
import Router from 'react-router-dom';
import {BrowserRouter, Route, Switch,Redirect,Prompt} from 'react-router-dom';
import ShowTasks from './ShowTasks';
import SubmittedTasks from './SubmittedTasks';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import addUserImage from '../addUser.png';
import deleteImage from '../delete.png';
let teamMembers=[];

// import LoginSignup from './Login-Signup'; 


class Mentor extends Component {
    constructor(props,{match}){
        super(props,{match});
        this.state={
          mentor: '',
          add : false,
          mem:[],
          edit: false,
          delete: false,
          show: false,
          done: false,
          authState:true,
          showAddTeam: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    handleadd(){
      // e.preventDefault();
      this.setState(prevState => ({
        add: !prevState.add
      }));
    }
    handleEdit(){
      // e.preventDefault();
      this.setState(prevState => ({
        edit: !prevState.edit
      }));
    }
    handleDelete(){
      // e.preventDefault();
      this.setState(prevState => ({
        delete: !prevState.delete
      }));
    }

    addMembersBtn() {
      this.setState({
        showAddTeam: !this.state.showAddTeam
      });
    }
  
    // addMembers() {
    //   console.log(document.getElementById("member").value);
    //   let member = document.getElementById("member").value;
    //   fetch('http://localhost:4000/mentee/add?member=' + member, {
    //     method: "post"
    //   }).then(response => {
    //     console.log(response);
    //   }).catch(function (err) {
    //     console.log('Fetch Error :-S', err);
    //   })
    //   this.setState({
    //     showAddTeam: !this.state.showAddTeam
    //   });
    // }
  
    addMembers(){
      // var popUp = document.getElementById("popUp")
      // popUp.style.display = visible;
      // document.getElementsByClassName("popUp");
      const self=this;
      console.log(document.getElementById("member").value);
      let member = document.getElementById("member").value;
      fetch('http://localhost:4000/mentee/add?member='+member,{
        method:'POST',
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
          self.setState({
            authState:response.status 
          });
      })
      .catch(function (err) {
          console.log('Fetch Error :-S', err);
      })
      this.setState({
            showAddTeam: !this.state.showAddTeam
          });
    }

    logOut(event){
      console.log("event in logout points to -",event);
      const self=this;
      fetch("http://localhost:4000/logout", {
              method: "GET",
              credentials: "include",
              headers: {
                  "content-type": "application/json"
              },
              // body: JSON.stringify(signupdata)
          }).then(function (response) {
              console.log('data in logout', response);
              return response.json();
          }).then(response => {
              self.setState({
                  logoutStatus: response.status    
              });
          }).catch(err => {
              console.log(err);
          })
  }
    handleSubmit(){
        // console.log("working");
        // e.preventDefault();
      //  console.log( document.getElementById("taskName").value);
       let task=  document.getElementById("taskName").value
      //  console.log(document.getElementById("date").value);
       let date = document.getElementById("date").value
      //  console.log(document.getElementsByName("teamMember")[0].value);
       let member = document.getElementsByName("teamMember")[0].value;
       let mentor = this.props.match.params.user;
       let data={
         task:task,
         date:date,
         member:member,
         mentor:mentor
       }
      //  fetch("http://localhost:4000/mentor/task/create?task="+task+'&date='+date+'&member='+member,{
        const self=this;
        fetch("http://localhost:4000/mentor/task/create",{
            method:'POST',
            credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log("response after successful task insertion",response);
            self.setState({
              authState:response.status 
            });
            console.log("response after successful task insertion authState is ",this.state.authState);
            
             this.getUpdatedTask()
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }

    getUpdatedTask(){
      this.setState({
        show: true
      });
    }
    handleComplete(){
      this.setState({
        done: true
      });
    }
    state = {
      selectedOption: '',
    }
    handleChange = (selectedOption) => {
     
      this.setState({ selectedOption });
      // selectedOption can be null when the `x` (close) button is clicked
      if (selectedOption) {
        console.log(`Selected: ${selectedOption.label}`);
      }
    }
    componentDidMount(){
      fetch('http://localhost:4000/addMembers',{
        method:'GET',
            credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
      })
                  .then(function (response) {
                      return response.json();
                  })
                  .then(response => {
                      console.log(response);
                      this.getMembers(response);
                  })
                  .catch(function (err) {
                      console.log('Fetch Error :-S', err);
                  })
                  
    }
    getMembers(res){
      console.log(res);
                  res.map((item,i)=>{
                     teamMembers.push({ value: item.member, label: item.member })
                  })
                  console.log(teamMembers);
      this.setState({
        mem:teamMembers
      })
      
    }
    render() {
      if(this.state.authState==false){
        return <Redirect to = "/" />
      }
      const { selectedOption } = this.state;
      return (

        <div className="rootContainer">
        
        <div className="topBar">
        <span className = "mentorNameLabel">Mentor:</span><span className = "mentorName">{this.props.match.params.user}</span>
              <h1 className = "topBarHeading"> MyTeam </h1> 
			  <div className = "placeholder" ></div>    
        
        <div className="addMembers" >
            {/* <input className="addMembers-Btn" type="button" value="+" onClick={this.addMembersBtn.bind(this)} /> */}
            <span className = "roundIcon" type="button"  onClick={this.addMembersBtn.bind(this)}>
            <img className = "addUserIcon" src={addUserImage} alt="Smiley face"/>
            </span>
            {this.state.showAddTeam ?
              <div className="addMembers-Div">
                <input className="memberName" id="member" type="text" placeholder="add member" />
                <input className="button addMember" type="button" value="Add Member" onClick={this.addMembers.bind(this)} />
              </div> : ""
            }
            
            <button className="logout-button" onClick={this.logOut} type="button"> Log Out</button>
          </div>
        </div>
          
			{/* <div className = "addMembers" >

              <span className = "round-icon" type="button"  onClick={this.addMembers.bind(this)} >
                <img className = "addUserIcon" src={addUserImage} alt="Smiley face"/>

                <div className = "popUp">
                  <input className = "memberName" id="member" type="text" placeholder="add member"/>
            	    <input className = "button addMember" type="button" value="Add Member" onClick={this.addMembers.bind(this)} />
                </div>
              </span>


				<button className="logout-button" onClick={this.logOut} type = "button"> Log Out</button> 
		   </div> 

              
              
			  

          </div> */}
        {this.state.logoutStatus ?  <Redirect to = {
                        {
                            pathname: "/" 
                        }}/>:""} 
          {/* <div className="header"><span>Mentors Dashboard</span></div> */}
          {/* <div className="mentorName"> */}
            {/* <span className="mentor-name">{this.props.match.params.user}</span> */}
            
          {/* </div> */}
         
         <div className = "mentorBody">

          <div>

            {/* input task */}
            <div className = "assignForm">
              
              <input className="taskName" id="taskName" type="text" name="taskName"  placeholder="Enter a new task.." required />
              
              <input  className="date" id="date" type="date" name="date" required/>
                            
              <Select required
                className = "teamMember"
                name="teamMember"
                id="selectedMember"
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.mem}
              />

              <input className="assignTask" type="button" value="Assign Task" onClick={this.handleSubmit.bind(this)} />
            
            </div>
            {/* end of input task */}

          </div>


         {/*listsSection */}
          <div className="listsSectionContainer">
            <div className="listsSection">
              <div className="listHeadings">
                <div className="listHeading">Assigned Tasks</div>
                <div className="listHeading">Tasks ready for review</div>
              </div>

            <div className="lists">
              <div className="tasksContainer">
                  <ShowTasks func={this.handleadd} show={this.state.show} editFunc={this. handleEdit} deleteFunc={this.handleDelete} 
                  mentor={this.props.match.params.user}/>

              </div>
                <div className="tasksContainer">
                <SubmittedTasks func={this.handleComplete} mentor={this.props.match.params.user}/>
                </div>
            </div>
            </div>
         </div>
         {/* End of listsSection */}

         </div>
        </div>
      )
    }
  }
  
  export default Mentor;