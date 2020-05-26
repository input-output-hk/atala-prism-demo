import {

} from 'three'

// classes
import BaseClass from './BaseClass'
import DatGUIClass from './DatGUIClass'

class StepClass extends BaseClass {
  init () {
    if (DatGUIClass.getInstance().debug) {
      this.controls = DatGUIClass.getInstance().gui.addFolder('Steps')
      this.controls.add(this, 'incrementStep')
      this.controls.open()
    }

    this.step = 0
    this.steps = 4
  }

  incrementStep () {
    if (this.isIncrementing) {
      return
    }

    this.isIncrementing = true
    this.step++
    this.setStep()
  }

  reset () {
    // if (this.isIncrementing) {
    //   return
    // }
    this.step = 0

    this.emit('reset')
  }

  setStep (step) {
    if (step) {
      this.step = step
    }

    if (this.step > this.steps) {
      this.step = this.steps
    }

    if (this.step < 0) {
      this.step = 0
    }

    this.emit('setStep', {
      step: this.step
    })

    this.isIncrementing = false
  }

  renderFrame ({ dt } = {}) {

  }
}

export default StepClass
