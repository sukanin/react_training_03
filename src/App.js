import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] }
    //{title: 'title1', descr: 'descr1'}, {title: 'title1', descr: 'descr1'}

    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    axios.get('http://localhost:3001/api/incidents')
      .then( result => {
        this.setState({ data: result.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 2000);
  }

  render() {
    let output = this.state.data.map( x => {
      return (
        <p key={x._id}>{x.title}</p>
      );
    })
    return (
      <div className="App">
        { output }
      </div>
    );
  }
}

export default App;
