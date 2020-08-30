import React, { Component } from 'react'
import axios from 'axios';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [
      ],
      searchField: ''
    }

  }
  
  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then(response => response.json())
    // .then(users => this.setState({ monsters: users}))
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => this.setState({monsters: response.data}))
    .catch(err => console.log(err));
  }
  
  handleChange = (e) => {
    this.setState({ searchField: e.target.value})
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox 
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} searchField={searchField}/> 
      </div>
    );
  }
}

export default App;
