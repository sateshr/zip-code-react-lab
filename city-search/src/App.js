import React, { Component } from 'react';
import './App.css';

function CitySearchField(props){
  return(
    <div className="container">
      <div className="row justify-content-center mt-4 mb-2">
        <div className="col-4 text-center">
          <label>
            City:
            <input type="text" onChange={props.cityChanged}/>
          </label>
        </div>
      </div>
      <div className="row justify-content-center mb-2">
        <div className="col-4 text-center">
            <button onClick={props.searchCity}>Search</button>
        </div>
      </div>
    </div>
  );
}

function ZipCodes(props){
  return(
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4 card pl-0 pr-0 mb-3 bg-light text-center">
          <p>{props.data}</p>
        </div>
      </div>
    </div>
  );
}

class App extends Component {
  state = {
    city: "",
    zipResults: [],
  }

  handleCityChange(e){
    const city = e.target.value.toUpperCase();
    this.setState({city: city});



  }

  handleSearchCity(e){
    fetch("http://ctp-zip-api.herokuapp.com/city/" + this.state.city)
    .then(res => res.json())
    .then(jsonData => {
      this.setState({
        zipResults: jsonData,
      })
    })
    .catch(err => {
      this.setState({zipResults: [] })
    })
  }

  render(){
    console.log(this.state.zipResults);
    return (
        <div className="App">
          <div className="App-header">
            <h2>City Search</h2>
          </div>
          <CitySearchField cityChanged={e => this.handleCityChange(e)} searchCity={e => this.handleSearchCity(e)} cityValue={this.state.city}/>
          <div>
            {this.state.zipResults.map(
              (item, index) => {return <ZipCodes data={item} key={index}/>}

            )};

          </div>
          
        </div>
        
    );
  }
}

export default App;
