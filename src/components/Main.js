/* ------------------------------------------
3rd Party
------------------------------------------ */
import React, { Component } from 'react'
import {
  Clock
} from 'three'

import EventEmitter from 'eventemitter3'
import mixin from 'mixin'
import { getUrlParameter } from '../helpers/utility'

/* ------------------------------------------
Config
------------------------------------------ */
import Config from './Config'

/* ------------------------------------------
Classes
------------------------------------------ */
import LoadingManagerClass from './classes/LoadingManagerClass'
import RendererClass from './classes/RendererClass'
import FBOClass from './classes/FBOClass'
import CameraClass from './classes/CameraClass'
import ControlsClass from './classes/ControlsClass'
import MouseClass from './classes/MouseClass'
import TouchClass from './classes/TouchClass'
import AmbientLightClass from './classes/AmbientLightClass'
import SpotLightClass from './classes/SpotLightClass'
import SplineClass from './classes/SplineClass'
import GroundClass from './classes/GroundClass'
import CitySceneClass from './classes/CitySceneClass'
import CityClass from './classes/CityClass'
import IconClass from './classes/IconClass'
import StepIconClass from './classes/StepIconClass'
import UserIconClass from './classes/UserIconClass'
import DatGUIClass from './classes/DatGUIClass'
import StepClass from './classes/StepClass'
import RayCasterClass from './classes/RayCasterClass'

/* ------------------------------------------
Styles
------------------------------------------ */
import styles from './Main.css'

class Main extends mixin(EventEmitter, Component) {
  constructor (props) {
    super(props)

    this.config = new Config().data
    this.clock = new Clock()

    this.initLoader()

    this.itemsToLoad = 25 // TODO: this better

    this.state = {
      loaded: false,
      itemsLoaded: 0,
      itemsTotal: 0,
      infoText: '',
      showInfoBox: false,
      infoBoxPosition: { x: -999, y: -999 }
    }

    this.root = document.getElementById(this.config.rootCanvasID)

    window.atalaPrismDemo = this
  }

  initLoader () {
    LoadingManagerClass.getInstance().init()

    LoadingManagerClass.getInstance().loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
      // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }

    // LoadingManagerClass.getInstance().loadingManager.onLoad = function () {
    // this.setState({
    //   loaded: true
    // })

    // console.log('Loading complete!')
    // }.bind(this)

    LoadingManagerClass.getInstance().loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      this.setState({
        itemsTotal: itemsTotal,
        itemsLoaded: itemsLoaded
      })

      if (itemsLoaded === this.itemsToLoad) {
        this.setState({
          loaded: true
        })
      }

      // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }.bind(this)

    LoadingManagerClass.getInstance().loadingManager.onError = function (url) {
      console.log('There was an error loading ' + url)
    }
  }

  componentDidMount () {
    this.initStage()
  }

  setConfigFromURLParams () {
    const step = parseInt(getUrlParameter('step'))
    if (!isNaN(step)) {
      this.step = step
    }
  }

  initStage () {
    this.setConfigFromURLParams()

    DatGUIClass.getInstance().init()
    StepClass.getInstance().init()

    CameraClass.getInstance().init()
    RendererClass.getInstance().init()
    RayCasterClass.getInstance().init()
    AmbientLightClass.getInstance().init()
    SpotLightClass.getInstance().init()

    CitySceneClass.getInstance().init()
    CityClass.getInstance().init().then((model) => {
      IconClass.getInstance().init().then((iconModel) => {
        StepIconClass.getInstance().init().then((stepIconModel) => {
          UserIconClass.getInstance().init().then((userIconModel) => {
            SplineClass.getInstance().init(this.step)
            GroundClass.getInstance().init()

            FBOClass.getInstance().init({
              width: this.config.scene.width,
              height: this.config.scene.height,
              transparentBackground: this.config.post.transparentBackground
            })
            ControlsClass.getInstance().init()
            MouseClass.getInstance().init()
            TouchClass.getInstance().init()

            this.addEvents()
            this.buildScene(model, iconModel, stepIconModel, userIconModel)
            this.animate()
          })
        })
      })
    })
  }

