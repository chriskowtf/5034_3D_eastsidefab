import gsap from 'gsap'
import * as THREE from 'three'


export default function (scene) {
  const sTL = {}
  sTL.anims = []

  const sObj = {}
  sObj.s1 = scene.getObjectByName("scene1")
  sObj.s1_gGreenStage = sObj.s1.getObjectByName("gGreenStage")
  sObj.s1_gTribStage = sObj.s1.getObjectByName("gTribStage")
  sObj.s1_gBoardStage = sObj.s1.getObjectByName("gBoardStage")
  sObj.s1_gChairStage = sObj.s1.getObjectByName("gChairStage")
  sObj.s1_gW = sObj.s1.getObjectByName("gW")
  sObj.s1_gW1 = sObj.s1.getObjectByName("gW1")
  sObj.s1_gM2 = sObj.s1.getObjectByName("gM2")
  sObj.s1_gM3 = sObj.s1.getObjectByName("gM3")
  sObj.s1_gW4 = sObj.s1.getObjectByName("gW4")


  sTL.intro = gsap.timeline({ paused: true })
    .from(sObj.s1_gGreenStage.position, { duration: 3, x: 10, ease: "elastic.out(.5,1)" }, "qq")
    .addLabel("p0", "<.01")
  sObj.s1_gGreenStage.children.forEach((obj, i) => {
    sTL.intro
      .to(obj.rotation, { duration: .5, z: "+=.02", repeat: 1, yoyo: true, ease: "sine.out" }, i == 0 ? ">-1.5" : "<")
      .to(obj.position, { duration: .5, y: "+=.01", repeat: 1, yoyo: true, ease: "sine.out" }, "<")
  })
  sTL.intro
    .from(sObj.s1_gTribStage.position, { duration: 3, x: 10, ease: "elastic.out(.5,1)" }, "qq+=0.1")
    .from(sObj.s1_gBoardStage.position, { duration: 3, x: 10, ease: "elastic.out(.5,1)" }, "qq+=0.2")

  sObj.s1_gBoardStage.children.forEach((obj, i) => {
    sTL.intro
      .to(obj.rotation, { duration: .5, z: "+=.02", repeat: 1, yoyo: true, ease: "sine.out" }, i == 0 ? ">-1.5" : "<")
      .to(obj.position, { duration: .5, y: "+=.01", repeat: 1, yoyo: true, ease: "sine.out" }, "<")
  })

  sTL.intro
    .from(sObj.s1_gChairStage.position, { duration: 3, x: 10, ease: "elastic.out(.5,1)" }, "qq+=0.3")
  sObj.s1_gChairStage.children.forEach((obj, i) => {
    sTL.intro
      .to(obj.rotation, { duration: .5, z: "+=.02", repeat: 1, yoyo: true, ease: "sine.out" }, i == 0 ? ">-1.5" : "<")
      .to(obj.position, { duration: .5, y: "+=.01", repeat: 1, yoyo: true, ease: "sine.out" }, "<")
  })

  sTL.intro
    .addLabel("p1")


  sTL.outro = gsap.timeline({ paused: true })
    .to(sObj.s1_gGreenStage.position, { duration: 3, x: -10, ease: "elastic.in(.5,1)" }, "qq")
    .addLabel("p0", "<.01")
  // sObj.s1_gGreenStage.children.forEach((obj, i) => {
  //   sTL.outro
  //     .to(obj.rotation, { duration: .5, z: "+=.02", repeat: 1, yoyo: true, ease: "sine.out" }, i == 0 ? ">-1.5" : "<")
  //     .to(obj.position, { duration: .5, y: "+=.01", repeat: 1, yoyo: true, ease: "sine.out" }, "<")
  // })
  sTL.outro
    .to(sObj.s1_gTribStage.position, { duration: 3, x: -10, ease: "elastic.in(.5,1)" }, "qq+=0.1")
    .to(sObj.s1_gBoardStage.position, { duration: 3, x: -10, ease: "elastic.in(.5,1)" }, "qq+=0.2")

  // sObj.s1_gBoardStage.children.forEach((obj, i) => {
  //   sTL.outro
  //     .to(obj.rotation, { duration: .5, z: "+=.02", repeat: 1, yoyo: true, ease: "sine.out" }, i == 0 ? ">-1.5" : "<")
  //     .to(obj.position, { duration: .5, y: "+=.01", repeat: 1, yoyo: true, ease: "sine.out" }, "<")
  // })

  sTL.outro
    .to(sObj.s1_gChairStage.position, { duration: 3, x: -10, ease: "elastic.in(.5,1)" }, "qq+=0.3")
  // sObj.s1_gChairStage.children.forEach((obj, i) => {
  //   sTL.outro
  //     .to(obj.rotation, { duration: .5, z: "+=.02", repeat: 1, yoyo: true, ease: "sine.out" }, i == 0 ? ">-1.5" : "<")
  //     .to(obj.position, { duration: .5, y: "+=.01", repeat: 1, yoyo: true, ease: "sine.out" }, "<")
  // })
  sTL.outro
    .addLabel("p1")

  /**
   * const animation
   */
  sTL.anims.push(
    // woman board anim
    gsap.timeline({ repeat: -1, repeatDelay: .5 })
      .to(sObj.s1_gW.getObjectByName("upper_armR").rotation, { duration: 1, repeat: 0, yoyo: true, z: "+=.5", ease: "sine.inOut" })
      .to(sObj.s1_gW.getObjectByName("spine006").rotation, { duration: 1, repeat: 0, yoyo: true, y: "+=1", ease: "sine.inOut" }, "<+1")
      .to(sObj.s1_gW.getObjectByName("spine006").rotation, { duration: .5, repeat: 3, yoyo: true, x: "+=.1", ease: "sine.inOut" })
      .to(sObj.s1_gW.getObjectByName("spine006").rotation, { duration: 1, repeat: 0, yoyo: true, y: "+=-1", ease: "sine.inOut" })
      .to(sObj.s1_gW.getObjectByName("upper_armR").rotation, { duration: 1, repeat: 0, yoyo: true, z: "+=-1", ease: "sine.inOut" }, "<")
      .to(sObj.s1_gW.getObjectByName("spine006").rotation, { duration: 1, repeat: 1, repeatDelay: 2, yoyo: true, y: "+=1", ease: "sine.inOut" }, ">+1")
      .to(sObj.s1_gW.getObjectByName("upper_armR").rotation, { duration: 1, repeat: 0, yoyo: true, z: "+=.5", ease: "sine.inOut" }, ">-1")
    ,

    // woman1 anim
    gsap.to(sObj.s1_gW1.getObjectByName("shinL_1").rotation, { duration: 1, repeat: -1, yoyo: true, x: "+=-.1", ease: "sine.inOut" })
    ,
    gsap.timeline({ repeat: -1, repeatDelay: 3 })
      .to(sObj.s1_gW1.getObjectByName("spine006_1").rotation, { duration: .5, repeat: 3, yoyo: true, x: "+=.1", ease: "sine.inOut" })
    ,

    // man2 anim
    gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1, delay: -.3 })
      .to(sObj.s1_gM2.getObjectByName("forearmL_2").rotation, { duration: .5, repeat: 0, yoyo: true, z: "+=.1", ease: "sine.inOut" }, "<")
      // .to(sObj.s1_gM2.getObjectByName("f_index01L_2").rotation, { duration: .5, repeat: 3, yoyo: true, z: "+=.2", ease: "sine.inOut" })
      // .to(sObj.s1_gM2.getObjectByName("thumb01L_2").rotation, { duration: .5, repeat: 3, yoyo: true, z: "+=-.2", ease: "sine.inOut" }, "<")
      .to(sObj.s1_gM2.getObjectByName("forearmL_2").rotation, { duration: .5, repeat: 0, yoyo: true, z: "+=-.1", ease: "sine.inOut" }, ">+1")
      .to(sObj.s1_gM2.getObjectByName("spine006_2").rotation, { duration: 1, repeat: 0, yoyo: true, y: "+=.1", ease: "sine.inOut" }, "<")
    ,



    // man3 anim
    gsap.to(sObj.s1_gM3.getObjectByName("shinR_3").rotation, { duration: 1, repeat: -1, repeatDelay: 2, yoyo: true, x: "+=-.1", ease: "sine.inOut" })
    ,
    gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 0.6 })
      .to(sObj.s1_gM3.getObjectByName("spine006_3").rotation, { duration: .5, repeat: 3, yoyo: true, x: "+=.1", ease: "sine.inOut" })
    ,

    // woman4 anim
    gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 3, delay: -.3 })
      .to(sObj.s1_gW4.getObjectByName("spine006_4").rotation, { duration: .5, repeat: 3, yoyo: true, x: "+=.1", ease: "sine.inOut" })
      .to(sObj.s1_gW4.getObjectByName("shinL_4").rotation, { duration: 1, repeat: 0, yoyo: true, x: "+=-.1", ease: "sine.inOut" }, "<")
      .to(sObj.s1_gW4.getObjectByName("shinR_4").rotation, { duration: 1, repeat: 0, yoyo: true, x: "+=.1", ease: "sine.inOut" }, "<")

      .to(sObj.s1_gW4.getObjectByName("upper_armL_4").rotation, { duration: 1, repeat: 0, yoyo: true, x: "+=-.1", ease: "sine.inOut" }, "<+2")
      .to(sObj.s1_gW4.getObjectByName("upper_armR_4").rotation, { duration: 1, repeat: 0, yoyo: true, x: "+=-.1", ease: "sine.inOut" }, "<")
    ,
  )

  return sTL;

}


