import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import modalUrl1 from '../assets/red_man_sits_on_the_groun_textured_mesh_lowpoly_glb.glb'
import modalUrl2 from '../assets/red_man_sits_on_the_groun_textured_mesh_glb.glb'
import modalUrl3 from '../assets/red_man_sits_on_the_groun_textured_mesh_medpoly_glb.glb'
import modalUrl4 from '../assets/red_man_sits_on_the_groun_full_mesh.ply'
import modalUrl5 from '../assets/red_man_sits_on_the_groun_textured_mesh_obj.zip'
import {PLYLoader} from "three/addons/loaders/PLYLoader.js";


const scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xbfe3dd );

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(scene.position);
scene.add(camera);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(800);
scene.add(axesHelper);

// 环境光
const ambLight = new THREE.AmbientLight();
scene.add(ambLight);

// antialias 平滑 抗锯齿
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );


// // 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener("change", function () {
    renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件

const loader = new GLTFLoader();

loader.load(modalUrl1, glb =>{
    const model = glb.scene
    scene.add(model)
    renderer.render(scene, camera);
})
// loader.load(modalUrl2, glb =>{
//     const model = glb.scene
//     scene.add(model)
//     renderer.render(scene, camera);
// })
// loader.load(modalUrl3, glb =>{
//     const model = glb.scene
//     scene.add(model)
//     renderer.render(scene, camera);
// })

// // 创建加载器
// const plyloader = new PLYLoader();
//
// // 加载文件
// plyloader.load(
//     // resource URL
//     modalUrl4,
//     // loaded callback
//     function ( geometry ) {
//
//         // 创建Mesh
//         const mesh = new THREE.Mesh( geometry );
//
//         // 添加到场景
//         scene.add( mesh );
//         renderer.render(scene, camera);
//
//     }
// );

// // 创建ZipLoader
// const objLoader = new OBJLoader();
//
// objLoader.load(
//     // zip文件路径
//     modalUrl5,
//
//     // 解压完成回调
//     function(geometry, materials) {
//
//         // geometry包含模型数据
//         // materials包含材质
//
//         // 创建Mesh
//         const mesh = new THREE.Mesh(geometry, materials);
//
//         scene.add(mesh);
//         renderer.render(scene,camera)
//
//     }
// );

document.body.appendChild(renderer.domElement)
