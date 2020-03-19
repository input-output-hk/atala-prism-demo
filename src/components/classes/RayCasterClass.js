import {
  Raycaster
} from 'three'

import BaseClass from './BaseClass'
import MouseClass from './MouseClass'
import CameraClass from './CameraClass'
// import ControlsClass from './ControlsClass'
// import DatGUIClass from './DatGUIClass'

class RayCasterClass extends BaseClass {
  init () {
    this.raycaster = new Raycaster()
    this.hovered = null
    this.intersects = [] // array of objects to test ray intersection

    this.mouseOver = false

    // this.hoverColor = 0xffc4c4
    // const controls = DatGUIClass.getInstance().gui.addFolder('Hover Colour')
    // controls.addColor(this, 'hoverColor').name('hoverColor')
  }

  resize (width, height) {

  }

  onMouseDown (mouseEvent) {
    if (!this.hovered) {
      return
    }

    this.emit('iconClick', {
      'description': this.hovered.description,
      mouseEvent
    })
  }

  renderFrame ({ dt } = {}) {
    if (CameraClass.getInstance().isAnimating) {
      return
    }

    this.hovered = null

    this.raycaster.setFromCamera(MouseClass.getInstance().ndc, CameraClass.getInstance().camera)

    const intersected = this.raycaster.intersectObjects(this.intersects)

    this.intersects.forEach((object) => {
      object.material.color.set(0xffffff)
    })

    if (intersected.length > 0) {
      this.mouseOver = true

      // ControlsClass.getInstance().movementPaused = true

      document.body.style.cursor = 'pointer'
    } else {
      if (this.mouseOver) {
        // ControlsClass.getInstance().movementPaused = false

        document.body.style.cursor = 'default'

        this.emit('iconMouseOut', {})

        this.mouseOver = false
      }
    }

    for (var i = 0; i < intersected.length; i++) {
      intersected[i].object.material.color.set(intersected[i].object.hoverColor)
      this.hovered = intersected[i].object
    }
  }
}

export default RayCasterClass
