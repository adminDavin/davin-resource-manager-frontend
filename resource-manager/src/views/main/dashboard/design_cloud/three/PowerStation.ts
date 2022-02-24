import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import fonts from "three/examples/fonts/helvetiker_regular.typeface.json"
import Orbitcontrols from 'three-orbitcontrols'
class PowerRoom {
  public camera: THREE.Camera | any;
  public scene: THREE.Scene | any;
  public renderer: THREE.Renderer | any;
  public geometry: THREE.BoxGeometry | any;
  public mesh: THREE.Mesh | any;
  public container: string;
  public option: Object;
  public loader: GLTFLoader

  constructor(str: string, opt: Object) {
    this.loader = new GLTFLoader();
    this.container = str;
    this.option = opt;
    // this.init()
  }

  init(offsetWidth: number, offsetHeight: number) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 150, 150);
    this.camera.lookAt(this.scene.position);


    // this.addMode(0,0,-30,'GLTF/roof_center.glb',1000);
    //地面
    this.addMode(0, 0, 0, 'tower/snow_tile.glb', 500, 0.001, 500, null);
    this.addMode(10, 0, -10, 'GLTF/skyscraperA.glb', 10, 10, 10, null);
    this.addMode(-10, 0, -10, 'GLTF/skyscraperF.glb', 10, 10, 10, null);
    this.addMode(30, 0, -5, 'GLTFROOM/house_type01.glb', 10, 10, 10, null);
    this.addMode(-30, 0, -10, 'GLTFROOM/house_type02.glb', 10, 10, 10, null);
    // 道路
    this.addMode(0, 0, 0, 'GLTFROOM/driveway_long.glb', 10, 10, 500, null);
    this.addMode(100, 0, 0, 'GLTFROOM/driveway_long.glb', 10, 10, 500, null);
    this.addMode(-100, 0, 0, 'GLTFROOM/driveway_long.glb', 10, 10, 500, null);
    this.addMode(0, 0, 0, 'GLTFROOM/driveway_long.glb', 10, 10, 500, Math.PI / 2);
    this.addMode(0, 0, 100, 'GLTFROOM/driveway_long.glb', 10, 10, 509, Math.PI / 2);
    this.addMode(0, 0, -100, 'GLTFROOM/driveway_long.glb', 10, 10, 508, Math.PI / 2);
    //tower
    this.addMode(30, 0, 10, 'tower/towerRound_bottomA.glb', 10, 10, 10, null);
    //文字
    // this.addText();

    const ambient = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(ambient);
    const axisHelper = new THREE.AxesHelper(250);
    this.scene.add(axisHelper);
    this.renderer = new THREE.WebGLRenderer();
    // eslint
    this.renderer.setClearColor('rgb(135,206,250)', 1.0);
    this.renderer.setSize(offsetWidth, offsetHeight);
    document.getElementById(this.container)?.appendChild(this.renderer.domElement);
    const controls = new Orbitcontrols(this.camera, this.renderer.domElement);
    controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera)
    })
  }



  addMode(x: number, y: number, z: number, path: string, scalex: number, scaley: number, scalez: number, rotateX: any) {
    // const loader = new GLTFLoader();
    this.loader.load(path, (gltf) => {
      gltf.scene.traverse(function (child: any) {
        if (child.isMesh) {
          child.material.emissive = child.material.color;
          child.material.emissiveMap = child.material.map;
        }
      });
      if (rotateX) {
        gltf.scene.rotateY(rotateX)
      }
      gltf.scene.position.set(x, y, z);
      gltf.scene.scale.set(scalex, scaley, scalez);
      this.scene.add(gltf.scene)
    }, undefined, (error) => {
      console.error(error);
    })
  }

  // addText() {
  //   let _this = this
  //   var loader = new THREE.FontLoader();
  //   loader.load('../../../node_modules/three/examples/fonts/gentilis_bold.typeface.json', function (font) {
  //     const geometry = new THREE.TextGeometry('wushui', {
  //       font: font,
  //       size: 5,
  //       height: 2,
  //       curveSegments: 30,
  //       bevelEnabled: true,
  //       bevelThickness: 0.5,
  //       bevelSize: 0.1,
  //       bevelSegments: 5
  //     });
  //     const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee })
  //     const text = new THREE.Mesh(geometry, material)
  //     text.position.set(-50, 0, 20)
  //     _this.scene.add(text)
  //   });
  // }


}

export default PowerRoom