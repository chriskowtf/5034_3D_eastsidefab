import("../../components/head/head")
import("../../components/loader/loader.sass")
import "./index.scss"
import { mainAnim } from "./main"

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
