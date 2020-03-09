import {
  TextureLoader,
  MeshToonMaterial,
  Group,
  Vector3
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// classes
import BaseClass from './BaseClass'
import LoadingManagerClass from './LoadingManagerClass'
import RendererClass from './RendererClass'
import DatGUIClass from './DatGUIClass'

// models
import model from '../../assets/models/user-icon.glb'

// textures
import imageUser from '../../assets/textures/user.png'

class UserIconClass extends BaseClass {
  init () {
    return new Promise((resolve, reject) => {
      this.GLTFLoader = new GLTFLoader(LoadingManagerClass.getInstance().loadingManager)
      this.imageLoader = new TextureLoader(LoadingManagerClass.getInstance().loadingManager)

      this.material = new MeshToonMaterial({
        flatShading: false
      })

      let that = this
      function loadImage (url) {
        return new Promise(resolve => {
          that.imageLoader.load(url, resolve)
        })
      }

      const icons = {
        'user': {
          url: imageUser,
          position: new Vector3(26, 17, 55.2)
        }
      }

      const promises = Object.keys(icons).map(key => {
        return loadImage(icons[key].url).then(texture => {
          texture.flipY = false
          texture.anisotropy = RendererClass.getInstance().renderer.getMaxAnisotropy()
          icons[key].texture = texture
        })
      })

      const group = new Group()

      Promise.all(promises).then(() => {
        this.GLTFLoader.load(
          model,
          function (gltf) {
            const mesh = gltf.scene.children[0]

            mesh.rotateZ(Math.PI)
            mesh.scale.set(0.9, 0.6, 0.9)

            for (const key in icons) {
              const iconMesh = mesh.clone()
              iconMesh.material = this.material.clone()

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

export default UserIconClass
