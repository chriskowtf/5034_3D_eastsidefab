import("../../components/head/head")
import("../../components/loader/loader.sass")
import "./index.scss"
import { mainAnim } from "./main"
import gsap from "gsap"

// require("!!file-loader?outputPath=./&name=[name].[ext]!./index.php")



let debugMode = false
if (window.location.hash == "#debug") {
  document.body.classList.add("debugMode");
  debugMode = true;
}

document.addEventListener("DOMContentLoaded", function () {
  mainAnim("#mainAnimContainer", ".container_loader__progress", sceneLoaded)
})

function sceneLoaded(scene) {
  setTimeout(() => {
    document.body.classList.add("pageLoad")
  }, 500)
}


let body = document.querySelector('body');

let glassPlus = document.querySelector('.glass-plus');
let glassMinus = document.querySelector('.glass-minus');

gsap.to(glassPlus, { opacity: 0 });
gsap.to(glassMinus, { opacity: 0 });
document.addEventListener('mousemove', (e) => {
  let x = e.clientX - body.offsetLeft - (glassPlus.offsetWidth * -1);
  let y = e.clientY - body.offsetTop - (glassPlus.offsetHeight * 1);
  gsap.to(glassPlus, { duration: 0.02, x: x, y: y, ease: "none" });
});
document.addEventListener('mousemove', (e) => {
  let x = e.clientX - body.offsetLeft - (glassMinus.offsetWidth * -1);
  let y = e.clientY - body.offsetTop - (glassMinus.offsetHeight * 1);
  gsap.to(glassMinus, { duration: 0.02, x: x, y: y, ease: "none" });
});
