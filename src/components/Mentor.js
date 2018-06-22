import React, { Component } from 'react';
import ShowTasks from './ShowTasks';
import Autosuggest from 'react-autosuggest';
let temp='';

const teamMembers = [
    {
        name: 'megha'
    },
    {
        name: 'prabha'
    },
    {
        name: 'vignesh'
    },
    {
        name: 'vimal'
    }
  ];

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : teamMembers.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = suggestion => suggestion.name;
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );
class Mentor extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            member:''
          };
    }

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };

    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };

    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
      //Here you do whatever you want with the values
      console.log(suggestionValue);
      temp = suggestionValue;
      this.setState({
        member: temp,
        show:true
      })
  };
    
    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Add member',
            value,
            onChange: this.onChange,
            show: false
          };
          // let temp=(this.state.member);
           console.log(temp);
           let mem = "http://localhost:4000/mentor/task/create?member="+temp 
      return (
        <div className="container">
          <div className="header"><span>Mentors Dashboard</span></div>
          <div className="mentorName"><span>Hi Vignesh!</span></div>
          <div>
            <form method="post" action={mem}>
              <input className="taskName" type="text" name="taskName"  placeholder="Enter a new task.." />
              <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
      //   onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
      //     //Here you do whatever you want with the values
      //     alert(suggestionValue); //For example alert the selected value
      // };
        id="member"
        name="member"
      /> 
              <input className="submit" type="submit" value="submit" />
            </form>
          </div>
          <div className="lists">
            <div className="taskList">Assigned Tasks</div>
            <div className="review">Tasks ready for review</div>
          </div>
          <ShowTasks />
          {this.state.member ?<ShowTasks member={temp}/> : ""}
        </div>
      )
    }
  }
  
  export default Mentor;