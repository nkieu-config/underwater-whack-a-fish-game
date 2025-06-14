import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js";
import {
  MeshPhongMaterial,
  TextureLoader,
} from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const popup = document.getElementById("gameOverPopup");
  const BbShark = document.getElementById("BbShark");
  const timeoutS = document.getElementById("timeoutS");
  const gameO = document.getElementById("gameO");
  const sound = document.getElementById("ngum");

  BbShark.playbackRate = 1.9;

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  const scene = new THREE.Scene();

  const textureLoader = new THREE.TextureLoader();
  const backgroundImage = textureLoader.load(
    "https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg"
  );
  scene.background = backgroundImage;

  const studioLight1 = new THREE.PointLight(0xffffff, 0.5);
  studioLight1.position.set(15, 31, 15);
  studioLight1.castShadow = true;
  studioLight1.shadow.bias = -0.001;
  scene.add(studioLight1);

  const studioLight2 = new THREE.PointLight(0xffffff, 1.2);
  studioLight2.position.set(-1, 35, -15);
  studioLight2.castShadow = true;
  studioLight2.shadow.mapSize.width = 2048;
  studioLight2.shadow.mapSize.height = 2048;
  studioLight2.shadow.bias = -0.001;
  scene.add(studioLight2);

  const studioLight3 = new THREE.PointLight(0xffffff, 0.5);
  studioLight3.position.set(-22, 40, 10);
  studioLight3.castShadow = true;
  studioLight3.shadow.bias = -0.001;
  scene.add(studioLight3);

  {
    const color = 0x404040;
    const intensity = 1.5;
    const ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

    const direction = new THREE.Vector3(0, 0, -1);

    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  const fixedPositionsAxolotl = [
    new THREE.Vector3(-6, 7.5, -14.5),
    new THREE.Vector3(-3, 7.5, -14.5),
    new THREE.Vector3(0, 7.5, -14.5),
    new THREE.Vector3(-6, 7.5, -11.5),
    new THREE.Vector3(-3, 7.5, -11.5),
    new THREE.Vector3(0, 7.5, -11.5),
    new THREE.Vector3(-6, 7.5, -8.5),
    new THREE.Vector3(-3, 7.5, -8.5),
    new THREE.Vector3(0, 7.5, -8.5),
  ];

  const fixedPositionsJellyfish = [
    new THREE.Vector3(-6, 5, -5.5),
    new THREE.Vector3(-3, 5, -5.5),
    new THREE.Vector3(0, 5, -5.5),
    new THREE.Vector3(-6, 5, -2.5),
    new THREE.Vector3(-3, 5, -2.5),
    new THREE.Vector3(0, 5, -2.5),
    new THREE.Vector3(-6, 5, -0.5),
    new THREE.Vector3(-3, 5, -0.5),
    new THREE.Vector3(0, 5, -0.5),
  ];

  let axolotl;
  let jellyfish;
  let hand;
  let board;
  let shark_ham_1;
  let score = 0;
  let heart = 3;
  let stop = false;
  let timeInSeconds = 20;

  function playSound() {
    sound.currentTime = 0;
    sound.play();
  }

  function stopAll() {
    stop = true;
    score = 0;
    heart = 3;

    BbShark.pause();
    BbShark.currentTime = 0;
  }

  function resetHearts() {
    guiParams.heart = heart;
    guiParams.score = score;

    const heartIcons = document.querySelectorAll(".heart-icon");
    heartIcons.forEach((heartIcon, index) => {
      heartIcon.style.backgroundImage =
        "url(https://i.pinimg.com/originals/93/27/c7/9327c75c610c9a82c74b23eac974dbe6.png)";
      heartIcon.style.backgroundSize = "contain";
    });
  }

  const gui = new GUI();
  const guiParams = {
    score: 0,
    heart: 3,
    start: () => {
      popup.style.display = "none";
      stop = false;
      hand.visible = true;
      score = 0;
      heart = 3;
      resetHearts();

      BbShark.play();
      BbShark.currentTime = 0;

      countdownTimer(timeInSeconds);

      timeoutS.pause();
      gameO.pause();
    },
  };

  gui.add(guiParams, "score").name("Score").listen();
  gui.add(guiParams, "heart").name("Hearts").listen();
  gui.add(guiParams, "start").name("Start");

  stopAll();

  let timerInterval;

  function countdownTimer(seconds) {
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
      if (stop) {
        clearInterval(timerInterval);
        stopAll();
        return;
      }

      seconds--;

      let mins = Math.floor(seconds / 60);
      let secs = seconds % 60;

      mins = mins < 10 ? "0" + mins : mins;
      secs = secs < 10 ? "0" + secs : secs;

      let displayTimer = mins + ":" + secs;
      document.getElementById("timer").textContent = displayTimer;

      if (seconds === 0) {
        clearInterval(timerInterval);
        document.getElementById("timer").textContent = "TIME OUT!";
        stop = true;
        BbShark.pause();
        timeoutS.currentTime = 0;
        timeoutS.play();
      }
    }, 1000);
  }

  function setRandomPosition(object, positionsArray) {
    if (stop) return;

    let randomPosition;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * positionsArray.length);
      randomPosition = positionsArray[randomIndex];
    } while (
      randomPosition.equals(axolotl.position) ||
      randomPosition.equals(jellyfish.position)
    );

    object.position.copy(randomPosition);
  }

  function randomCreature() {
    if (stop) return;

    scene.remove(jellyfish);
    scene.remove(axolotl);

    let randomCreatureIndex = Math.floor(Math.random() * 6) + 1;

    if (randomCreatureIndex === 1 || randomCreatureIndex === 2) {
      scene.add(jellyfish);
      setRandomPosition(jellyfish, fixedPositionsJellyfish);
    } else {
      scene.add(axolotl);
      setRandomPosition(axolotl, fixedPositionsAxolotl);
    }
  }

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("assets/models/axolotl.gltf", (gltf) => {
    axolotl = gltf.scene;
    axolotl.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  });

  gltfLoader.load("assets/models/jellyfish.gltf", (gltf) => {
    jellyfish = gltf.scene;
    const originalMaterials = [];
    jellyfish.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  });

  gltfLoader.load("assets/models/hand.gltf", (gltf) => {
    hand = gltf.scene;

    const originalMaterials = [];

    const textureLoader = new TextureLoader();

    hand.traverse((child) => {
      if (child.isMesh) {
        originalMaterials.push(child.material.clone());

        if (child.material.map) {
          const blinnPhongMaterialWithTexture = new MeshPhongMaterial({
            map: child.material.map,
            shininess: 15,
            specular: 0x888888,
          });

          child.material = blinnPhongMaterialWithTexture;
        } else {
          const blinnPhongMaterial = new MeshPhongMaterial({
            color: child.material.color.clone(),
            shininess: 15,
            specular: 0x888888,
          });

          child.material = blinnPhongMaterial;
        }
      }
    });

    scene.add(hand);
    hand.visible = false;
  });

  gltfLoader.load("assets/models/shark_ham_1.gltf", (gltf) => {
    shark_ham_1 = gltf.scene;
    shark_ham_1.visible = false;

    const originalMaterials = [];

    const textureLoader = new TextureLoader();

    shark_ham_1.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        originalMaterials.push(child.material.clone());

        if (child.material.map) {
          const blinnPhongMaterialWithTexture = new MeshPhongMaterial({
            map: child.material.map,
            shininess: 15,
            specular: 0x888888,
          });

          child.material = blinnPhongMaterialWithTexture;
        } else {
          const blinnPhongMaterial = new MeshPhongMaterial({
            color: child.material.color.clone(),
            shininess: 15,
            specular: 0x888888,
          });

          child.material = blinnPhongMaterial;
        }
      }
    });
    scene.add(shark_ham_1);
  });

  gltfLoader.load("assets/models/board.gltf", (gltf) => {
    board = gltf.scene;
    board.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(board);

    const boardBox = new THREE.Box3().setFromObject(board);
    const boardBoxSize = boardBox.getSize(new THREE.Vector3()).length();
    const boardBoxCenter = boardBox.getCenter(new THREE.Vector3());
    const distance = boardBoxSize;

    camera.position.set(-3, 36, 20);
    camera.lookAt(-2, 0, -35);
    camera.far = distance * 1000;
    camera.updateProjectionMatrix();
  });

  const raycasterAxolotl = new THREE.Raycaster();
  const raycasterJellyfish = new THREE.Raycaster();

  const mouse = new THREE.Vector2();

  function showAndHideShark(position) {
    if (shark_ham_1.visible) {
      shark_ham_1.visible = false;
      hand.visible = true;
    } else {
      shark_ham_1.visible = true;
      shark_ham_1.position.copy(position);
      hand.visible = false;
      setTimeout(() => {
        shark_ham_1.visible = false;
        hand.visible = true;
      }, 100);
    }
  }

  let lastAxolotlPosition = new THREE.Vector3();
  function onClickAxolotl(event) {
    if (stop) return;

    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

    raycasterAxolotl.setFromCamera(mouse, camera);
    const intersectsAxolotl = raycasterAxolotl.intersectObjects(
      [axolotl],
      true
    );

    for (const intersect of intersectsAxolotl) {
      lastAxolotlPosition.copy(intersect.point);

      if (scene.children.includes(axolotl)) {
        showAndHideShark(lastAxolotlPosition);
        setTimeout(() => {
          playSound();
          scene.remove(axolotl);
          score++;
          guiParams.score = score;
        }, 50);
        event.stopPropagation();
        return;
      }
    }
  }

  let lastJellyfishPosition = new THREE.Vector3();
  function onClickJellyfish(event) {
    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

    raycasterJellyfish.setFromCamera(mouse, camera);

    const intersectsJellyfish = raycasterJellyfish.intersectObjects(
      [jellyfish],
      true
    );

    for (const intersect of intersectsJellyfish) {
      lastJellyfishPosition.copy(intersect.point);

      if (scene.children.includes(jellyfish)) {
        showAndHideShark(lastJellyfishPosition);
        setTimeout(() => {
          playSound();
          scene.remove(jellyfish);
          guiParams.heart--;
          if (guiParams.heart >= 0) {
            const heartIcon = document.querySelector(
              `.heart-icon:nth-child(${guiParams.heart + 1})`
            );
            heartIcon.style.backgroundImage =
              "url(https://clipart-library.com/img1/1672270.png)";
            heartIcon.style.backgroundSize = "14px 13.5px";
          }
          if (guiParams.heart === 0) {
            stop = true;
            gameO.currentTime = 0;
            gameO.play();
            gameO.volume = 0.5;
            popup.style.display = "block";
          }
        }, 50);
        event.stopPropagation();
        return;
      }
    }
  }

  canvas.addEventListener("click", (event) => {
    if (event.target === canvas) {
      onClickAxolotl(event);
      onClickJellyfish(event);
    }
  });

  setInterval(() => {
    randomCreature();
  }, 650);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
