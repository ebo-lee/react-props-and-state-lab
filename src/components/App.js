import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeFilters =(e) => {
    // method 1
    // let filters = {...this.state.filters}
    // filters.type = e.target.value
    // this.setState( {filters} )
    // method 2
    // debugger
    this.setState({
      filters: {...this.state.filters, type: e}
    })
  }

  fetchPets = () => {
    let petUrl = '/api/pets'
    if (this.state.filters.type !== 'all') {
      petUrl += `?type=${this.state.filters.type}`}

      fetch(petUrl)
        .then(response => response.json())
        .then(response => this.setState({
          pets: response }))
  }

  handleAdoptPet = (e) => {
    //let petToAdopt = this.state.pets.find( pet => pet.id === e );
    //petToAdopt.isAdopted = true
    // debugger
    const pets = this.state.pets.map( p => {
      return p.id === e ? {...p, isAdopted: true} : p
    })
    this.setState({ pets: pets})
    // method 2 - passing function instead of an object
    // this.setState((state) => ({pets: [...state.pets, pets]}))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                filters={this.state.filters}
                onChangeType={this.changeFilters} 
                onFindPetsClick={this.fetchPets} 
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                onAdoptPet={this.handleAdoptPet}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
