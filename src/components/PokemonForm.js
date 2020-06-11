import React from 'react'
import { Form } from 'semantic-ui-react'

const POKE_URL = "http://localhost:3000/pokemon"

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(POKE_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        stats: [{value: this.state.hp, name: "hp"}],
        sprites: {
          front: this.state.frontUrl,
          back: this.state.backUrl
        }
      })
    })
      .then(resp => resp.json())
      .then(pokemon => {
        this.props.addPokemon(pokemon)
      })
  };

  render() {
    console.log(this.state)
    const {name, hp, frontUrl, backUrl} = this.state
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input 
              fluid label="Name" 
              placeholder="Name" 
              name="name" 
              value={name} 
              onChange={this.handleChange}
            />
            <Form.Input 
              fluid label="hp" 
              placeholder="hp" 
              name="hp" 
              value={hp} 
              onChange={this.handleChange}
            />
            <Form.Input 
              fluid label="Front Image URL" 
              placeholder="url"   
              name="frontUrl" 
              value={frontUrl} 
              onChange={this.handleChange}
            />
            <Form.Input 
              fluid label="Back Image URL" 
              placeholder="url" 
              name="backUrl" 
              value={backUrl} 
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
