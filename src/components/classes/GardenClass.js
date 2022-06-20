import {
  MeshLambertMaterial,
  Mesh,
  PlaneBufferGeometry,
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  LinearMipmapLinearFilter
} from 'three'

// classes
import BaseClass from './BaseClass'
import LoadingManagerClass from './LoadingManagerClass'

import gardenTexture from '../../assets/textures/garden.gif'

class GardenClass extends BaseClass {
  init () {
    return new Promise((resolve, reject) => {
      this.imageLoader = new TextureLoader(LoadingManagerClass.getInstance().loadingManager)

      this.imageLoader.loadAsync(gardenTexture).then((map) => {
        this.map = map

        this.map.wrapS = RepeatWrapping
        this.map.wrapT = RepeatWrapping
        this.map.repeat.set(6, 1)
        this.map.minFilter = LinearMipmapLinearFilter
        this.map.magFilter = NearestFilter
        this.map.rotation = Math.PI / 2

        const geo = new PlaneBufferGeometry(17, 9.5, 1, 1)
        geo.rotateX(-(Math.PI / 2))

        this.material = new MeshLambertMaterial({
          color: 0xffffff,
          map: this.map
        })

        this.mesh = new Mesh(geo, this.material)
        this.mesh.receiveShadow = true
        this.mesh.translateZ(-21.2)
        this.mesh.translateX(-42.2)
        this.mesh.translateY(19.9)

        resolve(this.mesh)
      })
    })
  }
}

export default GardenClass
