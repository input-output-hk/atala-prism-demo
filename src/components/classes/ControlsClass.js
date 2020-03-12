import { OrbitControls } from '../../3rdParty/OrbitControls'

import CameraClass from './CameraClass'
import RendererClass from './RendererClass'
import BaseClass from './BaseClass'
import MouseClass from './MouseClass'

class ControlsClass extends BaseClass {
  init () {
    this.controls = new OrbitControls(CameraClass.getInstance().camera, RendererClass.getInstance().renderer.domElement.parentNode)
    this.controls.minDistance = 400
    this.controls.maxDistance = 700
    this.controls.enablePan = false
    this.controls.enableZoom = this.config.camera.enableZoom
    this.controls.zoomSpeed = 0.1
    this.controls.rotateSpeed = 0.55
    this.controls.autoRotateSpeed = 0.3
    this.controls.autoRotate = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.0008
    this.controls.maxPolarAngle = (Math.PI / 2) - 0.25
    this.controls.minPolarAngle = 1
    this.controls.maxAzimuthAngle = -0.5
    this.controls.minAzimuthAngle = -1.0
    super.init()
  }

  destroy () {
    this.controls.dispose()
    super.destroy()
  }

  renderFrame () {
    this.controls.update(MouseClass.getInstance().mousePos)
    super.renderFrame()
  }
}

export default ControlsClass
