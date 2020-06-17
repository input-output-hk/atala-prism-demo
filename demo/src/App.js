
import React, { Component } from 'react'
import AtalaPrismDemo from '../../src/components/AtalaPrismDemo'

class App extends Component {
  constructor () {
    super()

    this.state = {
      controlsEnabled: true
    }
  }

  // componentDidMount () {
  //   window.addEventListener('click', () => {
  //     this.setState({
  //       controlsEnabled: !this.state.controlsEnabled
  //     })
  //   })
  // }

  render () {
    return (
      <AtalaPrismDemo ref='demo' controlsEnabled={this.state.controlsEnabled} />
    )
  }
}

export default App
