import {
  BufferGeometry,
  Line,
  CubicBezierCurve3,
  LineDashedMaterial,
  Group
} from 'three'

import { gsap } from 'gsap'

// classes
import BaseClass from './BaseClass'
import StepIconClass from './StepIconClass'
import UserIconClass from './UserIconClass'
import CityClass from './CityClass'

import StepClass from './StepClass'

class SplineClass extends BaseClass {
  init (step = 0) {
    this.tl = gsap.timeline()

    this.pointCount = 20
    this.geometries = []
    this.lines = []

    this.material = new LineDashedMaterial({
      color: this.config.materials.stepIconColor,
      dashSize: 1,
      gapSize: 0.8
    })

    this.visitedMaterial = new LineDashedMaterial({
      color: 0x777777,
      dashSize: 1,
      gapSize: 0.8
    })

    this.mesh = new Group()

    for (let index = 0; index < StepClass.getInstance().steps; index++) {
      let start
      if (index === 0) {
        start = UserIconClass.getInstance().icons['user'].position
      } else {
        start = StepIconClass.getInstance().icons[this.config.steps[index - 1]].position
      }

      const end = StepIconClass.getInstance().icons[this.config.steps[index]].position

      const midYAmount = 70

      const mid1 = start.clone()
      mid1.y = midYAmount

      const mid2 = end.clone()
      mid2.y = midYAmount

      const curve = new CubicBezierCurve3(
        start,
        mid1,
        mid2,
        end
      )

      const points = curve.getPoints(this.pointCount)
      this.geometries[index] = new BufferGeometry().setFromPoints(points)
      this.geometries[index].setDrawRange(0, 0)

      this.lines[index] = new Line(this.geometries[index], this.material)
      this.lines[index].computeLineDistances()

      this.mesh.add(this.lines[index])
    }

    StepClass.getInstance().on('setStep', (data) => {
      this.setStep(data.step)
    })

    StepClass.getInstance().on('reset', (data) => {
      this.reset()
    })
  }

  reset () {
    this.tl.kill()

    for (let index = 0; index < StepClass.getInstance().steps; index++) {
      this.geometries[index].drawRange.count = 0
      CityClass.getInstance().stepBuildings[index].material = CityClass.getInstance().buildingMaterial.clone()
    }

    for (let index = 0; index < this.lines.length; index++) {
      this.lines[index].material = this.material.clone()
    }
  }

  setStep (step) {
    this.tl = gsap.timeline()

    for (let index = 0; index < this.lines.length; index++) {
      this.lines[index].material = this.visitedMaterial.clone()
    }

    for (let index = 0; index < step; index++) {
      if (this.geometries[index].drawRange.count >= this.pointCount) {
        continue
      }

      this.lines[index].material = this.material.clone()

      let params = {
        drawRange: 0
      }

      for (let stepIndex = 1; stepIndex <= StepClass.getInstance().steps; stepIndex++) {
        CityClass.getInstance().stepBuildings[stepIndex - 1].material = CityClass.getInstance().buildingMaterial.clone()
      }
      this.tl.to(params, {
        drawRange: 50,
        duration: 2,
        ease: 'none',
        onUpdate: function () {
          this.geometries[index].setDrawRange(0, params.drawRange)
        }.bind(this),
        onComplete: function () {
          if (step === index + 1) {
            CityClass.getInstance().stepBuildings[index].material = CityClass.getInstance().buildingHighlightMaterial.clone()
          }
        }
      }
      )
    }
  }
}

export default SplineClass