  buildScene (model, iconModel, stepIconModel, userIconModel) {
    CitySceneClass.getInstance().scene.add(SpotLightClass.getInstance().light)
    CitySceneClass.getInstance().scene.add(SpotLightClass.getInstance().light.target)
    // CitySceneClass.getInstance().scene.add(SpotLightClass.getInstance().lightHelper)
    // CitySceneClass.getInstance().scene.add(SpotLightClass.getInstance().shadowHelper)

    CitySceneClass.getInstance().scene.add(GroundClass.getInstance().mesh)
    CitySceneClass.getInstance().scene.add(AmbientLightClass.getInstance().light)
    CitySceneClass.getInstance().scene.add(model)
    CitySceneClass.getInstance().scene.add(iconModel)
    CitySceneClass.getInstance().scene.add(stepIconModel)
    CitySceneClass.getInstance().scene.add(userIconModel)

    CitySceneClass.getInstance().scene.add(SplineClass.getInstance().mesh)
  }

  animate () {
    window.requestAnimationFrame(this.animate.bind(this))
    this.renderFrame()
  }

  renderFrame () {
    const dt = this.clock.getDelta()

    MouseClass.getInstance().renderFrame({ dt: dt })
    TouchClass.getInstance().renderFrame({ dt: dt })
    CameraClass.getInstance().renderFrame({ dt: dt })
    ControlsClass.getInstance().renderFrame({ dt: dt })
    FBOClass.getInstance().renderFrame({ dt: dt })
    SpotLightClass.getInstance().renderFrame({ dt: dt })
    CityClass.getInstance().renderFrame({ dt: dt })
    IconClass.getInstance().renderFrame({ dt: dt })
    StepIconClass.getInstance().renderFrame({ dt: dt })
    UserIconClass.getInstance().renderFrame({ dt: dt })
    SplineClass.getInstance().renderFrame({ dt: dt })
    RayCasterClass.getInstance().renderFrame({ dt: dt })
  }

  addEvents () {
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    this.root.addEventListener('mousemove', (e) => {
      MouseClass.getInstance().onMouseMove(e)
    }, false)

    this.root.addEventListener('mousedown', (e) => {
      e.preventDefault()
      RayCasterClass.getInstance().onMouseDown(e)
    }, false)

    this.root.addEventListener('touchmove', (e) => {
      TouchClass.getInstance().onTouchMove(e)
    }, false)

    RayCasterClass.getInstance().on('iconClick', (data) => {
      this.setState({
        infoText: data.description,
        showInfoBox: true,
        infoBoxPosition: {
          x: data.mouseEvent.clientX,
          y: data.mouseEvent.clientY
        }
      })

      this.emit('iconClick', data)
    })

    RayCasterClass.getInstance().on('iconMouseOut', () => {
      setTimeout(() => {
        this.setState({
          showInfoBox: false,
          infoBoxPosition: {
            x: -999,
            y: -999
          }
        })
      }, 200)
    })
  }

  resize () {
    this.width = window.innerWidth
    this.height = window.innerHeight

    CameraClass.getInstance().resize(this.width, this.height)
    RendererClass.getInstance().resize(this.width, this.height)
    FBOClass.getInstance().resize(this.width, this.height)

    if (this.config.post.enabled) {
      this.composer.setSize(this.width, this.height)
    }
  }

  destroy () {
    RendererClass.getInstance().dispose()
    ControlsClass.getInstance().destroy()
    FBOClass.getInstance().destroy()

    if (this.composer) {
      delete this.composer
    }

    window.cancelAnimationFrame(this.animate)
    this.running = false
  }

  preloader (props) {
    let cssClass = styles.loadingContainer

    if (props.loaded) {
      cssClass += ' ' + styles.loaded
    }

    let width = ((props.itemsLoaded / props.itemsTotal)) * 100

    return (
      <div className={cssClass}>
        <div className={styles.loadingBarContainer} >
          <div className={styles.loadingBar} style={{ width: width + '%' }} />
        </div>
      </div>
    )
  }

  infoBox (props) {
    let inlineStyle = {
      left: props.position.x + 'px',
      top: props.position.y + 'px'
    }

    if (props.show) {
      return (
        <div style={inlineStyle} className={styles.infoBox}>{props.text}</div>
      )
    } else {
      return (
        <div />
      )
    }
  }

  render () {
    return (
      <div className={styles.container}>
        <this.infoBox show={this.state.showInfoBox} text={this.state.infoText} position={this.state.infoBoxPosition} />
        <this.preloader loaded={this.state.loaded} itemsTotal={this.state.itemsTotal} itemsLoaded={this.state.itemsLoaded} />
        <canvas id={this.config.scene.canvasID} />
      </div>
    )
  }
}

export default Main
