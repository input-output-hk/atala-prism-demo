
import * as dat from 'dat.gui'

import BaseClass from './BaseClass'

class DatGUIClass extends BaseClass {
  init (debug) {
    this.debug = debug

    if (this.debug) {
      this.gui = new dat.GUI({ width: 300 })
      // this.gui.close()
    }

    super.init()
  }
}

export default DatGUIClass
