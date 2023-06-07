import gsap from 'gsap'
import * as THREE from 'three'


export default function (scene) {
  const sTL = {}
  const sObj = {}

  sTL.anims = []

  sObj.sc = scene.getObjectByName("scene1")
  sObj.sc_gGreenStage = sObj.sc.getObjectByName("gGreenStage")
  sObj.sc_gTribStage = sObj.sc.getObjectByName("gTribStage")
  sObj.sc_gBoardStage = sObj.sc.getObjectByName("gBoardStage")
  sObj.sc_gChairStage = sObj.sc.getObjectByName("gChairStage")
  sObj.sc_gW = sObj.sc.getObjectByName("gW")
  sObj.sc_gW1 = sObj.sc.getObjectByName("gW1")
  sObj.sc_gM2 = sObj.sc.getObjectByName("gM2")
  sObj.sc_gM3 = sObj.sc.getObjectByName("gM3")
  sObj.sc_gW4 = sObj.sc.getObjectByName("gW4")

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
    // // woman board anim
    // gsap.timeline({ repeat: -1, repeatDelay: .5 })
    //   .to(sObj.sc_gW.getObjectByName("upper_armR").rotation, { duration: 1, repeat: 0, yoyo: true, z: "+=.5", ease: "sine.inOut" })
    //   .to(sObj.sc_gW.getObjectByName("spine006").rotation, { duration: 1, repeat: 0, yoyo: true, y: "+=1", ease: "sine.inOut" }, "<+1")
    //   .to(sObj.sc_gW.getObjectByName("spine006").rotation, { duration: .5, repeat: 3, yoyo: true, x: "+=.1", ease: "sine.inOut" })
    //   .to(sObj.sc_gW.getObjectByName("spine006").rotation, { duration: 1, repeat: 0, yoyo: true, y: "+=-1", ease: "sine.inOut" })
    //   .to(sObj.sc_gW.getObjectByName("upper_armR").rotation, { duration: 1, repeat: 0, yoyo: true, z: "+=-1", ease: "sine.inOut" }, "<")
    //   .to(sObj.sc_gW.getObjectByName("spine006").rotation, { duration: 1, repeat: 1, repeatDelay: 2, yoyo: true, y: "+=1", ease: "sine.inOut" }, ">+1")
    //   .to(sObj.sc_gW.getObjectByName("upper_armR").rotation, { duration: 1, repeat: 0, yoyo: true, z: "+=.5", ease: "sine.inOut" }, ">-1")
    // ,

    // // woman1 anim
    // gsap.to(sObj.sc_gW1.getObjectByName("shinL_1").rotation, { duration: 1, repeat: -1, yoyo: true, x: "+=-.1", ease: "sine.inOut" })
    // ,
    // gsap.timeline({ repeat: -1, repeatDelay: 3 })
    //   .to(sObj.sc_gW1.getObjectByName("spine006_1").rotation, { duration: .5, repeat: 3, yoyo: true, x: "+=.1", ease: "sine.inOut" })
    // ,

    // // man2 anim
    // gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1, delay: -.3 })
    //   .to(sObj.sc_gM2.getObjectByName("forearmL_2").rotation, { duration: .5, repeat: 0, yoyo: true, z: "+=.1", ease: "sine.inOut" }, "<")
    //   // .to(sObj.sc_gM2.getObjectByName("f_index01L_2").rotation, { duration: .5, repeat: 3, yoyo: true, z: "+=.2", ease: "sine.inOut" })
    //   // .to(sObj.sc_gM2.getObjectByName("thumb01L_2").rotation, { duration: .5, repeat: 3, yoyo: true, z: "+=-.2", ease: "sine.inOut" }, "<")
    //   .to(sObj.sc_gM2.getObjectByName("forearmL_2").rotation, { duration: .5, repeat: 0, yoyo: true, z: "+=-.1", ease: "sine.inOut" }, ">+1")
    //   .to(sObj.sc_gM2.getObjectByName("spine006_2").rotation, { duration: 1, repeat: 0, yoyo: true, y: "+=.1", ease: "sine.inOut" }, "<")
    // ,



    // man3 anim
    gsap.to(sObj.sc_gM3.getObjectByName("shinR_3").rotation, { duration: 1, repeat: -1, repeatDelay: 2, yoyo: true, x: "+=-.1", ease: "sine.inOut" })
    ,
    gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 0.6 })
      .to(sObj.sc_gM3.getObjectByName("spine006_3").rotation, { duration: .5, repeat: 3, yoyo: true, x: "+=.1", ease: "sine.inOut" })
    ,

    // woman4 anim
    gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 3, delay: -.3 })
      .to(sObj.sc_gW4.getObjectByName("spine006_4").rotation, { duration: .5, repeat: 3, yoyo: true, x: "+=.1", ease: "sine.inOut" })
      .to(sObj.sc_gW4.getObjectByName("shinL_4").rotation, { duration: 1, repeat: 0, yoyo: true, x: "+=-.1", ease: "sine.inOut" }, "<")
      .to(sObj.sc_gW4.getObjectByName("shinR_4").rotation, { duration: 1, repeat: 0, yoyo: true, x: "+=.1", ease: "sine.inOut" }, "<")

      .to(sObj.sc_gW4.getObjectByName("upper_armL_4").rotation, { duration: 1, repeat: 0, yoyo: true, x: "+=-.1", ease: "sine.inOut" }, "<+2")
      .to(sObj.sc_gW4.getObjectByName("upper_armR_4").rotation, { duration: 1, repeat: 0, yoyo: true, x: "+=-.1", ease: "sine.inOut" }, "<")
    ,
  )


  return sTL;

}


