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
// import DatGUIClass from './DatGUIClass'
// import RayCasterClass from './RayCasterClass'

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

      this.icons = {
        'user': {
          url: imageUser,
          position: new Vector3(26, 17, 55.2)
        }
      }

      const promises = Object.keys(this.icons).map(key => {
        return loadImage(this.icons[key].url).then(texture => {
          texture.flipY = false
          texture.anisotropy = RendererClass.getInstance().renderer.capabilities.getMaxAnisotropy()
          this.icons[key].texture = texture
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

            for (const key in this.icons) {
              const iconMesh = mesh.clone()
              iconMesh.material = this.material.clone()

              iconMesh.material.map = this.icons[key].texture

              iconMesh.position.x = this.icons[key].position.x
              iconMesh.position.y = this.icons[key].position.y
              iconMesh.position.z = this.icons[key].position.z

              // const controls = DatGUIClass.getInstance().gui.addFolder(key + ' Position')
              // controls.add(iconMesh.position, 'x').name('x')
              // controls.add(iconMesh.position, 'y').name('y')
              // controls.add(iconMesh.position, 'z').name('z')

              // RayCasterClass.getInstance().intersects.push(iconMesh) // test mouse ray intersection on these objects

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
