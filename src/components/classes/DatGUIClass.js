
import * as dat from 'dat.gui'

import BaseClass from './BaseClass'

class DatGUIClass extends BaseClass {
  init () {
    this.gui = new dat.GUI({ width: 300 })

    super.init()
  }
}

export default DatGUIClass
