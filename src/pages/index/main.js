import Stats from 'stats.js'

import gsap from 'gsap'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui';
// import anim_scene_1 from './anim_scene_1'
// import anim_scene_2 from './anim_scene_2'
// import anim_scene_3 from './anim_scene_3'
// import anim_scene_4 from './anim_scene_4'



require("!!file-loader?outputPath=./models/&name=[name].[ext]!./model/TEST.gltf")
require("!!file-loader?outputPath=./models/&name=[name].[ext]!./model/adams_place_bridge_low.hdr")

// require("!!file-loader?outputPath=./models/&name=[name].[ext]!./model/ESF_1.gltf")
// require("!!file-loader?outputPath=./models/&name=[name].[ext]!./model/TEST.gltf")
// require("!!file-loader?outputPath=./models/&name=[name].[ext]!./model/ESF_3.gltf")
// require("!!file-loader?outputPath=./models/&name=[name].[ext]!./model/ESF_4.gltf")
// require("!!file-loader?outputPath=./assets/img/&name=[name].[ext]!./img/sc_bg0.png")
// require("!!file-loader?outputPath=./assets/img/&name=[name].[ext]!./img/sc_bg1.png")
// require("!!file-loader?outputPath=./assets/img/&name=[name].[ext]!./img/sc_bg2.png")
// require("!!file-loader?outputPath=./assets/img/&name=[name].[ext]!./img/sc_bg3.png")



