import {
  Mesh,
  MeshBasicMaterial,
  BoxBufferGeometry
} from 'three'

// classes
import BaseClass from './BaseClass'

class HighlightBuildingsClass extends BaseClass {
  init () {
    let height = 19.6

    this.geometry = new BoxBufferGeometry(6.4, height, 3.46)
    this.material = new MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.3,
      transparent: true
    })

    this.mesh = new Mesh(this.geometry, this.material)

    this.mesh.translateY(height / 2)
    this.mesh.translateZ(10.7)
    this.mesh.translateX(-9.2)
  }
}

export default HighlightBuildingsClass
