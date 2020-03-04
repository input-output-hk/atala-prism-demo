import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import CameraClass from './CameraClass'
import RendererClass from './RendererClass'
import BaseClass from './BaseClass'

class ControlsClass extends BaseClass {
  init () {
    this.controls = new OrbitControls(CameraClass.getInstance().camera, RendererClass.getInstance().renderer.domElement.parentNode)
    this.controls.minDistance = 250
    this.controls.maxDistance = 450
    // this.controls.maxDistance = 1500
    this.controls.enablePan = false
    this.controls.enableZoom = this.config.camera.enableZoom
    this.controls.zoomSpeed = 0.7
    this.controls.rotateSpeed = 0.55
    this.controls.autoRotateSpeed = 0.3
    this.controls.autoRotate = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.01
    this.controls.maxPolarAngle = (Math.PI / 2) - 0.1
    super.init()
  }

  destroy () {
    this.controls.dispose()
    super.destroy()
  }

  renderFrame () {
    this.controls.update()
    super.renderFrame()
  }
}

export default ControlsClass
