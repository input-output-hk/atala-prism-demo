import {
  Raycaster
} from 'three'

import BaseClass from './BaseClass'
import MouseClass from './MouseClass'
import CameraClass from './CameraClass'
import ControlsClass from './ControlsClass'

class RayCasterClass extends BaseClass {
  init () {
    this.raycaster = new Raycaster()
    this.hovered = null
    this.intersects = [] // array of objects to test ray intersection
  }

  resize (width, height) {

  }

  onMouseDown (e) {
    if (!this.hovered) {
      return
    }

    this.emit('iconClick', {
      'description': this.hovered.description
    })
  }

  renderFrame ({ dt } = {}) {
    this.hovered = null

    this.raycaster.setFromCamera(MouseClass.getInstance().ndc, CameraClass.getInstance().camera)

    const intersected = this.raycaster.intersectObjects(this.intersects)

    this.intersects.forEach((object) => {
      object.material.color.set(0xffffff)
    })

    if (intersected.length > 0) {
      ControlsClass.getInstance().movementPaused = true

      document.body.style.cursor = 'pointer'
    } else {
      ControlsClass.getInstance().movementPaused = false
      document.body.style.cursor = 'default'
    }

    for (var i = 0; i < intersected.length; i++) {
      intersected[i].object.material.color.set(0xff0000)
      this.hovered = intersected[i].object
    }
  }
}

export default RayCasterClass
