
import React, { Component } from 'react'
import AtalaPrismDemo from '../../src/components/AtalaPrismDemo'

class App extends Component {
  // componentDidMount () {
  //   window.addEventListener('click', () => {
  //     this.refs.demo.incrementStep()
  //   })
  // }

  render () {
    return (
      <AtalaPrismDemo ref='demo' />
    )
  }
}

export default App
