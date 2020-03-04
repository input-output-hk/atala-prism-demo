import {
  Color,
  MeshStandardMaterial
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// classes
import BaseClass from './BaseClass'
import LoadingManagerClass from './LoadingManagerClass'

// models
// import model from '../../assets/models/city.glb'
import model from '../../assets/models/city.glb'

class CityClass extends BaseClass {
  init () {
    this.blades = []
    this.rotation = 0
    return new Promise((resolve, reject) => {
      let that = this

      this.GLTFLoader = new GLTFLoader(LoadingManagerClass.getInstance().loadingManager)

      const buildingMaterial = new MeshStandardMaterial({
        color: new Color(0xe8f3ff),
        roughness: 0.6,
        metalness: 0.2,
        flatShading: true
      })

      const roadsMaterial = new MeshStandardMaterial({
        color: new Color(0xaaaaaa),
        roughness: 0.6,
        metalness: 0.2,
        flatShading: true
      })

      const vehicleMaterial = new MeshStandardMaterial({
        color: new Color(0xe4c2fc),
        roughness: 0.6,
        metalness: 0.2,
        flatShading: true
      })

      const treeMaterial = new MeshStandardMaterial({
        color: new Color(0x9efe59),
        roughness: 0.6,
        metalness: 0.2,
        flatShading: true
      })

      const turbineMaterial = new MeshStandardMaterial({
        color: new Color(0xffffff),
        roughness: 0.6,
        metalness: 0.2,
        flatShading: true
      })

      this.GLTFLoader.load(
        model,
        function (gltf) {
          gltf.scene.children[0].children.forEach((object) => {
            object.receiveShadow = true
            object.castShadow = true

            // console.log(object.name)
            switch (object.name) {
              case 'trees':
              case 'trees1':
              case 'trees2':
              case 'trees3':
                object.children.forEach((treeParent) => {
                  treeParent.children.forEach((tree) => {
                    tree.children[0].material = treeMaterial
                    tree.children[0].receiveShadow = true
                    tree.children[0].castShadow = true

                    tree.children[1].material = roadsMaterial
                    tree.children[1].receiveShadow = true
                    tree.children[1].castShadow = true
                  })
                })
                break
              case 'bus':
                object.material = vehicleMaterial
                break
              case 'car':
                object.material = vehicleMaterial
                break
              case 'roads':
                object.translateY(0.15)
                object.material = roadsMaterial
                break
              case 'turbine_blades':
              case 'turbine_blades1':
                object.children.forEach((turbine) => {
                  turbine.children.forEach((part) => {
                    console.log(part)

                    that.blades.push(part)
                    part.material = turbineMaterial
                    part.receiveShadow = true
                    part.castShadow = true
                  })
                })

                break
              case 'turbine_bases':
              case 'turbine_bases1':
                object.children.forEach((turbine) => {
                  turbine.children.forEach((part) => {
                    part.material = turbineMaterial
                    part.receiveShadow = true
                    part.castShadow = true
                  })
                })

                break
              default:
                object.material = buildingMaterial
                break
            }
          })

          resolve(gltf.scene)
        }
      )
    }).catch((e) => {
      console.log(e)
    })
  }

  renderFrame ({ dt } = {}) {
    if (this.blades.length > 0) {
      this.blades.forEach((blade) => {
        blade.rotateX(dt)
      })
    }
  }
}

export default CityClass
