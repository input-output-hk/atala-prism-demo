import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import CameraClass from './CameraClass'
import RendererClass from './RendererClass'
import BaseClass from './BaseClass'
// import MouseClass from './MouseClass'

class ControlsClass extends BaseClass {
  init () {
    this.controls = new OrbitControls(CameraClass.getInstance().camera, RendererClass.getInstance().renderer.domElement.parentNode)
    this.controls.minDistance = 400
    this.controls.maxDistance = 700
    this.controls.enablePan = false
    this.controls.enableZoom = this.config.camera.enableZoom
    this.controls.zoomSpeed = 0.7
    this.controls.rotateSpeed = 0.45
    this.controls.autoRotateSpeed = 0.3
    this.controls.autoRotate = false
    this.controls.enableDamping = false
    this.controls.dampingFactor = 0.01
    this.controls.maxPolarAngle = (Math.PI / 2) - 0.1
    // this.controls.minPolarAngle = 1
    // this.controls.maxAzimuthAngle = -0.5
    // this.controls.minAzimuthAngle = -1.0

    // this.movementPaused = false
  }

  destroy () {
    this.controls.dispose()
    this.controls = null
  }

  renderFrame () {
    // if (this.movementPaused) {
    //   return
    // }
    this.controls.update()

    // if (this.controls) {
    //   if (CameraClass.getInstance().isAnimating) {
    //   } else {
    //     this.controls.update(MouseClass.getInstance().mousePos)
    //   }
    // }
  }
}

export default ControlsClass
