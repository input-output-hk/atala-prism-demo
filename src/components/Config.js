import {
  HalfFloatType,
  FloatType,
  Color
} from 'three'

import Detector from '../libs/Detector'

import { getGPUTier } from 'detect-gpu'

class Config {
  constructor () {
    if (!Config.instance) {
      this.init()
      Config.instance = this
    }

    return Config.instance
  }

  init () {
    const GPUTier = getGPUTier()

    this.data = {
      rootID: 'atala-prism-demo-root',
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
      popupTitleSmartCity: {
        'EN': 'Smart City'
      },
      popupTitleCredentials: {
        'EN': 'Credentials'
      },
      icons: {
        '5G': {
          'EN': {
            title: '5G',
            description: '5G will deliver reliable data delivery which is the key to the future of citywide IoT systems.'
          }
        },
        'wifi': {
          'EN': {
            title: 'WiFi',
            description: 'Reliable WiFi will help bridge the digital divide and enable IoT-based smart cities.'
          }
        },
        'garden': {
          'EN': {
            title: 'Vertical Garden',
            description: 'As well as helping to counter pollution, they help insulate interiors from heat and cold and require less water than traditional gardens.'
          }
        },
        'mobile': {
          'EN': {
            title: 'Mobile technology',
            description: ''
          }
        },
        'solar': {
          'EN': {
            title: 'Solar power',
            description: 'Solar power as a renewable resource can provide reliable, affordable, and environmentally responsible energy.'
          }
        },
        'wind': {
          'EN': {
            title: 'Wind power',
            description: 'Wind power as a renewable resource can provide reliable, affordable, and environmentally responsible energy.'
          }
        },
        'traffic': {
          'EN': {
            title: 'Smart Traffic Light',
            description: 'Combines traditional traffic lights with an array of sensors and AI to intelligently route vehicle and pedestrian traffic.'
          }
        },
        'car': {
          'EN': {
            title: 'Electric Vehicles',
            description: 'Along with reducing transport emissions, EV’s will have a significant influence on infrastructure and smart city usecases.'
          }
        },
        'bike': {
          'EN': {
            title: 'Cycle Lanes',
            description: 'Cycling is the most efficient, effective, and economic method of personal transportation across an urban landscape.'
          }
        },
        'cloud': {
          'EN': {
            title: 'Cloud Computing',
            description: 'Cloud-based applications and services will have the capacity to reduce costs for citizens while delivering better service in an IoT-based smart city.'
          }
        },
        'gov': {
          'EN': {
            title: 'Metropol City Government',
            description: 'Metropol City Government uses Atala PRISM to issue verifiable digital IDs.'
          }
        },
        'uni': {
          'EN': {
            title: 'University of Innovation and Technology',
            description: 'University of Innovation and Technology uses Atala PRISM to issue degrees to its students.'
          }
        },
        'job': {
          'EN': {
            title: 'Decentralized  Inc.',
            description: 'Decentralized Inc. uses Atala PRISM in its hiring workflow to accept job applications and instantly verify applicant credentials.'
          }
        },
        'insurance': {
          'EN': {
            title: 'Verified Insurance Ltd.',
            description: 'Verified Insurance Ltd. uses Atala PRISM to issue health insurance certificates securely and confidentially'
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
      GPUTier: GPUTier,
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
