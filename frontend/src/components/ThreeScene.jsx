<<<<<<< HEAD
import React, { useRef, useEffect } from 'react'
=======
import React, { useRef, useEffect, useCallback } from 'react'
>>>>>>> a28fd3c (fix: replaced invalid Python-style comment with valid JS comment)
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { popIn, floatY } from '../utils/animations.js'
import gsap from 'gsap'

const ThreeScene = ({ allocations, filterDomain, onInternSelect }) => {
  const mountRef = useRef(null)

<<<<<<< HEAD
=======
  const handleInternSelect = useCallback((data) => {
    onInternSelect(data)
  }, [onInternSelect])

>>>>>>> a28fd3c (fix: replaced invalid Python-style comment with valid JS comment)
  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x070716)
    scene.fog = new THREE.FogExp2(0x070716, 0.02)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 8, 22)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    renderer.shadowMap.enabled = true
    mount.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    const dir = new THREE.DirectionalLight(0xffffff, 0.9)
    dir.position.set(10, 20, 10)
    dir.castShadow = true
    scene.add(ambient, dir)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08

    const projectMeshes = {}
    const internMeshes = []
    const clickable = []

    function colorByDomain(domain) {
      const map = { Agile: 0x4facfe, 'Data Science': 0x6b5b95, Risk: 0xff7f50, default: 0xa8e6cf }
      return map[domain] || map.default
    }

    // Build projects
    allocations.projects.forEach((proj, idx) => {
      if (filterDomain !== 'all' && proj.domain !== filterDomain) return

      const geo = new THREE.IcosahedronGeometry(1.6, 2)
      const mat = new THREE.MeshStandardMaterial({
        color: colorByDomain(proj.domain),
        metalness: 0.3,
        roughness: 0.4,
        emissive: 0x061018
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set((idx - allocations.projects.length / 2) * 6, 0, (idx % 2 ? -2 : 2) * 2.5)
      mesh.userData = { type: 'project', ...proj }
      scene.add(mesh)
      projectMeshes[proj.id] = mesh
      popIn(mesh, 0.9)
      floatY(mesh, 0.4 + Math.random() * 0.6, 3 + Math.random() * 2)
    })

<<<<<<< HEAD
    # Build interns - NOTE: JS comment char wrong in python triple quotes? Keep as-is
=======
    // Build interns
>>>>>>> a28fd3c (fix: replaced invalid Python-style comment with valid JS comment)
    allocations.interns.forEach((intern, idx) => {
      if (filterDomain !== 'all') {
        const targetProj = allocations.projects.find(p => p.id === intern.assigned_project_id)
        if (!targetProj || targetProj.domain !== filterDomain) return
      }

      const g = new THREE.SphereGeometry(0.8, 32, 32)
      const mat = new THREE.MeshStandardMaterial({
        color: intern.match_score > 0.85 ? 0x00ffaa : 0xffff88,
        metalness: 0.2,
        roughness: 0.5,
        emissive: 0x001111
      })
      const mesh = new THREE.Mesh(g, mat)
      const projMesh = projectMeshes[intern.assigned_project_id]
      if (projMesh) {
        mesh.position.copy(projMesh.position).add(new THREE.Vector3((Math.random() - 0.5) * 2.6, (Math.random() - 0.5) * 1.6 + 1, (Math.random() - 0.5) * 2.6))
      } else {
        mesh.position.set((idx - allocations.interns.length / 2) * 2, 1.2, (Math.random() - 0.5) * 6)
      }
      mesh.userData = { type: 'intern', ...intern }
      scene.add(mesh)
      popIn(mesh, 0.9 + Math.random() * 0.8)
      floatY(mesh, 0.25 + Math.random() * 0.6, 2 + Math.random() * 3)
      internMeshes.push(mesh)
      clickable.push(mesh)
    })

    // Connections
    allocations.connections.forEach(conn => {
      const internMesh = internMeshes.find(m => m.userData.id === conn.from)
      const projMesh = Object.values(projectMeshes).find(m => m.userData.id === conn.to)
      if (!internMesh || !projMesh) return

      const curve = new THREE.CatmullRomCurve3([
        internMesh.position.clone(),
        internMesh.position.clone().lerp(projMesh.position, 0.5).add(new THREE.Vector3(0, 3, 0)),
        projMesh.position.clone()
      ])

      const geometry = new THREE.TubeGeometry(curve, 48, 0.06, 8, false)
      const material = new THREE.MeshBasicMaterial({ color: conn.color || 0xffff88, transparent: true, opacity: 0.8 })
      const tube = new THREE.Mesh(geometry, material)
      scene.add(tube)
      gsap.to(tube.material, { opacity: 0.35, duration: 1.8, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    })

<<<<<<< HEAD
    # Raycasting
=======
    // Raycasting
>>>>>>> a28fd3c (fix: replaced invalid Python-style comment with valid JS comment)
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    function onClick(e) {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(clickable)
      if (intersects.length) {
        const obj = intersects[0].object
<<<<<<< HEAD
        if (obj.userData && obj.userData.type === 'intern') onInternSelect(obj.userData)
=======
        if (obj.userData && obj.userData.type === 'intern') {
          handleInternSelect(obj.userData)
        }
>>>>>>> a28fd3c (fix: replaced invalid Python-style comment with valid JS comment)
      }
    }
    window.addEventListener('click', onClick)

    function onResize() {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    const tick = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
      mount.removeChild(renderer.domElement)
<<<<<<< HEAD
      scene.clear()
    }
  }, [allocations, filterDomain, onInternSelect])
=======

      // Dispose all objects
      scene.traverse(object => {
        if (!object.isMesh) return
        object.geometry?.dispose()
        if (Array.isArray(object.material)) {
          object.material.forEach(m => m.dispose())
        } else {
          object.material?.dispose()
        }
      })

      renderer.dispose()
    }
  }, [allocations, filterDomain, handleInternSelect])
>>>>>>> a28fd3c (fix: replaced invalid Python-style comment with valid JS comment)

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
}

export default ThreeScene
