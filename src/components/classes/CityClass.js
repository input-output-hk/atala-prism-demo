import {
  Color,
  MeshStandardMaterial
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// classes
import BaseClass from './BaseClass'
import LoadingManagerClass from './LoadingManagerClass'
import DatGUIClass from './DatGUIClass'

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

      this.buildingMaterial = new MeshStandardMaterial({
        color: this.config.materials.buildingColor,
        roughness: 1.0,
        metalness: 0.0,
        flatShading: true

      })

      this.roadsMaterial = new MeshStandardMaterial({
        color: this.config.materials.roadsColor,
        roughness: 1.0,
        metalness: 0.0,
        flatShading: true
      })

      this.vehicleMaterial = new MeshStandardMaterial({
        color: this.config.materials.vehicleColor,
        roughness: 1.0,
        metalness: 0.0,
        flatShading: true
      })

      this.treeMaterial = new MeshStandardMaterial({
        color: this.config.materials.treeColor,
        roughness: 1.0,
        metalness: 0.0,
        flatShading: true
      })

      this.turbineMaterial = new MeshStandardMaterial({
        color: this.config.materials.turbineColor,
        roughness: 1.0,
        metalness: 0.0,
        flatShading: true
      })

      this.controls = DatGUIClass.getInstance().gui.addFolder('Materials')
      this.controls.addColor(this.config.materials, 'buildingColor').name('Building Color').onChange((color) => {
        this.buildingMaterial.color.set(color)
      })
      this.controls.add(this.buildingMaterial, 'roughness').name('Building Roughness')
      this.controls.add(this.buildingMaterial, 'metalness').name('Building Metalness')

      this.controls.addColor(this.config.materials, 'roadsColor').name('Road Color').onChange((color) => {
        this.roadsMaterial.color.set(color)
      })
      this.controls.addColor(this.config.materials, 'vehicleColor').name('Vehicle Color').onChange((color) => {
        this.vehicleMaterial.color.set(color)
      })
      this.controls.addColor(this.config.materials, 'treeColor').name('Tree Color').onChange((color) => {
        this.treeMaterial.color.set(color)
      })
      this.controls.addColor(this.config.materials, 'turbineColor').name('Turbine Color').onChange((color) => {
        this.turbineMaterial.color.set(color)
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
                    tree.children[0].material = this.treeMaterial
                    tree.children[0].receiveShadow = true
                    tree.children[0].castShadow = true

                    tree.children[1].material = this.roadsMaterial
                    tree.children[1].receiveShadow = true
                    tree.children[1].castShadow = true
                  })
                })
                break
              case 'bus':
                object.material = this.vehicleMaterial
                break
              case 'car':
                object.material = this.vehicleMaterial
                break
              case 'roads':
                object.material = this.roadsMaterial
                break
              case 'turbine_blades':
              case 'turbine_blades1':
                object.children.forEach((turbine) => {
                  turbine.children.forEach((part) => {
                    that.blades.push(part)
                    part.material = this.turbineMaterial
                    part.receiveShadow = true
                    part.castShadow = true
                  })
                })

                break
              case 'turbine_bases':
              case 'turbine_bases1':
                object.children.forEach((turbine) => {
                  turbine.children.forEach((part) => {
                    part.material = this.turbineMaterial
                    part.receiveShadow = true
                    part.castShadow = true
                  })
                })

                break
              // case 'panels':
              // case 'panels1':
              // case 'panels2':
              // case 'panels3':
              // case 'panels4':
              // case 'panels5':
              //   console.log(object)
              //   break
              default:
                object.material = this.buildingMaterial
                break
            }
          })

          resolve(gltf.scene)
        }.bind(this)
      )
    }).catch((e) => {
      console.log(e)
    })
  }

  renderFrame ({ dt } = {}) {
    if (this.blades.length > 0) {
      this.blades.forEach((blade, i) => {
        blade.rotateX(dt + (i * 0.001))
      })
    }
  }
}

export default CityClass
