
/* ------------------------------------------
3rd Party
------------------------------------------ */
import {
  Vector2
} from 'three'

/* ------------------------------------------
 Post
 ------------------------------------------ */
import { EffectComposer, ShaderPass, RenderPass, UnrealBloomPass } from '../../post/EffectComposer'
import BrightnessContrastShader from '../../post/BrightnessContrast'
import FXAAShader from '../../post/FXAAShader'
import BlendShader from '../../post/BlendLighten'
import VignetteShader from '../../post/Vignette'

/* ------------------------------------------
Classes
------------------------------------------ */
import BaseClass from './BaseClass'
import CityClass from './CityClass'
import CitySceneClass from './CitySceneClass'
import RendererClass from './RendererClass'
import CameraClass from './CameraClass'

/* ------------------------------------------
Shaders
------------------------------------------ */

class FBOClass extends BaseClass {
  init ({
    width,
    height,
    transparentBackground
  } = {}) {
    this.frame = 0
    this.width = width
    this.height = height

    this.composer = new EffectComposer(RendererClass.getInstance().renderer)

    this.renderPassMain = new RenderPass(CitySceneClass.getInstance().scene, CameraClass.getInstance().camera)
    this.composer.addPass(this.renderPassMain)

    this.BrightnessContrastPass = new ShaderPass(BrightnessContrastShader)
    // this.composer.addPass(this.BrightnessContrastPass)

    const alphaSum = transparentBackground ? 0.0 : 1.0

    this.bloomPass = new UnrealBloomPass(new Vector2(this.width, this.height), 0.5, 9, 0.5, alphaSum) // 1.0, 9, 0.5, 512);
    // this.composer.addPass(this.bloomPass)

    if (this.config.post.vignette) {
      this.VignettePass = new ShaderPass(VignetteShader)
      this.composer.addPass(this.VignettePass)
    }

    if (this.config.post.blendLighten && !transparentBackground) {
      this.BlendPass = new ShaderPass(BlendShader)
      this.BlendPass.material.uniforms['blendColor'].value = this.config.post.blendColor
      // this.composer.addPass(this.BlendPass)
    }

    this.FXAAPass = new ShaderPass(FXAAShader)
    this.FXAAPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth)
    this.FXAAPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight)
    this.FXAAPass.renderToScreen = true
    this.composer.addPass(this.FXAAPass)
  }

  resize (width, height) {
    this.composer.setSize(width, height)
    this.bloomPass.setSize(width, height)
    this.FXAAPass.material.uniforms[ 'resolution' ].value.x = 1 / (width)
    this.FXAAPass.material.uniforms[ 'resolution' ].value.y = 1 / (height)
    super.resize()
  }

  renderFrame (args) {
    // this.composer.render()
    RendererClass.getInstance().renderer.render(CitySceneClass.getInstance().scene, CameraClass.getInstance().camera)

    super.renderFrame()
  }
}

export default FBOClass
