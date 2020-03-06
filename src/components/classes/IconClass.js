import {
  Color,
  TextureLoader,
  MeshToonMaterial,
  Group,
  Vector3,
  MirroredRepeatWrapping
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// classes
import BaseClass from './BaseClass'
import LoadingManagerClass from './LoadingManagerClass'
import RendererClass from './RendererClass'
import DatGUIClass from './DatGUIClass'

// models
import model from '../../assets/models/icon.glb'

// textures
import image5g from '../../assets/textures/5g.png'
import imageWifi from '../../assets/textures/wifi.png'
import imageGarden from '../../assets/textures/flower.png'
import imageMobile from '../../assets/textures/mobile.png'
import imageSolar from '../../assets/textures/solar.png'
import imageWind from '../../assets/textures/wind.png'
import imageTraffic from '../../assets/textures/traffic.png'
import imageCar from '../../assets/textures/car.png'
import imageBike from '../../assets/textures/bike.png'
import imageCloud from '../../assets/textures/cloud.png'

class IconClass extends BaseClass {
  init () {
    return new Promise((resolve, reject) => {
      this.GLTFLoader = new GLTFLoader(LoadingManagerClass.getInstance().loadingManager)
      this.imageLoader = new TextureLoader(LoadingManagerClass.getInstance().loadingManager)

      this.material = new MeshToonMaterial({
        color: new Color(0xffffff),
        emissive: new Color(0x000000),
        flatShading: false
      })

      let that = this
      function loadImage (url) {
        return new Promise(resolve => {
          that.imageLoader.load(url, resolve)
        })
      }

      const icons = {
        '5gTall': {
          url: image5g,
          position: new Vector3(-6, 57, -21)
        },
        '5gShort': {
          url: image5g,
          position: new Vector3(11, 29, 8)
        },
        'wifi1': {
          url: imageWifi,
          position: new Vector3(-37.7, 19, -6)
        },
        'wifi2': {
          url: imageWifi,
          position: new Vector3(-37.7, 19, 8.5)
        },
        'garden': {
          url: imageGarden,
          position: new Vector3(-38.5, 24, -19.1)
        },
        'mobile': {
          url: imageMobile,
          position: new Vector3(-35, 4, 34)
        },
        'solar': {
          url: imageSolar,
          position: new Vector3(-44, 4, 53)
        },
        'wind': {
          url: imageWind,
          position: new Vector3(-15, 13, 56)
        },
        'traffic': {
          url: imageTraffic,
          position: new Vector3(16, 4, 21)
        },
        'car': {
          url: imageCar,
          position: new Vector3(-30, 4, 18)
        },
        'bike': {
          url: imageBike,
          position: new Vector3(18, 4, 57)
        },
        'cloud': {
          url: imageCloud,
          position: new Vector3(12, 45.5, -7)
        }
      }

      const promises = Object.keys(icons).map(key => {
        return loadImage(icons[key].url).then(texture => {
          texture.flipY = false
          texture.anisotropy = RendererClass.getInstance().renderer.getMaxAnisotropy()
          texture.wrapS = MirroredRepeatWrapping
          texture.repeat.set(2, 2)
          texture.offset.y = -1
          icons[key].texture = texture
        })
      })

      const group = new Group()

      Promise.all(promises).then(() => {
        this.GLTFLoader.load(
          model,
          function (gltf) {
            const mesh = gltf.scene.children[0]

            mesh.rotateX(Math.PI / 2)
            mesh.rotateZ(Math.PI / 2)
            mesh.scale.set(2.1, 0.8, 2.1)

            for (const key in icons) {
              mesh.material = this.material.clone()
              const iconMesh = mesh.clone()

              iconMesh.material.map = icons[key].texture

              iconMesh.position.x = icons[key].position.x
              iconMesh.position.y = icons[key].position.y
              iconMesh.position.z = icons[key].position.z

              const controls = DatGUIClass.getInstance().gui.addFolder(key + ' Position')
              controls.add(iconMesh.position, 'x').name('x')
              controls.add(iconMesh.position, 'y').name('y')
              controls.add(iconMesh.position, 'z').name('z')

              group.add(iconMesh)
            }

            resolve(group)
          }.bind(this)
        )
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  renderFrame ({ dt } = {}) {

  }
}

export default IconClass
