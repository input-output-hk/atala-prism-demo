import {
  PointLight,
  PointLightHelper
} from 'three'

import BaseClass from './BaseClass'

class PointLightClass extends BaseClass {
  init () {
    this.light = new PointLight(0xffffff, 0.6)
    this.light.position.set(100, 100, 0)
    // this.light.castShadow = true

    this.light.shadow.mapSize.width = 4096 // default
    this.light.shadow.mapSize.height = 4096 // default
    // this.light.shadow.camera.near = 0.5 // default
    // this.light.shadow.camera.far = 5000 // default

    this.lightHelper = new PointLightHelper(this.light, 10)

    super.init()
  }
}

export default PointLightClass
