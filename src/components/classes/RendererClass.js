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
      antialias: this.config.GPUTier.tier === 'GPU_DESKTOP_TIER_3',
      canvas: this.canvas,
      powerPreference: 'high-performance',
      alpha: true
    })

    
    this.renderer.shadowMap.enabled = this.config.GPUTier.tier === 'GPU_DESKTOP_TIER_3'
    this.renderer.shadowMap.type = PCFSoftShadowMap // default THREE.PCFShadowMap

    this.renderer.setClearColor(0xffffff, 0)

    super.init()
  }

  resize (width, height) {
    this.renderer.setSize(width, height, false)

    super.resize()
  }

  destroy () {
    this.renderer.dispose()

    super.destroy()
  }

  renderFrame ({ dt } = {}) {
    this.renderer.render(CitySceneClass.getInstance().scene, CameraClass.getInstance().camera)
  }
}

export default RendererClass
