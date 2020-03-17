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
import RayCasterClass from './RayCasterClass'

// import DatGUIClass from './DatGUIClass'

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
    this.group = new Group()

    this.hoverColor = 0xc3e6f5

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

      this.icons = {
        '5gTall': {
          url: image5g,
          position: new Vector3(-6, 57, -21),
          description: this.config.icons['5G'].description
        },
        '5gShort': {
          url: image5g,
          position: new Vector3(11, 29, 8),
          description: this.config.icons['5G'].description
        },
        'wifi1': {
          url: imageWifi,
          position: new Vector3(-37.7, 19, -6),
          description: this.config.icons['wifi'].description
        },
        'wifi2': {
          url: imageWifi,
          position: new Vector3(-37.7, 19, 8.5),
          description: this.config.icons['wifi'].description
        },
        'garden': {
          url: imageGarden,
          position: new Vector3(-38.5, 24, -19.1),
          description: this.config.icons['garden'].description
        },
        'mobile': {
          url: imageMobile,
          position: new Vector3(-35, 4, 34),
          description: this.config.icons['mobile'].description
        },
        'solar': {
          url: imageSolar,
          position: new Vector3(-44, 4, 53),
          description: this.config.icons['solar'].description
        },
        'wind': {
          url: imageWind,
          position: new Vector3(-15, 13, 56),
          description: this.config.icons['wind'].description
        },
        'traffic': {
          url: imageTraffic,
          position: new Vector3(16, 4, 21),
          description: this.config.icons['traffic'].description
        },
        'car': {
          url: imageCar,
          position: new Vector3(-30, 4, 18),
          description: this.config.icons['car'].description
        },
        'bike': {
          url: imageBike,
          position: new Vector3(18, 4, 57),
          description: this.config.icons['bike'].description
        },
        'cloud': {
          url: imageCloud,
          position: new Vector3(12, 45.5, -7),
          description: this.config.icons['cloud'].description
        }
      }

      const promises = Object.keys(this.icons).map(key => {
        return loadImage(this.icons[key].url).then(texture => {
          texture.flipY = false
          texture.anisotropy = RendererClass.getInstance().renderer.getMaxAnisotropy()
          texture.wrapS = MirroredRepeatWrapping
          texture.repeat.set(2, 2)
          texture.offset.y = -1
          this.icons[key].texture = texture
        })
      })

      Promise.all(promises).then(() => {
        this.GLTFLoader.load(
          model,
          function (gltf) {
            const mesh = gltf.scene.children[0]

            mesh.rotateX(Math.PI / 2)
            mesh.rotateZ(Math.PI / 2)
            mesh.scale.set(2.1, 0.8, 2.1)

            for (const key in this.icons) {
              mesh.material = this.material.clone()
              const iconMesh = mesh.clone()

              iconMesh.description = this.icons[key].description[this.config.language]
              iconMesh.hoverColor = this.hoverColor

              iconMesh.material.map = this.icons[key].texture

              iconMesh.position.x = this.icons[key].position.x
              iconMesh.position.y = this.icons[key].position.y
              iconMesh.position.z = this.icons[key].position.z

              // const controls = DatGUIClass.getInstance().gui.addFolder(key + ' Position')
              // controls.add(iconMesh.position, 'x').name('x')
              // controls.add(iconMesh.position, 'y').name('y')
              // controls.add(iconMesh.position, 'z').name('z')

              RayCasterClass.getInstance().intersects.push(iconMesh) // test mouse ray intersection on these objects

              this.group.add(iconMesh)
            }

            resolve(this.group)
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
