import {
  AmbientLight
} from 'three'

import BaseClass from './BaseClass'
import DatGUIClass from './DatGUIClass'

class AmbientLightClass extends BaseClass {
  init () {
    this.light = new AmbientLight(this.config.scene.ambientLightColor, this.config.scene.ambientLightIntensity)

    // const controls = DatGUIClass.getInstance().gui.addFolder('Ambient Light Controls')
    // controls.add(this.light, 'intensity').name('Intensity')
    // controls.addColor(this.config.scene, 'ambientLightColor').name('Color').onChange((color) => {
    //   this.light.color.set(color)
    // })

    super.init()
  }
}

export default AmbientLightClass
