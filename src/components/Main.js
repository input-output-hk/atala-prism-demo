/* ------------------------------------------
3rd Party
------------------------------------------ */
import React, { Component } from 'react'
import {
  Clock,
  Vector2,
  CameraHelper
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
import DirectionalLightClass from './classes/SpotLightClass'
import HighlightBuildingsClass from './classes/HighlightBuildingsClass'
import SplineClass from './classes/SplineClass'
import GroundClass from './classes/GroundClass'
import CitySceneClass from './classes/CitySceneClass'
import CityClass from './classes/CityClass'
import DatGUIClass from './classes/DatGUIClass'
import SpotLightClass from './classes/SpotLightClass'

/* ------------------------------------------
Styles
------------------------------------------ */
import styles from './Main.css'

class Main extends mixin(EventEmitter, Component) {
  constructor (props) {
    super(props)

    this.config = new Config().data
    this.clock = new Clock()
    this.modifiedQueue = []
    this.processingQueue = false
    this.data = []

    this.initLoader()

    this.state = {
      tooltipPos: new Vector2(),
      tooltipCountry: null,
      tooltipCity: null,
      tooltipHide: true,
      loaded: false,
      itemsLoaded: 0,
      itemsTotal: 0
    }
  }

  initLoader () {
    LoadingManagerClass.getInstance().init()

    LoadingManagerClass.getInstance().loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
      // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }

    LoadingManagerClass.getInstance().loadingManager.onLoad = function () {
      this.setState({
        loaded: true
      })

      // console.log('Loading complete!')
    }.bind(this)

    LoadingManagerClass.getInstance().loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      this.setState({
        itemsTotal: itemsTotal,
        itemsLoaded: itemsLoaded
      })

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
    // const blendColor = parseInt(getUrlParameter('blendColor'))
    // if (!isNaN(blendColor)) {
    //   this.config.post.blendColor = new Color(blendColor)
    // }
  }

  initStage () {
    this.setConfigFromURLParams()

    DatGUIClass.getInstance().init()

    CameraClass.getInstance().init()
    RendererClass.getInstance().init()
    AmbientLightClass.getInstance().init()
    DirectionalLightClass.getInstance().init()

    HighlightBuildingsClass.getInstance().init()
    SplineClass.getInstance().init()
    GroundClass.getInstance().init()

    CitySceneClass.getInstance().init()
    CityClass.getInstance().init().then((model) => {
      FBOClass.getInstance().init({
        width: this.config.scene.width,
        height: this.config.scene.height,
        transparentBackground: this.config.post.transparentBackground
      })
      ControlsClass.getInstance().init()
      MouseClass.getInstance().init()
      TouchClass.getInstance().init()

      this.buildScene(model)
      this.addEvents()
      this.animate()
    })
  }

  buildScene (model) {
    CitySceneClass.getInstance().scene.add(DirectionalLightClass.getInstance().light)
    CitySceneClass.getInstance().scene.add(DirectionalLightClass.getInstance().light.target)
    CitySceneClass.getInstance().scene.add(DirectionalLightClass.getInstance().lightHelper)
    CitySceneClass.getInstance().scene.add(DirectionalLightClass.getInstance().shadowHelper)

    CitySceneClass.getInstance().scene.add(GroundClass.getInstance().mesh)

    // CitySceneClass.getInstance().scene.add(HighlightBuildingsClass.getInstance().mesh)
    // CitySceneClass.getInstance().scene.add(SplineClass.getInstance().mesh)
    CitySceneClass.getInstance().scene.add(AmbientLightClass.getInstance().light)
    CitySceneClass.getInstance().scene.add(model)
  }

  animate () {
    window.requestAnimationFrame(this.animate.bind(this))
    this.renderFrame()
  }

  renderFrame () {
    const dt = this.clock.getDelta()

    MouseClass.getInstance().renderFrame({ dt: dt })
    TouchClass.getInstance().renderFrame({ dt: dt })
    ControlsClass.getInstance().renderFrame({ dt: dt })
    FBOClass.getInstance().renderFrame({ dt: dt })
    SpotLightClass.getInstance().renderFrame({ dt: dt })
    CityClass.getInstance().renderFrame({ dt: dt })
  }

  addEvents () {
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    RendererClass.getInstance().renderer.domElement.addEventListener('mousemove', (e) => {
      MouseClass.getInstance().onMouseMove(e)
    }, false)

    RendererClass.getInstance().renderer.domElement.addEventListener('touchmove', (e) => {
      TouchClass.getInstance().onTouchMove(e)
    }, false)
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

  render () {
    return (
      <div className={styles.container}>
        <this.preloader loaded={this.state.loaded} itemsTotal={this.state.itemsTotal} itemsLoaded={this.state.itemsLoaded} />
        <canvas width={this.width} height={this.height} id={this.config.scene.canvasID} />
      </div>
    )
  }
}

export default Main
