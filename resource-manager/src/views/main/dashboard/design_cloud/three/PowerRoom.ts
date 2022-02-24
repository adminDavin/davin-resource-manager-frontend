import * as THREE from 'three';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Orbitcontrols from 'three-orbitcontrols'
import roomimg from '@/assets/jinshu.jpg'
import wallsimg from '@/assets/qiang.jpg'
// import modes from '../../assets/GLTF/detail_awning.glb'
class PowerRoom {
  public camera: THREE.Camera | any;
  public scene: THREE.Scene | any;
  public renderer: THREE.Renderer | any;
  public geometry: THREE.BoxGeometry | any;
  public mesh: THREE.Mesh | any;
  public container: string;
  public option: Object;

  constructor(str: string, opt: Object) {
    this.container = str;
    this.option = opt;
    // this.init()
  }

  init(offsetWidth: number, offsetHeight: number) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 150, 150);
    this.camera.lookAt(this.scene.position);

    this.plantGeo();
    this.drawWall(200, 24, 2, 0, 12, -50);
    this.drawWall(2, 24, 100, 100, 12, 0);
    this.drawWall(200, 24, 2, 0, 12, 50);
    this.drawWall(2, 24, 100, -100, 12, 0);
    this.drawHouse(20, 20, 20, -80, 10, -30);
    this.drawHouse(20, 20, 20, -50, 10, -30)
    this.drawHouse(20, 20, 20, -20, 10, -30)
    this.drawHouse(20, 20, 20, 10, 10, -30)
    this.drawHouse(20, 20, 20, 40, 10, -30);
    this.drawHouse(20, 20, 20, 70, 10, -30)
    this.drawHouse(20, 20, 20, -80, 10, 0);
    this.drawHouse(20, 20, 20, -50, 10, 0);
    this.drawHouse(20, 20, 20, -20, 10, 0);
    this.drawHouse(20, 20, 20, 10, 10, 0);
    this.drawHouse(20, 20, 20, 40, 10, 0);
    this.drawHouse(20, 20, 20, 70, 10, 0);
    this.drawHouse(20, 20, 20, -80, 10, 30);
    this.drawLine(-70, 3, 40, 95, 3, 40);
    this.drawLine(95, 3, 40, 95, 3, -55);
    this.drawLine(-70, 3, 30, 90, 3, 30);
    this.drawLine(90, 3, 30, 90, 3, -55);
    this.addMode();
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

  plantGeo() {
    const geometry = new THREE.BoxBufferGeometry(200, 2, 100);
    const matrerial = new THREE.MeshBasicMaterial({ color: 0x626262, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, matrerial);
    plane.position.set(0, 0, 0)
    this.scene.add(plane);
  }

  drawWall(x, y, z, px, py, pz) {
    const geometry = new THREE.BoxBufferGeometry(x, y, z);
    const textureLoader = new THREE.TextureLoader();
    const imgs = textureLoader.load(wallsimg);
    const matrerial = new THREE.MeshBasicMaterial({
      map: imgs
    })
    const wall = new THREE.Mesh(geometry, matrerial);
    wall.position.set(px, py, pz);
    this.scene.add(wall)
  }

  drawHouse(x: number, y: number, z: number, px: number, py: number, pz: number) {
    const gerometry = new THREE.BoxGeometry(x, y, z);
    const textureLoader = new THREE.TextureLoader();
    const imgs = textureLoader.load(roomimg);
    // console.log(imgs)
    const material = new THREE.MeshBasicMaterial({
      map: imgs
    })
    const house = new THREE.Mesh(gerometry, material);
    house.position.set(px, py, pz)
    this.scene.add(house);
  }

  drawLine(x, y, z, ex, ey, ez) {
    // var path = new THREE.CatmullRomCurve3([
    //   new THREE.Vector3(-50, 5, 40),
    //   new THREE.Vector3(50, 5, 40),
    //   new THREE.Vector3(50, 5, -40)
    // ]);
    const path = new THREE.LineCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(ex, ey, ez)
    );
    // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
    const geometry = new THREE.TubeGeometry(path, 40, 0.5, 25);
    // const imgs = new THREE.TextureLoader().load(roomimg)
    var material = new THREE.LineBasicMaterial({ color: 0x22ac38 });
    var line = new THREE.Line(geometry, material);
    this.scene.add(line);
  }

  addMode() {
    const loader = new GLTFLoader();
    loader.load('GLTF/low_buildingD.glb', (gltf) => {
      console.log(gltf)
      gltf.scene.position.set(300, 0, 200)
      this.scene.add(gltf.scene)
    }, undefined, (error) => {
      console.error(error);
    })

  }


}

export default PowerRoom