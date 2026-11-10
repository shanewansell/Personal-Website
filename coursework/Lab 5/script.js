let scene, camera, renderer, box;
let bounceSpeed = 0.02;
let bounceHeight = 0.5;
let bounceTime = 0;
let coneRotation = { rotateX: 0, rotateY: 0, rotateZ: 0 };

init();

function init(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 3;
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true; 
  document.body.appendChild( renderer.domElement );

  const light = new THREE.DirectionalLight();
  light.position.set(0, 1, 2);
  light.castShadow = true;
  scene.add(light);

  const material = new THREE.MeshStandardMaterial({color: new THREE.Color('skyblue')});
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  box = new THREE.Mesh(geometry, material);
  box.position.x = 0;
  box.castShadow = true;
  scene.add(box);

  const greenMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color(0x3aa505)});
  const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
  cone = new THREE.Mesh(coneGeometry, greenMaterial)
  cone.position.x = 2.5;
  cone.castShadow = true;
  scene.add(cone);

  const redMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color(0xff0000)});
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  sphere = new THREE.Mesh(sphereGeometry, redMaterial);
  sphere.position.x = -2.5;
  sphere.castShadow = true;
  scene.add(sphere);

  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1;
  plane.receiveShadow = true;
  scene.add(plane);

  const gui = new dat.GUI();

  gui.add(coneRotation, 'rotateX', 0, Math.PI * 2).name('Rotate X');
  gui.add(coneRotation, 'rotateY', 0, Math.PI * 2).name('Rotate Y');
  gui.add(coneRotation, 'rotateZ', 0, Math.PI * 2).name('Rotate Z');
  
  window.addEventListener( 'resize', onResize, false);
  
  update();
}

function update(){
  requestAnimationFrame( update );
	renderer.render( scene, camera );

  box.rotation.y += 0.01;

  bounceTime += bounceSpeed;
  sphere.position.y = Math.abs(Math.sin(bounceTime) * bounceHeight);

  cone.rotation.x = coneRotation.rotateX;
  cone.rotation.y = coneRotation.rotateY;
  cone.rotation.z = coneRotation.rotateZ;
}

function onResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}