import * as THREE from "three";

const threeInit = (e: Element, w: number, h: number) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    w / h,
    0.1,
    1000
  );

  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  e.appendChild(renderer.domElement);

  const points: any = [];
  points.push(new THREE.Vector3(- 10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const line = new THREE.Line(geometry, material);

  scene.add(line);
  renderer.render( scene, camera );
  
};



export {
  threeInit
};