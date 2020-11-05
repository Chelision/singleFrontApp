import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {registerApplication,start} from 'single-spa'
Vue.config.productionTip = false
async function loadScript(url){
  return new Promise((resolve,reject)=>{
    let oScript = document.createElement('script')
    oScript.src = url
    oScript.onload = resolve
    oScript.onerror = reject
    document.head.appendChild(oScript)
    console.log(document.head)
  })
}
registerApplication('myVueApp',
async ()=>{
  console.log("加载模块")
  //systemJS
  await loadScript('http://localhost:10001/js/chunk-vendors.js')
  await loadScript('http://localhost:10001/js/app.js')
  //先加载公共资源，再加载app.js
  return window.singleVue //此处就能调用bootstrap,mount,unmount等方法
},
location=>location.pathname.startsWith('/vue'),
)//用户切换到/vue的路径下，我们需要加载刚才定义的子应用

start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
