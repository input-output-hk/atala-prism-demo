import {
  HalfFloatType,
  FloatType,
  Color
} from 'three'

import Detector from '../libs/Detector'

class Config {
  constructor () {
    if (!Config.instance) {
      this.init()
      Config.instance = this
    }

    return Config.instance
  }

  init () {
    this.data = {
      scene: {
        yOffset: -4.7,
        fullScreen: true,
        width: window.innerWidth,
        height: window.innerHeight,
        bgColor: new Color(0x000000),
        canvasID: 'stage', // ID of webgl canvas element
        spotLightColor: 0xdaebfe,
        ambientLightColor: 0xd8efff,
        ambientLightIntensity: 0.72
      },
      materials: {
        buildingColor: 0xdde9ff,
        buildingHighlightColor: 0xef3b39,
        roadsColor: 0xaaaaaa,
        vehicleColor: 0xe4c2fc,
        treeColor: 0x9efe59,
        turbineColor: 0xffffff,
        groundColor: 0xc1deb8
      },
      post: {
        enabled: false,
        vignette: true,
        blendLighten: true,
        tranparentBackground: false,
        blendColor: new Color(0x000000) // 121326
      },
      camera: {
        fov: 20,
        initPos: { x: -213.80052448436368, y: 153.17671206508584, z: 243.4827369448547 },
        near: 100,
        far: 1000,
        enableZoom: true // enable camera zoom on mousewheel/pinch gesture
      },
      dev: {
        debugPicker: false
      },
      detector: Detector,
      floatType: Detector.isIOS ? HalfFloatType : FloatType
    }
  }

  get (id) {
    return this.data[id]
  }
}

const instance = new Config()
Object.freeze(instance)

export default Config
