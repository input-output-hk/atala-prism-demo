import {
  SpotLight,
  SpotLightHelper,
  CameraHelper
} from 'three'

import BaseClass from './BaseClass'
// import DatGUIClass from './DatGUIClass'

class SpotLightClass extends BaseClass {
  init () {
    this.light = new SpotLight(this.config.scene.spotLightColor, 0.6)
    this.light.position.set(160, 560, 226)
    this.light.castShadow = true
    this.light.angle = 0.16
    this.light.penumbra = 0.01
    this.light.target.position.set(0, 0, 0)
    this.light.shadow.mapSize.width = 2048
    this.light.shadow.mapSize.height = 2048
    this.light.shadow.bias = 0.000001
    this.lightHelper = new SpotLightHelper(this.light)

    this.light.shadow.camera.near = 100.5
    this.light.shadow.camera.far = 1000
    this.light.shadow.camera.fov = 10
    this.shadowHelper = new CameraHelper(this.light.shadow.camera)

    // controls
    // const controls = DatGUIClass.getInstance().gui.addFolder('Spot Light Controls')
    // controls.add(this.light, 'angle').name('Angle')
    // controls.add(this.light, 'intensity').name('Intensity')
    // controls.add(this.light.position, 'z').name('Z Pos')
    // controls.add(this.light.position, 'x').name('X Pos')
    // controls.add(this.light.position, 'y').name('Y Pos')
    // controls.add(this.light.position, 'z').name('Z Pos')
    // controls.addColor(this.config.scene, 'spotLightColor').name('Color').onChange((color) => {
    //   this.light.color.set(color)
    // })

    // controls.add(this.light.shadow.camera, 'near').name('Near').onChange(() => {
    //   this.light.shadow.camera.updateProjectionMatrix()
    // })
    // controls.add(this.light.shadow.camera, 'far').name('Far').onChange(() => {
    //   this.light.shadow.camera.updateProjectionMatrix()
    // })
    // controls.add(this.light.shadow.camera, 'fov').name('fov').onChange(() => {
    //   this.light.shadow.camera.updateProjectionMatrix()
    // })

    super.init()
  }

  // renderFrame () {
  // this.lightHelper.update()
  // this.shadowHelper.update()
  // }
}

export default SpotLightClass
