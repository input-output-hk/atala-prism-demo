import {
  BufferGeometry,
  LineBasicMaterial,
  Line,
  Vector2,
  SplineCurve,
  Group
} from 'three'

// classes
import BaseClass from './BaseClass'

class SplineClass extends BaseClass {
  init () {
    let range = 1.2

    this.mesh = new Group()

    for (let index = 0; index < 20; index++) {
      // Create a sine-like wave
      var curve = new SplineCurve([
        new Vector2(-20.0625, 10.4714).addScalar(Math.random() * range - (range / 2)),
        new Vector2(-20.4737, 7.33255).addScalar(Math.random() * range - (range / 2)),
        new Vector2(-5.15353, 6.95135).addScalar(Math.random() * range - (range / 2)),
        new Vector2(16.141, 7.34971).addScalar(Math.random() * range - (range / 2)),
        new Vector2(17.1487, 0.28534).addScalar(Math.random() * range - (range / 2)),
        new Vector2(17.0351, -12.1843).addScalar(Math.random() * range - (range / 2)),
        new Vector2(12.0034, -12.2996).addScalar(Math.random() * range - (range / 2))
      ])

      var points = curve.getPoints(50)
      var geometry = new BufferGeometry().setFromPoints(points)

      var material = new LineBasicMaterial({ color: 0xff0000, opacity: 0.3, transparent: true })

      // Create the final object to add to the scene
      const mesh = new Line(geometry, material)
      mesh.rotateY(-Math.PI)
      mesh.rotateX(Math.PI / 2)
      mesh.translateZ(-1.5 * (Math.random() * 1.2))

      this.mesh.add(mesh)
    }
  }
}

export default SplineClass
