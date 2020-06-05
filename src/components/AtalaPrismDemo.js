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
import GardenClass from './classes/GardenClass'

/* ------------------------------------------
Styles
------------------------------------------ */
import styles from './index.css'

class AtalaPrismDemo extends mixin(EventEmitter, Component) {
  constructor (props) {
    super(props)

    this.config = new Config().data
    this.clock = new Clock()
    this.debug = false

    this.initLoader()

    this.itemsToLoad = 26 // TODO: this better

    this.state = {
      loaded: false,
      itemsLoaded: 0,
      itemsTotal: 0,
      showInfoBox: false,
      infoBoxPosition: { x: -999, y: -999 },
      infoCategory: '',
      infoType: '',
      infoTitle: '',
      infoDescription: ''
    }

    this.root = document.getElementById(this.config.rootID)

    window.atalaPrismDemo = this
  }

  initLoader () {
    LoadingManagerClass.getInstance().init()

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
    }.bind(this)

    LoadingManagerClass.getInstance().loadingManager.onError = function (url) {
      console.log('There was an error loading ' + url)
    }
  }

  componentDidMount () {
    this.initStage()
  }

  componentWillUnmount () {
    this.destroy()
  }

  setConfigFromURLParams () {
    const step = parseInt(getUrlParameter('step'))
    if (!isNaN(step)) {
      this.step = step
    }

    const debug = parseInt(getUrlParameter('debug'))
    if (!isNaN(debug)) {
      this.debug = !!debug
    }
  }

  incrementStep () {
    StepClass.getInstance().incrementStep()
  }

  reset () {
    StepClass.getInstance().reset()
  }

  setStep (step) {
    StepClass.getInstance().setStep(step)
  }

  initStage () {
    this.setConfigFromURLParams()

    DatGUIClass.getInstance().init(this.debug)
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
            GardenClass.getInstance().init().then((gardenModel) => {
              GroundClass.getInstance().init()

              ControlsClass.getInstance().init()
              MouseClass.getInstance().init()
              TouchClass.getInstance().init()

              this.addEvents()
              this.buildScene(
                model,
                iconModel,
                stepIconModel,
                userIconModel,
                gardenModel
              )

              this.animate()
            })
          })
        })
      })
    })
  }

  buildScene (model, iconModel, stepIconModel, userIconModel, gardenModel) {
    CitySceneClass.getInstance().scene.add(SpotLightClass.getInstance().light)
    CitySceneClass.getInstance().scene.add(SpotLightClass.getInstance().light.target)
    // CitySceneClass.getInstance().scene.add(SpotLightClass.getInstance().lightHelper)
    // CitySceneClass.getInstance().scene.add(SpotLightClass.getInstance().shadowHelper)

    CitySceneClass.getInstance().scene.add(GroundClass.getInstance().mesh)
    CitySceneClass.getInstance().scene.add(GardenClass.getInstance().mesh)
    CitySceneClass.getInstance().scene.add(AmbientLightClass.getInstance().light)
    CitySceneClass.getInstance().scene.add(model)
    CitySceneClass.getInstance().scene.add(iconModel)
    CitySceneClass.getInstance().scene.add(stepIconModel)
    CitySceneClass.getInstance().scene.add(userIconModel)
    CitySceneClass.getInstance().scene.add(gardenModel)

    CitySceneClass.getInstance().scene.add(SplineClass.getInstance().mesh)
  }

  animate () {
    this.animationReq = window.requestAnimationFrame(this.animate.bind(this))
    this.renderFrame()
  }

  renderFrame () {
    const dt = this.clock.getDelta()

    MouseClass.getInstance().renderFrame({ dt: dt })
    TouchClass.getInstance().renderFrame({ dt: dt })
    CameraClass.getInstance().renderFrame({ dt: dt })
    ControlsClass.getInstance().renderFrame({ dt: dt })
    SpotLightClass.getInstance().renderFrame({ dt: dt })
    CityClass.getInstance().renderFrame({ dt: dt })
    IconClass.getInstance().renderFrame({ dt: dt })
    StepIconClass.getInstance().renderFrame({ dt: dt })
    UserIconClass.getInstance().renderFrame({ dt: dt })
    SplineClass.getInstance().renderFrame({ dt: dt })
    RayCasterClass.getInstance().renderFrame({ dt: dt })
    RendererClass.getInstance().renderFrame({ dt: dt })
  }

  addEvents () {
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    RendererClass.getInstance().renderer.domElement.addEventListener('mousemove', (e) => {
      MouseClass.getInstance().onMouseMove(e)
    }, false)

    RendererClass.getInstance().renderer.domElement.addEventListener('mousedown', (e) => {
      RayCasterClass.getInstance().onMouseDown(e)
    }, false)

    RendererClass.getInstance().renderer.domElement.addEventListener('touchmove', (e) => {
      TouchClass.getInstance().onTouchMove(e)
    }, false)

    RendererClass.getInstance().renderer.domElement.addEventListener('touchstart', (e) => {
      TouchClass.getInstance().onTouchStart(e)
      RayCasterClass.getInstance().onMouseDown(e)
    }, false)

    RendererClass.getInstance().renderer.domElement.addEventListener('touchend', (e) => {
      TouchClass.getInstance().onTouchEnd(e)
    }, false)

    RayCasterClass.getInstance().on('iconClick', (data) => {
      let interactionPos = { x: -999, y: -999 }
      if (this.config.detector.isMobile) {
        if (typeof data.mouseEvent.touches[0] !== 'undefined') {
          interactionPos = data.mouseEvent.touches[0]
        }
      } else {
        interactionPos = data.mouseEvent
      }

      this.setState({
        popupTitle: data.popupTitle,
        infoCategory: data.category,
        infoType: data.type,
        infoTitle: data.title,
        infoDescription: data.description,
        showInfoBox: true,
        infoBoxPosition: {
          x: interactionPos.clientX,
          y: interactionPos.clientY
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
  }

  destroy () {
    window.removeEventListener('resize', this.resize)
    RendererClass.getInstance().destroy()
    CitySceneClass.getInstance().destroy()
    window.cancelAnimationFrame(this.animationReq)
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

    let topCSSClass = styles.smartBoxTop
    if (props.category === 'step') {
      topCSSClass = styles.stepBoxTop
    }

    if (props.show) {
      return (
        <div style={inlineStyle} className={styles.infoBox + ' ' + styles['type-' + props.type]}>
          <div className={styles.infoBoxTop + ' ' + topCSSClass}>
            <div className={styles.smartIcon} />
            <h3>{props.popupTitle}</h3>
            <h2>{props.heading}</h2>
          </div>
          <div className={styles.infoBoxBottom}>
            <p>{props.description}</p>
          </div>
        </div>
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
        <this.infoBox
          show={this.state.showInfoBox}
          popupTitle={this.state.popupTitle}
          description={this.state.infoDescription}
          heading={this.state.infoTitle}
          type={this.state.infoType}
          category={this.state.infoCategory}
          position={this.state.infoBoxPosition}
        />
        <this.preloader
          loaded={this.state.loaded}
          itemsTotal={this.state.itemsTotal}
          itemsLoaded={this.state.itemsLoaded}
        />
        <canvas id={this.config.scene.canvasID} />
      </div>
    )
  }
}

export default AtalaPrismDemo
