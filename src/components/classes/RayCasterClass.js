import {
  Raycaster,
  Quaternion
} from 'three'

import { gsap } from 'gsap'

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

    if (intersected.length === this.intersects.length) {
      return
    }

    // this.intersects.forEach((object) => {
    //   object.material.color.set(0xffffff)
    // })

    if (intersected.length > 0) {
      this.mouseOver = true

      document.body.style.cursor = 'pointer'

      this.hovered = intersected[0].object

      intersected[0].object.isHovered = true
      intersected[0].object.isAnimating = true

      intersected[0].object.material.color.set(intersected[0].object.hoverColor)

      const rotationObject = intersected[0].object.clone()

      rotationObject.quaternion.copy(CameraClass.getInstance().camera.quaternion)
      rotationObject.rotateX(Math.PI / 2)

      const moveQuaternion = new Quaternion()
      const fromQuaternion = intersected[0].object.quaternion.clone()

      const params = {
        rotationAmount: 0
      }

      this.isAnimating = true

      gsap.to(params, {
        rotationAmount: 1,
        duration: 0.1,
        ease: 'sine.out',
        onUpdate: function () {
          Quaternion.slerp(fromQuaternion, rotationObject.quaternion, moveQuaternion, params.rotationAmount)
          intersected[0].object.quaternion.set(moveQuaternion.x, moveQuaternion.y, moveQuaternion.z, moveQuaternion.w)
        }
      })

      setTimeout(() => {
        intersected[0].object.isAnimating = false
      }, 100)
    } else {
      this.intersects.forEach((object) => {
        if (object.isHovered && object.isAnimating === false) {
          object.material.color.set(0xffffff)

          const rotationObject = object.clone()

          rotationObject.quaternion.copy(object.initialQuat)

          const moveQuaternion = new Quaternion()
          const fromQuaternion = object.quaternion.clone()

          const params = {
            rotationAmount: 0
          }

          gsap.to(params, {
            rotationAmount: 1,
            duration: 0.1,
            ease: 'sine.out',
            onUpdate: function () {
              Quaternion.slerp(fromQuaternion, rotationObject.quaternion, moveQuaternion, params.rotationAmount)
              object.quaternion.set(moveQuaternion.x, moveQuaternion.y, moveQuaternion.z, moveQuaternion.w)
            },
            onComplete: function () {
              object.isHovered = false
            }
          })
        }
      })
      if (this.mouseOver) {
        document.body.style.cursor = 'default'

        this.emit('iconMouseOut', {})

        this.mouseOver = false
      }
    }
  }
}

export default RayCasterClass
