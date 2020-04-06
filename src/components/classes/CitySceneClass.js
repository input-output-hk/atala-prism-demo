import {
  Scene
} from 'three'

import BaseClass from './BaseClass'
// import DatGUIClass from './DatGUIClass'

class CitySceneClass extends BaseClass {
  init () {
    this.scene = new Scene()
    this.scene.position.y = this.config.scene.yOffset
    // const controls = DatGUIClass.getInstance().gui.addFolder('Scene')
    // controls.add(this.scene.position, 'y')

    super.init()
  }

  destroy () {
    this.scene.traverse(function (object) {
      if (object.geometry) {
        object.geometry.dispose()
      }
      if (object.material) {
        object.material.dispose()
      }
    })

    super.destroy()
  }
}

export default CitySceneClass
