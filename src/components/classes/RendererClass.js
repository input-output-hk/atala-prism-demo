import {
  WebGLRenderer,
  PCFSoftShadowMap
} from 'three'

import BaseClass from './BaseClass'

class RendererClass extends BaseClass {
  init () {
    this.canvas = document.querySelector('#' + this.config.scene.canvasID)
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      powerPreference: 'high-performance',
      alpha: true,
      logarithmicDepthBuffer: true
    })

    this.renderer.shadowMap.enabled = true
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
}

export default RendererClass
