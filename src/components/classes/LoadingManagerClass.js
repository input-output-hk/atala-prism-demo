import {
  LoadingManager
} from 'three'

import BaseClass from './BaseClass'

class LoadingManagerClass extends BaseClass {
  init () {
    this.loadingManager = new LoadingManager()
  }
}

export default LoadingManagerClass
