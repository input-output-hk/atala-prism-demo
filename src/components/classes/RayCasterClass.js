import {
  Raycaster,
  Quaternion
} from 'three'

import { gsap } from 'gsap'

import BaseClass from './BaseClass'
import MouseClass from './MouseClass'
import CameraClass from './CameraClass'
import TouchClass from './TouchClass'
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

  onMouseDown (mouseEvent) {
    if (!this.hovered) {
      return
    }

    this.emit('iconClick', {
      'popupTitle': this.hovered.popupTitle,
      'category': this.hovered.category,
      'type': this.hovered.type,
      'description': this.hovered.description,
      'title': this.hovered.title,
      mouseEvent
    })
  }

  renderFrame ({ dt } = {}) {
    if (CameraClass.getInstance().isAnimating) {
      return
    }

    this.hovered = null

    if (this.config.detector.isMobile) {
      this.raycaster.setFromCamera(TouchClass.getInstance().ndc, CameraClass.getInstance().camera)
    } else {
      this.raycaster.setFromCamera(MouseClass.getInstance().ndc, CameraClass.getInstance().camera)
    }

    const intersected = this.raycaster.intersectObjects(this.intersects)

    if (intersected.length === this.intersects.length) {
      return
    }

    if (intersected.length > 0) {
      if (intersected[0].object.popupActive) {
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
            moveQuaternion.slerpQuaternions(fromQuaternion, rotationObject.quaternion, params.rotationAmount)
            intersected[0].object.quaternion.set(moveQuaternion.x, moveQuaternion.y, moveQuaternion.z, moveQuaternion.w)
          }
        })

        setTimeout(() => {
          intersected[0].object.isAnimating = false
        }, 100)
      }
    } else {
      this.intersects.forEach((object) => {
        if (object.isHovered && object.isAnimating === false) {
          object.material.color.set(this.config.materials.stepIconColor)

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
              moveQuaternion.slerpQuaternions(fromQuaternion, rotationObject.quaternion, params.rotationAmount)
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
