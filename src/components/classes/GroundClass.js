import {
  Mesh,
  MeshStandardMaterial,
  BoxBufferGeometry
} from 'three'

// classes
import BaseClass from './BaseClass'

class GroundClass extends BaseClass {
  init () {
    const geo = new BoxBufferGeometry(135, 1.0, 135)
    const material = new MeshStandardMaterial({
      color: 0xb2d7ba,
      roughness: 0.6,
      metalness: 0.2,
      flatShading: true
    })

    this.mesh = new Mesh(geo, material)
    this.mesh.receiveShadow = true
    this.mesh.translateY(-0.5)
  }
}

export default GroundClass
