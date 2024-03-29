import {
  WebGLRenderer,
  PCFSoftShadowMap
} from 'three'

import BaseClass from './BaseClass'
import CitySceneClass from './CitySceneClass'
import CameraClass from './CameraClass'

class RendererClass extends BaseClass {
  init () {
    this.canvas = document.querySelector('#' + this.config.scene.canvasID)
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      powerPreference: 'high-performance',
      alpha: true
    })

    this.renderer.shadowMap.enabled = this.config.GPUTier.tier === 3
    this.renderer.shadowMap.type = PCFSoftShadowMap

    this.renderer.setClearColor(0xffffff, 0)

    super.init()
  }

  resize (width, height) {
    this.renderer.setSize(width, height, false)

    super.resize()
  }

  destroy () {
    if (this.renderer) {
      this.renderer.dispose()
    }

    super.destroy()
  }

  renderFrame ({ dt } = {}) {
    this.renderer.render(CitySceneClass.getInstance().scene, CameraClass.getInstance().camera)
  }
}

export default RendererClass
