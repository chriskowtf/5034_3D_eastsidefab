import gsap from 'gsap'
import * as THREE from 'three'


export default function (scene) {
  const sTL = {}
  const sObj = {}

  sTL.anims = []

  sObj.sc = scene.getObjectByName("scene1")

  /**
   * intro animation
   */

  sTL.intro = gsap.timeline({ paused: true })

  /**
   * outro animation
   */

  sTL.outro = gsap.timeline({ paused: true })


  /**
   * const animation
   */
  sTL.anims.push(

  )

  return sTL;

}


