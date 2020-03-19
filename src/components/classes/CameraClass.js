import {
  PerspectiveCamera,
  Vector3
} from 'three'

import { gsap } from 'gsap'

import BaseClass from './BaseClass'
import StepClass from './StepClass'

class CameraClass extends BaseClass {
  init () {
    this.camera = new PerspectiveCamera(
      this.config.camera.fov,
      window.innerWidth / window.innerHeight,
      this.config.camera.near,
      this.config.camera.far
    )

    this.isAnimating = false

    this.camera.position.x = this.config.camera.stepPos[0].x
    this.camera.position.y = this.config.camera.stepPos[0].y
    this.camera.position.z = this.config.camera.stepPos[0].z

    this.camera.lookAt(new Vector3(0, 0, 0))
    this.camera.updateMatrixWorld()

    window.camera = this.camera

    StepClass.getInstance().on('setStep', (data) => {
      if (typeof this.config.camera.stepPos[data.step] === 'undefined') {
        return
      }

      const newCamPos = new Vector3(
        this.config.camera.stepPos[data.step].x,
        this.config.camera.stepPos[data.step].y,
        this.config.camera.stepPos[data.step].z
      )

      const params = {
        camPosX: this.camera.position.x,
        camPosY: this.camera.position.y,
        camPosZ: this.camera.position.z
      }

      gsap.to(params, {
        camPosX: newCamPos.x,
        camPosY: newCamPos.y,
        camPosZ: newCamPos.z,
        duration: 2,
        ease: 'sine.out',
        onUpdate: function () {
          this.camera.position.x = params.camPosX
          this.camera.position.y = params.camPosY
          this.camera.position.z = params.camPosZ

          this.camera.lookAt(new Vector3(0, 0, 0))

          this.isAnimating = true
        }.bind(this),
        onComplete: function () {
          this.isAnimating = false
        }.bind(this)
      })
    })
  }

  resize (width, height) {
    this.camera.aspect = width / height

    this.camera.updateProjectionMatrix()
    super.resize()
  }

  renderFrame ({ dt } = {}) {

  }
}

export default CameraClass
