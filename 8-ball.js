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

const ambientLight = new THREE.AmbientLight(0x777777, 10, 0)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.05  , 0)
pointLight.position.set(1000, 1000, -2000)
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000 )
camera.position.z = -2500


// Loader =================
const loader = new THREE.TextureLoader()
// Make the 8-ball =================

var mq1 = window.matchMedia( "(max-width: 1024px)" );
if (mq1.matches) {
    // window width is at less than 1024px
    const makeBall = function() {
      const texture = loader.load("lib/8-ball.png")
      const geometry = new THREE.SphereGeometry(240, 38.4, 38.4)
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

    const ball = makeBall()
    ball.position.y = -50
    ball.rotateX(0.2)
    ball.rotateZ(0.2)

    // hold the camera positions
    let currentX = 0
    let currentY = 0
    let aimX = 0
    let aimY = 0

    // Animation loop

    const animate = function () {
      const diffX = aimX - currentX
      const diffY = aimY - currentY

      currentX = currentX + diffX * 0.05
      currentY = currentY + diffY * 0.05

      ball.position.x = currentX
      ball.position.y = currentY

      camera.lookAt(scene.position)

      ball.rotateY(0.008)

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", function() {
      camera.aspect = window.innerWidth /window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    document.addEventListener("mousemove", function (event) {
        aimX = ((window.innerWidth / 2) - event.pageX) * 2
      	aimY = ((window.innerHeight / 2) - event.pageY) * 2
    })

    document.addEventListener("touchmove", function (event) {
        aimX = ((window.innerWidth / 2) - event.pageX) * 2
      	aimY = ((window.innerHeight / 2) - event.pageY) * 2
    })
}
else {
    // window width is greater than 1024px
    const makeBall = function() {
      const texture = loader.load("lib/8-ball.png")
      const geometry = new THREE.SphereGeometry(600, 96, 96)
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

    const ball = makeBall()
    ball.position.y = -50
    ball.rotateX(0.2)
    ball.rotateZ(0.2)

    // hold the camera positions
    let currentX = 0
    let currentY = 0
    let aimX = 0
    let aimY = 0

    // Animation loop

    const animate = function () {
      const diffX = aimX - currentX
      const diffY = aimY - currentY

      currentX = currentX + diffX * 0.05
      currentY = currentY + diffY * 0.05

      ball.position.x = currentX
      ball.position.y = currentY

      camera.lookAt(scene.position)

      ball.rotateY(0.008)

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", function() {
      camera.aspect = window.innerWidth /window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    document.addEventListener("mousemove", function (event) {
        aimX = ((window.innerWidth / 2) - event.pageX) * 2
      	aimY = ((window.innerHeight / 2) - event.pageY) * 2
    })

    document.addEventListener("touchmove", function (event) {
        aimX = ((window.innerWidth / 2) - event.pageX) * 2
      	aimY = ((window.innerHeight / 2) - event.pageY) * 2
    })
}
