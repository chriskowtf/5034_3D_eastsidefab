import gsap from 'gsap'
import * as THREE from 'three'


export default function (scene) {
  const sTL = {}
  const sObj = {}

  sTL.anims = []

  sObj.sc = scene.getObjectByName("scene3")

  /**
   * intro animation
   */

  sTL.intro = gsap.timeline({ paused: true })
    .set(sObj.sc.position, { x: 20 })
    .addLabel("p0", "<")
    .to(sObj.sc.position, { duration: 1, x: 0, ease: "elastic.out(0.5,1)" })
    .addLabel("p1")

  /**
   * outro animation
   */

  sTL.outro = gsap.timeline({ paused: true })
    .set(sObj.sc.position, { x: 0 })
    .addLabel("p0", "<")
    .to(sObj.sc.position, { duration: 1, x: -20, ease: "elastic.in(0.5,1)" })
    .addLabel("p1")



  /**
   * const animation
   */
  sTL.anims.push(

  )

  return sTL;

}


