import {
  MeshPhongMaterial
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

// classes
import BaseClass from './BaseClass'
import LoadingManagerClass from './LoadingManagerClass'
import DatGUIClass from './DatGUIClass'

// models
import model from '../../assets/models/city.glb'

class CityClass extends BaseClass {
  init () {
    this.blades = []
    this.rotation = 0

    this.stepBuildings = []

    return new Promise((resolve, reject) => {
      let that = this

      this.GLTFLoader = new GLTFLoader(LoadingManagerClass.getInstance().loadingManager)
      // Configure and create Draco decoder.
      this.dracoLoader = new DRACOLoader()

      this.dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/')
      this.GLTFLoader.setDRACOLoader(this.dracoLoader)

      this.buildingMaterial = new MeshPhongMaterial({
        color: this.config.materials.buildingColor,
        flatShading: true
      })

      this.buildingHighlightMaterial = this.buildingMaterial.clone()
      this.buildingHighlightMaterial.color.set(this.config.materials.buildingHighlightColor)

      this.roadsMaterial = new MeshPhongMaterial({
        color: this.config.materials.roadsColor,
        flatShading: true
      })

      this.vehicleMaterial = new MeshPhongMaterial({
        color: this.config.materials.vehicleColor,

        flatShading: true
      })

      this.treeMaterial = new MeshPhongMaterial({
        color: this.config.materials.treeColor,

        flatShading: true
      })

      this.turbineMaterial = new MeshPhongMaterial({
        color: this.config.materials.turbineColor,
        flatShading: true
      })

      // this.controls = DatGUIClass.getInstance().gui.addFolder('Materials')
      // this.controls.addColor(this.config.materials, 'buildingColor').name('Building Color').onChange((color) => {
      //   this.buildingMaterial.color.set(color)
      // })

      // this.controls.addColor(this.config.materials, 'buildingHighlightColor').name('Building Highlight').onChange((color) => {
      //   this.buildingHighlightMaterial.color.set(color)
      // })

      // this.controls.addColor(this.config.materials, 'roadsColor').name('Road Color').onChange((color) => {
      //   this.roadsMaterial.color.set(color)
      // })
      // this.controls.addColor(this.config.materials, 'vehicleColor').name('Vehicle Color').onChange((color) => {
      //   this.vehicleMaterial.color.set(color)
      // })
      // this.controls.addColor(this.config.materials, 'treeColor').name('Tree Color').onChange((color) => {
      //   this.treeMaterial.color.set(color)
      // })
      // this.controls.addColor(this.config.materials, 'turbineColor').name('Turbine Color').onChange((color) => {
      //   this.turbineMaterial.color.set(color)
      // })

      this.GLTFLoader.load(
        model,
        function (gltf) {
          gltf.scene.children[0].children.forEach((object) => {
            object.receiveShadow = true
            object.castShadow = true

            object.material = this.buildingMaterial

            switch (object.name) {
              case 'trees':
              case 'trees1':
              case 'trees2':
              case 'trees3':
                object.children.forEach((treeParent) => {
                  treeParent.children.forEach((tree) => {
                    tree.material = this.treeMaterial
                    tree.receiveShadow = true
                    tree.castShadow = true

                    // tree.children[1].material = this.roadsMaterial
                    // tree.children[1].receiveShadow = true
                    // tree.children[1].castShadow = true
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
              case 'building_med2':
                this.stepBuildings[0] = object
                break
              case 'building_wide1':
                this.stepBuildings[1] = object
                break
              case 'building_med':
                this.stepBuildings[2] = object
                break
              case 'building_med6':
                this.stepBuildings[3] = object
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
