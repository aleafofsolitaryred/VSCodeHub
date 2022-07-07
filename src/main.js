import count from "./js/count"
import sum from "./js/sum"

// 引入CSS资源,因为webpack打包的文件就是main.js, main.js中引入的文件都会打包成一个文件 
import "./css/index.css"
// 引入less资源
import "./less/index.less"
// 引入Sass和Scss资源
import "./sass/index.sass"
import "./sass/index.scss"
// 引入stylus资源
import "./stylus/index.styl"

// 引入字体图标资源
import "./css/iconfont.css"

// 引入音频资源
import "./audio/闻人听書_ - 一笑江湖.mp3"
import "./audio/谪仙-伊格赛听_叶里-89560911.flac"

// 引入视频资源
import "./video/视频.mp4"
import "./video/视频1.avi"

console.log(count(2, 1)); 
console.log(sum(1,2,3,4,5));