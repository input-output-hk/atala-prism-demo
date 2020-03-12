import {
  Mesh,
  MeshLambertMaterial,
  BoxBufferGeometry
} from 'three'

// classes
import BaseClass from './BaseClass'
import CityClass from './CityClass'

class GroundClass extends BaseClass {
  init () {
    const geo = new BoxBufferGeometry(135, 1.0, 135)
    this.material = new MeshLambertMaterial({
      color: this.config.materials.groundColor,
      flatShading: true
    })

    // CityClass.getInstance().controls.addColor(this.config.materials, 'groundColor').name('Ground Color').onChange((color) => {
    //   this.material.color.set(color)
    // })

    this.mesh = new Mesh(geo, this.material)
    this.mesh.receiveShadow = true
    this.mesh.translateY(-0.5)
  }
}

export default GroundClass