export const mainAnim = function (idContainer, targetLoader, callback) {
  const gui = new GUI();
  gui.hide()
  // const myObject = {
  //   background: "bg_3",
  //   backgroundVar: {
  //     color: "#fff",
  //     bg_0: "sc_bg0.png",
  //     bg_1: "sc_bg1.png",
  //     bg_2: "sc_bg2.png",
  //     bg_3: "sc_bg3.png",
  //     gradient: "linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(251, 232, 20, 1) 0%, rgba(0, 212, 255, 1) 100%)"
  //   },
  //   color: "#fff",
  // };
  // let bgColor = gui.addColor(myObject, 'color').onChange((key) => {
  //   const bgTarget = document.querySelector(".dfrnc__anim-canvas")
  //   bgTarget.style.backgroundImage = "none"
  //   bgTarget.style.backgroundColor = key
  // }).hide()
  // gui.add(myObject, 'background', Object.keys(myObject.backgroundVar)).onChange((key) => {
  //   const bgTarget = document.querySelector(".dfrnc__anim-canvas")
  //   if (key == "bg_0") { bgTarget.style.backgroundImage = `url("./assets/img/sc_bg0.png")` }
  //   if (key == "bg_1") { bgTarget.style.backgroundImage = `url("./assets/img/sc_bg1.png")` }
  //   if (key == "bg_2") { bgTarget.style.backgroundImage = `url("./assets/img/sc_bg2.png")` }
  //   if (key == "bg_3") { bgTarget.style.backgroundImage = `url("./assets/img/sc_bg3.png")` }
  //   if (key == "gradient") { bgTarget.style.backgroundImage = "linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(251, 232, 20, 1) 0%, rgba(0, 212, 255, 1) 100%)" }
  //   if (key == "color") {
  //     bgColor.show()
  //     bgTarget.style.backgroundImage = "none"
  //     bgTarget.style.backgroundColor = myObject.color
  //   } else {
  //     bgColor.hide()
  //   }
  // })



  let debugMode = false
  if (window.location.hash == "#debug") {
    document.body.classList.add("debugMode");
    debugMode = true;
    gui.show()

  }

  // const stats = new Stats()
  // stats.showPanel(0)
  // stats.dom.classList.add("fpsView")
  // document.body.appendChild(stats.dom)
  // gsap.ticker.add(() => { stats.update() })

  /**
   * variables
   */


  const sObj = {}
  const clock = new THREE.Clock()
  let camera, scene, mixer = {}, animClip = {}, renderer, controls;
  let fov = 45, planeAspectRatio = 9 / 9, counter = 0;

  let raycaster = new THREE.Raycaster();
  const cameraLimit = new THREE.Vector2(10, 5);
  let mouse = new THREE.Vector2(0, 0);
  let container = document.querySelector(idContainer)
  const manager = new THREE.LoadingManager();
  const loader = new GLTFLoader(manager);
  const containerLoader = document.querySelector(targetLoader)
  const modelFolderUrl = container.getAttribute("data-model")
  let loaderCount = { num: 0, current: 0, content: "0%..." }

  console.log(sObj);

  init()

  function init() {
    /**
     * loader manager
     */

    manager.onError = function (url) {
      console.log('There was an error loading ' + url);
    };


    manager.onProgress = function (url, itemsLoaded, itemsTotal) {

      loaderLoading(itemsLoaded, itemsTotal)

    };
    loaderLoading(10, 100)

    function loaderLoading(itemsLoaded, itemsTotal) {
      loaderCount.num = itemsLoaded / itemsTotal * 100
      loaderCount.num = loaderCount.num < 10 ? 10 : loaderCount.num;
      gsap.to(loaderCount, {
        duration: .5, current: loaderCount.num,
        onUpdate: () => {
          loaderCount.current = Number(loaderCount.current.toFixed(0))
          loaderCount.content = (loaderCount.current == 100) ? loaderCount.current + "%)" : loaderCount.current + "%..."
          containerLoader.textContent = loaderCount.content
        }
      })
    }



    let loaderModelUrl = document.querySelector(idContainer).getAttribute("data-model")
    document.querySelector(idContainer).setAttribute("data-model", "get")


    /**
     * scene
     */
    scene = new THREE.Scene();


    /**
     * camera
     */

    sObj.camera = new THREE.PerspectiveCamera(fov, container.offsetWidth / container.offsetHeight, 0.001, 1000);

    sObj.camera.position.set(10.1, 10.05, 30.7)
    // sObj.camera.zoom = 0.4
    // sObj.camera.updateProjectionMatrix();
    // console.log(sObj.camera.rotation);
    const cameraTarget = new THREE.Mesh(
      // new THREE.BoxGeometry(.1, .1, .1, 1, 1, 1),
      // new THREE.MeshPhysicalMaterial({
      //   color: "#00ff00",
      // })
    )

    cameraTarget.position.set(10.05, -8, -6.3)
    scene.add(cameraTarget)
    gui.add(sObj.camera.position, 'x').min(- 35).max(35).step(0.001).name('positionX')
    gui.add(sObj.camera.position, 'y').min(- 35).max(35).step(0.001).name('positionY')
    gui.add(sObj.camera.position, 'z').min(- 35).max(35).step(0.001).name('positionZ')

    gui.add(cameraTarget.position, 'x').min(- 35).max(35).step(0.001).name('positionX')
    gui.add(cameraTarget.position, 'y').min(- 35).max(35).step(0.001).name('rotationY')
    gui.add(cameraTarget.position, 'z').min(- 35).max(35).step(0.001).name('rotationZ')


    // sObj.camera.zoom = 0.2;
    // gui.add(sObj.camera, 'zoom', 0.01, 1, 0.01).listen();
    // const minMaxGUIHelper = new MinMaxGUIHelper(sObj.camera, 'near', 'far', 0.1);
    // gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near');
    // gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far');


    // const ground = new THREE.Mesh(
    //   new THREE.PlaneGeometry(10, 10, 1, 1),
    //   new THREE.MeshStandardMaterial({
    //     color: "#ffffff",
    //     visible: debugMode,
    //   })
    // )
    // ground.receiveShadow = true
    // ground.rotation.x = toRad(-90)
    // ground.position.set(0, 0, 0)
    // scene.add(ground)

    /**
     * lights
     */
    const light = new THREE.AmbientLight(0xffffff, 0.02); // soft white light
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.3);
    directionalLight.position.set(-35, -16.6, 35)
    gui.add(directionalLight.position, 'x').min(- 35).max(35).step(0.001).name('lightX')
    gui.add(directionalLight.position, 'y').min(- 35).max(35).step(0.001).name('lightY')
    gui.add(directionalLight.position, 'z').min(- 35).max(35).step(0.001).name('lightZ')
    scene.add(directionalLight);




    // const spotLight = new THREE.SpotLight();
    // spotLight.position.set(10, 7, 12);
    // spotLight.color = new THREE.Color(0xfff0ae);
    // spotLight.intensity = 5;
    // spotLight.distance = 50;
    // spotLight.angle = toRad(30);
    // spotLight.penumbra = 0;
    // spotLight.decay = 1;
    // spotLight.castShadow = true;
    // sObj.spotLight = spotLight
    // scene.add(spotLight);

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // spotLightHelper.visible = debugMode
    // scene.add(spotLightHelper);


    const hdrUrl = `${modelFolderUrl}adams_place_bridge_low.hdr`;
    new RGBELoader().load(hdrUrl, texture => {
      const gen = new THREE.PMREMGenerator(renderer)
      const envMap = gen.fromEquirectangular(texture).texture
      scene.environment = envMap
      // scene.background = envMap
      texture.dispose()
      gen.dispose()
      // fGUI.sceneF.add(scene, "envMapIntensity", 0, 10, .1).name("light indensity").listen()
      // changeParamsFunc()
    })


    /**
     * renderer
     */

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio * 1);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.LinearToneMapping;
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);
    controls = new OrbitControls(sObj.camera, container);
    controls.target = cameraTarget.position
    controls.update();
    controls.enabled = debugMode

    let animHoverArr = [];
    let mouseArr = {
      x: 0,
      y: 0,
      vec: new THREE.Vector3(0, 0, 10),
      pos: new THREE.Vector3(0, 0, 10)
    }
    let mouseMove = false




    loader.load(loaderModelUrl + "TEST.gltf", function (gltf) {
      gltf.scene.traverse(function (object) {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
        if (object.type == 'SkinnedMesh') {
          object.frustumCulled = false;
          // console.log(object);
        }
      });

      const animations = gltf.animations
      console.log(animations);
      mixer.st1 = new THREE.AnimationMixer(gltf.scene)
      animClip.st1 = []
      animations.forEach((anim, i) => {
        animClip.st1.push(mixer.st1.clipAction(anim))
        // animClip.st1[i].loop = THREE.LoopPingPong;
        animClip.st1[i].clampWhenFinished = true
        animClip.st1[i].zeroSlopeAtStart = true
        animClip.st1[i].zeroSlopeAtEnd = true

        console.log(anim);
      })
      scene.add(gltf.scene)

      animHoverArr.push(scene.getObjectByName("scene01"))
      animHoverArr.push(scene.getObjectByName("scene02"))
      animHoverArr.push(scene.getObjectByName("scene03"))
      animHoverArr.push(scene.getObjectByName("scene04"))
      animHoverArr.push(scene.getObjectByName("scene05"))
      animHoverArr.push(scene.getObjectByName("scene06"))
      animHoverArr.push(scene.getObjectByName("scene07"))
      animHoverArr.push(scene.getObjectByName("scene08"))
      animHoverArr.push(scene.getObjectByName("scene09"))

      window.addEventListener("click", onmousemove, false);

    })
    console.log(animClip.st1);

    function onmousemove(event) {
      mouseArr.x = (event.clientX - container.getBoundingClientRect().left) / (container.offsetWidth) * 2 - 1;
      mouseArr.y = (-event.clientY + container.getBoundingClientRect().top) / (container.offsetHeight) * 2 + 1;
      mouseArr.vec.set(mouseArr.x, mouseArr.y, 0.5);

      mouseMove = true

      raycaster.setFromCamera(new THREE.Vector2(mouseArr.x, mouseArr.y), sObj.camera);

      animHoverArr.forEach(function (elem) {
        let intersects = raycaster.intersectObject(elem, true);

        if (intersects.length > 0) {
          let objectName = intersects[0].object.name;

          if (objectName.startsWith("scene") && !intersects[0].object.hoverAnim) {

            for (let i = 0; i < animClip.st1.length; i++) {
              switch (objectName) {
                case "scene01":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: -7, y: 3.1, z: 19.5 })
                    .to(cameraTarget.position, { x: 18.65, y: -8, z: -6.3 }, "<")
                  break;
                case "scene02":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: -0.2, y: 3.16, z: 24.7 })
                    .to(cameraTarget.position, { x: 19.5, y: -8, z: -6.3 }, "<")
                  break;
                case "scene03":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: 8.3, y: 3.16, z: 24.7 })
                    .to(cameraTarget.position, { x: 19.5, y: -8, z: -6.3 }, "<")
                  break;
                case "scene04":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: 18.6, y: 3.16, z: 24.7 })
                    .to(cameraTarget.position, { x: 19.5, y: -8, z: -6.3 }, "<")
                  break;
                case "scene05":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: 8.3, y: 5.7, z: 18.6 })
                    .to(cameraTarget.position, { x: 11.7, y: -4.6, z: -6.3 }, "<")
                  break;
                case "scene06":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: 14.3, y: 4, z: 16.07 })
                    .to(cameraTarget.position, { x: 22.95, y: -8, z: -6.3 }, "<")
                  break;
                case "scene07":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: 12.6, y: 5.7, z: 16 })
                    .to(cameraTarget.position, { x: 4, y: -8, z: -6.3 }, "<")
                  break;
                case "scene08":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: 13.4, y: 4.9, z: 10 })
                    .to(cameraTarget.position, { x: 11.8, y: 0.6, z: -6.3 }, "<")
                    .to(sObj.camera, {

                      zoom: 1.7,
                      onUpdate: function () {
                        sObj.camera.updateProjectionMatrix();
                      }
                    }, "<")
                  break;
                case "scene09":
                  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                    .to(sObj.camera.position, { x: -2.9, y: 5, z: 13.5 })
                    .to(cameraTarget.position, { x: 2.3, y: -2, z: -6.3 }, "<")
                  break;
              }
              if (animClip.st1[i].paused = true) {
                animClip.st1[i].paused = false;
                animClip.st1[i].play();
              } else {
                animClip.st1[i].play();
              }
            }
            intersects[0].object.hoverAnim = true;
          } else {
            for (let i = 0; i < animClip.st1.length; i++) {
              gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
                .to(sObj.camera.position, { x: 10.1, y: 10.05, z: 30.7 })
                .to(cameraTarget.position, { x: 10.05, y: -8, z: -6.3 }, "<")
                .to(sObj.camera, {

                  zoom: 1,
                  onUpdate: function () {
                    sObj.camera.updateProjectionMatrix();
                  }
                }, "<");
              animClip.st1[i].paused = true;
            }
            elem.hoverAnim = false;
          }
        }
      });


    }


    onWindowResize()
    manager.onLoad = function () {

      // animLogic()
      window.addEventListener('resize', onWindowResize, false)
      tick()
      callback(scene);

    }


    /**
     * functions
     */
    function onWindowResize() {
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      sObj.camera.aspect = width / height;

      if (sObj.camera.aspect > planeAspectRatio) {
        sObj.camera.fov = fov;
      } else {
        const cameraHeight = Math.tan(THREE.MathUtils.degToRad(fov / 2));
        const ratio = sObj.camera.aspect / planeAspectRatio;
        const newCameraHeight = cameraHeight / ratio;
        sObj.camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
      }

      sObj.camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio((window.mobile) ? window.devicePixelRatio * 0.35 : window.devicePixelRatio);

      /**
       * change camera target position 
       */
      if (window.innerWidth < 1650) {
        let koff = (window.innerWidth - 320) / (920 - 320)
        // cameraTarget.x = 5 * koff
      }


    }

    // function onMouseMove(event) {

    //   // event.preventDefault();
    //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // }

    // function updateCamera() {
    //   //offset the camera x/y based on the mouse's position in the window
    //   // console.log(camera.position.x, mouse.x);

    //   camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraLimit.x * mouse.x, 0.01)
    //   camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraLimit.y * mouse.y, 0.01)

    // }

    // function toRad(deg) {
    //   return deg * (Math.PI / 180);
    // }

    // function compareVectors3(v1, v2, distance) {
    //   let tempDist = {
    //     x: Math.abs(v1.x - v2.x),
    //     y: Math.abs(v1.y - v2.y),
    //     z: Math.abs(v1.z - v2.z),

    //   }
    //   let dxy = Math.sqrt((Math.pow(tempDist.x, 2) + Math.pow(tempDist.y, 2)), 2)
    //   let dyz = Math.sqrt((Math.pow(tempDist.y, 2) + Math.pow(tempDist.z, 2)), 2)
    //   let dxz = Math.sqrt((Math.pow(tempDist.x, 2) + Math.pow(tempDist.z, 2)), 2)

    //   dxy = (dxy + dyz + dxz) / 3
    //   dxy = (dxy < distance) ? (1 - dxy / distance) : -1;
    //   return dxy;
    // }

    // function Float32Concat(first, second) {
    //   var firstLength = first.length,
    //     result = new Float32Array(firstLength + second.length);

    //   result.set(first);
    //   result.set(second, firstLength);

    //   return result;
    // }



    /**
     * tick animation
     */


    function tick() {


      // updateCamera()
      // directionalLight.position.copy(sObj.camera.position)


      let mixerUpdateDelta = clock.getDelta();
      if (mixer != null) {
        for (const [key, value] of Object.entries(mixer)) {
          value.update(mixerUpdateDelta)
        }
      }


      if (controls) controls.update();
      renderer.render(scene, sObj.camera);
      requestAnimationFrame(tick);

    }

    // function animLogic() {


    //   const sTL = [
    //     anim_scene_1(scene),
    //     anim_scene_2(scene),
    //     anim_scene_3(scene),
    //     anim_scene_4(scene),
    //   ]

    //   let changeAnimF = false

    //   container.setAttribute("data-active_sl", 0)
    //   sTL[0].outro.tweenTo("p0", { duration: .2 })
    //   sTL[1].outro.tweenTo("p1", { duration: .1 })
    //   sTL[2].outro.tweenTo("p1", { duration: .1 })
    //   sTL[3].outro.tweenTo("p1", { duration: .1 })

    //   function changeSlide(dir) {
    //     const activeSl = Number(container.getAttribute("data-active_sl"))
    //     const arrLen = Object.keys(sTL).length
    //     // prev
    //     if (dir == -1 && !changeAnimF) {
    //       const newSl = (activeSl <= 0) ? arrLen - 1 : activeSl - 1;
    //       changeAnimF = true
    //       console.log(newSl);
    //       gsap.timeline({
    //         onComplete: () => {
    //           container.setAttribute("data-active_sl", newSl)
    //           changeAnimF = false
    //         }
    //       })
    //         .add(sTL[activeSl].intro.tweenFromTo("p1", "p0", { duration: 1,ease:"none", ease: "none" }))
    //         .add(sTL[newSl].outro.tweenFromTo("p1", "p0", { duration: 1,ease:"none", ease: "none" }), ">-.2")


    //       // sTL[activeSl].outro.tweenFromTo("p0", "p1", { duration: 1,ease:"none", ease: "none" })
    //       // sTL[newSl].intro.tweenFromTo("p0", "p1", { duration: 1,ease:"none", ease: "none" })
    //       // setTimeout(() => {
    //       //   container.setAttribute("data-active_sl", newSl)
    //       //   changeAnimF = false
    //       // }, 1000)
    //     }
    //     if (dir == 1 && !changeAnimF) {
    //       const newSl = (activeSl >= arrLen - 1) ? 0 : activeSl + 1;
    //       changeAnimF = true
    //       console.log(newSl);
    //       gsap.timeline({
    //         onComplete: () => {
    //           container.setAttribute("data-active_sl", newSl)
    //           changeAnimF = false
    //         }
    //       })
    //         .add(sTL[activeSl].outro.tweenFromTo("p0", "p1", { duration: 1,ease:"none", ease: "none" }))
    //         .add(sTL[newSl].intro.tweenFromTo("p0", "p1", { duration: 1,ease:"none", ease: "none" }), ">-.2")


    //     }
    //   }

    //   document.querySelector(".dfrnc-arrow--prev").addEventListener("click", function () {
    //     changeSlide(-1)
    //   })

    //   document.querySelector(".dfrnc-arrow--next").addEventListener("click", function () {
    //     changeSlide(1)
    //   })


    // }

  }


}


