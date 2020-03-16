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
      rootCanvasID: 'atala-prism-demo-root',
      language: 'EN',
      scene: {
        yOffset: -8,
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
      steps: {
        0: 'gov',
        1: 'uni',
        2: 'job',
        3: 'insurance'
      },
      icons: {
        '5G': {
          description: {
            'EN': '5G'
          }
        },
        'wifi': {
          description: {
            'EN': 'WIFI'
          }
        },
        'garden': {
          description: {
            'EN': 'Roof Garden'
          }
        },
        'mobile': {
          description: {
            'EN': 'Mobile Technology'
          }
        },
        'solar': {
          description: {
            'EN': 'Solar Power'
          }
        },
        'wind': {
          description: {
            'EN': 'Wind Power'
          }
        },
        'traffic': {
          description: {
            'EN': 'Smart Traffic'
          }
        },
        'car': {
          description: {
            'EN': 'Electric Vehicles'
          }
        },
        'bike': {
          description: {
            'EN': 'Cycles'
          }
        },
        'cloud': {
          description: {
            'EN': 'Cloud Computing'
          }
        },
        'gov': {
          description: {
            'EN': 'Government Office'
          }
        },
        'uni': {
          description: {
            'EN': 'University'
          }
        },
        'job': {
          description: {
            'EN': 'Workplace'
          }
        },
        'insurance': {
          description: {
            'EN': 'Insurance'
          }
        }
      },
      post: {
        enabled: false,
        vignette: true,
        blendLighten: true,
        tranparentBackground: false,
        blendColor: new Color(0x000000)
      },
      camera: {
        fov: 10,
        stepPos: {
          0: { x: -402, y: 288, z: 456 },
          1: { x: -219.6231398964631, y: 338.36446318066953, z: 432.8956689575736 },
          2: { x: 457.2039744627395, y: 264.6829157617967, z: 416.4030257326514 },
          3: { x: -162.4305672283472, y: 308.0434839825085, z: 489.6855468333315 },
          4: { x: -250.7534177159783, y: 367.14339219223433, z: 385.84776091150013 }
        },
        stepControlsParams: {
          0: { maxAzimuthAngle: -0.5, minAzimuthAngle: -1.0 },
          1: { maxAzimuthAngle: 0.0, minAzimuthAngle: -0.5 },
          2: { maxAzimuthAngle: 1.0, minAzimuthAngle: 0.5 },
          3: { maxAzimuthAngle: -0.5, minAzimuthAngle: -1.0 },
          4: { maxAzimuthAngle: -0.5, minAzimuthAngle: -1.0 }
        },
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
