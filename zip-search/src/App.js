import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-6 card pl-0 pr-0 mb-3">
        <div className="card-header">
          <h3>{props.data.City}, {props.data.State}</h3>
        </div>
        <div className="card-body">
          <ul>
            <li>State:  {props.data.State}</li>
            <li>Location: ({props.data.Lat}, {props.data.Long})</li>
            <li>Population (estimated): {props.data.EstimatedPopulation}</li>
            <li> Total Wages: {props.data.TotalWages}</li>
          </ul>
        </div>
      </div>
      </div>
  </div>
  );
}

function ZipSearchField(props) {
  return (
  <div className="container">
    <div className="row justify-content-center mt-4 mb-2">
      <div className="col-6">  
        <label>
          Zip Code:
          <input type="text" onChange={props.zipChanged} value={props.zipValue}/>
        </label>
      </div>
    </div>
  </div>);
}

class App extends Component {
  state = {
    inputZip: "",
    cityResults: [],
  }

  handleZipChange(event){
    this.setState({inputZip: event.target.value});
    if(event.target.value.length === 5){
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          cityResults: jsonData,
        })
      })
      .catch(err => {
        this.setState({cityResults: [] })
      })
    }
    else{
      this.setState({cityResults: []});
    }
  }

  render() {
    console.log(this.state.cityResults);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.inputZip}/>
        <div>
          {this.state.cityResults.map(
            (item, index) => {return <City data={item} key={index}/>;}
          )}
        </div>
      </div>
    );
  }
}

export default App;
