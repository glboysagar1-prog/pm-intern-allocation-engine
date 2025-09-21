import gsap from 'gsap'

export function popIn(mesh, duration = 0.9) {
  try {
    gsap.fromTo(mesh.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration, ease: 'elastic.out(1,0.5)' })
  } catch(e) {
    // fail silently in server environments
  }
}

export function floatY(mesh, amplitude = 0.6, time = 3) {
  try {
    gsap.to(mesh.position, { y: `+=${amplitude}`, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: time })
  } catch(e) {}
}
