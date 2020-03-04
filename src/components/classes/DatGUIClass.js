
import * as dat from 'dat.gui'

import BaseClass from './BaseClass'

class DatGUIClass extends BaseClass {
  init () {
    this.gui = new dat.GUI()

    super.init()
  }
}

export default DatGUIClass
