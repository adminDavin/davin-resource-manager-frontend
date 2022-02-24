import * as THREE from "three";
import Orbitcontrols from 'three-orbitcontrols';
import room from '@/assets/room/scene.jpeg';
import hotImg from '@/assets/room/hot.png';
let camera: any, scene: any, renderer: any, geometry, material, mesh: any;
function init(offsetWidth, offsetHeight) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, (window.innerWidth - 200) / (window.innerHeight - 64), 1, 1000);
  camera.position.set(0, 0, 0.01);
  camera.lookAt(scene.position);
  geometry = new THREE.SphereGeometry(300, 300, 300);
  geometry.scale(1, 1, -1)
  const textureLoader = new THREE.TextureLoader();
  const textrueLight = textureLoader.load(room);
  material = new THREE.MeshBasicMaterial({
    map: textrueLight
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(offsetWidth, offsetHeight);
  renderer.setAnimationLoop();
  document.getElementById('room')!.appendChild(renderer.domElement);
  initPoints()
  renderer.render(scene, camera);
  const controls = new Orbitcontrols(camera, renderer.domElement);
  controls.addEventListener("change", () => {
    renderer.render(scene, camera);
  });
  loop()
}
function loop() {
  requestAnimationFrame(loop);
  renderer.render(scene, camera);
}
var hotPoints = [
  {
    position: {
      x: 0,
      y: 0,
      z: -0.2
    },
    detail: {
      "title": "信息点1"
    }
  },
  {
    position: {
      x: -0.2,
      y: -0.05,
      z: 0.2
    },
    detail: {
      "title": "信息点2"
    }
  }
];
function initPoints() {
  const pointTexture = new THREE.TextureLoader().load(hotImg);
  const spritematerial = new THREE.SpriteMaterial({
    color: 0xff00ff,//设置精灵矩形区域颜色
    rotation: Math.PI / 4,//旋转精灵对象45度，弧度值
    map: pointTexture
  });

  var poiObjects = <any[]>[];
  for (var i = 0; i < hotPoints.length; i++) {
    const sprite: any = new THREE.Sprite(spritematerial);
    sprite.scale.set(10, 10, 1);
    sprite.position.set(hotPoints[i].position.x, hotPoints[i].position.y, hotPoints[i].position.z);

    scene.add(sprite);
    sprite.detail = hotPoints[i].detail;
    poiObjects.push(sprite);
  }
}
export { init }