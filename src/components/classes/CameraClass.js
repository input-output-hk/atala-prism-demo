import {
  PerspectiveCamera,
  Vector3
} from 'three'

import BaseClass from './BaseClass'
import StepClass from './StepClass'
import ControlsClass from './ControlsClass'

import { gsap } from 'gsap'

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

      const newControlsParams = this.config.camera.stepControlsParams[data.step]

      const params = {
        camPos: this.camera.position,
        maxAzimuthAngle: ControlsClass.getInstance().controls.maxAzimuthAngle,
        minAzimuthAngle: ControlsClass.getInstance().controls.minAzimuthAngle
      }

      gsap.to(params, {
        campos: {
          x: newCamPos.x,
          y: newCamPos.y,
          z: newCamPos.z
        },
        maxAzimuthAngle: newControlsParams.maxAzimuthAngle,
        minAzimuthAngle: newControlsParams.minAzimuthAngle,
        duration: 2,
        ease: 'sine.out',
        onUpdate: function () {
          this.camera.position.x = params.camPos.x
          this.camera.position.y = params.camPos.y
          this.camera.position.z = params.camPos.z

          ControlsClass.getInstance().controls.maxAzimuthAngle = params.maxAzimuthAngle
          ControlsClass.getInstance().controls.minAzimuthAngle = params.minAzimuthAngle

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
