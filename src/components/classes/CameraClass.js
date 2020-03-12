import {
  PerspectiveCamera,
  Vector3
} from 'three'

import BaseClass from './BaseClass'

class CameraClass extends BaseClass {
  init () {
    this.camera = new PerspectiveCamera(
      this.config.camera.fov,
      window.innerWidth / window.innerHeight,
      this.config.camera.near,
      this.config.camera.far
    )

    this.cameraInitPos = new Vector3()
    this.cameraInitPos.x = 0
    this.cameraInitPos.y = 500
    this.cameraInitPos.z = 300

    this.camera.position.x = this.config.camera.stepPos[0].x
    this.camera.position.y = this.config.camera.stepPos[0].y
    this.camera.position.z = this.config.camera.stepPos[0].z

    this.camera.lookAt(new Vector3(0, 0, 0))
    this.camera.updateMatrixWorld()

    window.camera = this.camera
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
