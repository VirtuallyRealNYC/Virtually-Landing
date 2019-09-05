const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 0)

const sectionTag = document.getElementById('8-ball')
sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0x777777, 2.5, 0)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.05  , 0)
pointLight.position.set(1000, 1000, -2000)
scene.add(pointLight)


// hold the camera positions
let currentX = 0
let currentY = 0
let aimX = 0
let aimY = 0
let isMouseDown = false


// Obj Loader ================================================
const objLoader = new THREE.OBJLoader()
const mtlLoader = new THREE.MTLLoader()


var axis = new THREE.Vector3( 1, 10, 0 ).normalize();

let ball = null

mtlLoader.load("lib/magicEightBall.mtl", function(materials) {
  objLoader.setMaterials(materials)
  objLoader.load("lib/magicEightBall.obj", function(obj) {
    obj.rotateX(5)
    obj.position.z = 0
    ball = obj
    scene.add(obj)
  })
})



// Texture Loader =================
const loader = new THREE.TextureLoader()

// Make the 8-ball =================
const makeBall = function() {
  const texture = loader.load("lib/8-ball.png")
  const geometry = new THREE.SphereGeometry(6, .96, .96)
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    emissive: 0x00000,
    specular: 0xffffff,
    shininess: 50
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  return mesh
}

// const eightball = makeBall()

// Group =============================
// var group = new THREE.Group();
// group.add( eightball );
// group.add( ball );
//
// scene.add( group );



// Media Queries ===============================================

var mq1 = window.matchMedia( "(max-width: 1024px)" );
if (mq1.matches) {
    // window width is at less than 1024px
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.z = -400

    // Animation loop

    const animate = function () {
      const diffX = aimX - currentX
      const diffY = aimY - currentY

      currentX = currentX + diffX * 0.05
      currentY = currentY + diffY * 0.05

      if(ball){

        // ball.rotateY(-0.008)
        // ball.rotateX(-0.006)
        // ball.rotateZ(-0.004)
        ball.rotateOnAxis( axis, Math.PI * 0.005 )
        ball.position.x = currentX
        ball.position.y = currentY
      }

      camera.lookAt(scene.position)

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()

    document.addEventListener("touchstart", function () {
    isMouseDown = true
    startX = event.pageX
    startY = event.pageY
  })

  document.addEventListener("touchend", function () {
    isMouseDown = false
  })

    // window.addEventListener("resize", function() {
    //   camera.aspect = window.innerWidth /window.innerHeight
    //   camera.updateProjectionMatrix()
    //
    //   renderer.setSize(window.innerWidth, window.innerHeight)
    // })

    document.addEventListener("mousemove", function (event) {
        aimX = ((window.innerWidth / 2) - event.pageX) * 2
      	aimY = ((window.innerHeight / 2) - event.pageY) * 2
    })

    document.addEventListener("touchmove", function (event) {
      if(isMouseDown) {
        let currentRotation = new THREE.Matrix4();
                currentRotation.makeRotationFromEuler(ball.rotation);

                let newEuler = new THREE.Euler((event.pageY - startY) / 100, (event.pageX - startX) / 100, 0);
                let newRotation = new THREE.Matrix4();
                newRotation.makeRotationFromEuler(newEuler);

                let finalRotation = new THREE.Matrix4();
                finalRotation.multiplyMatrices(newRotation, currentRotation);

                ball.rotation.setFromRotationMatrix(finalRotation);

                startX = event.pageX;
                startY = event.pageY;
      }
    })
}
else {
    // window width is greater than 1024px ===============================================================================================================================================

    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.z = -155

    // Animation loop

    const animate = function () {
      const diffX = aimX - currentX
      const diffY = aimY - currentY

      currentX = currentX + diffX * 0.05
      currentY = currentY + diffY * 0.05

      if(ball){

        // ball.rotateY(-0.008)
        // ball.rotateX(-0.006)
        // ball.rotateZ(-0.004)
        ball.rotateOnAxis( axis, Math.PI * 0.005 )
        ball.position.x = currentX
        ball.position.y = currentY
      }

      // if(ball){
      //   group.rotateY(-0.008)
      // }


      camera.lookAt(scene.position)

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()

    sectionTag.addEventListener('wheel', onMouseWheel, false);

      function onMouseWheel(event) {
          event.preventDefault();

        let currentRotation = new THREE.Matrix4();
                currentRotation.makeRotationFromEuler(ball.rotation);

                let newEuler = new THREE.Euler(event.deltaY * 0.007, event.deltaX * 0.007, 0);
                let newRotation = new THREE.Matrix4();
                newRotation.makeRotationFromEuler(newEuler);

                let finalRotation = new THREE.Matrix4();
                finalRotation.multiplyMatrices(newRotation, currentRotation);

                ball.rotation.setFromRotationMatrix(finalRotation);
              }


    window.addEventListener("resize", function() {
      camera.aspect = window.innerWidth /window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    document.addEventListener("mousemove", function (event) {
        aimX = ((window.innerWidth / 2) - event.pageX) * 0.08
      	aimY = ((window.innerHeight / 2) - event.pageY) * 0.08
    })

    document.addEventListener("touchmove", function (event) {
        aimX = ((window.innerWidth / 2) - event.pageX) * 0.08
      	aimY = ((window.innerHeight / 2) - event.pageY) * 0.08
    })
}
