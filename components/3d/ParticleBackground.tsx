'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const particlesCount = 1500
  const positions = useRef<Float32Array>(new Float32Array(particlesCount * 3))

  useEffect(() => {
    for (let i = 0; i < particlesCount; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 20
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    return () => {
      if (ref.current) {
        if (ref.current.geometry) ref.current.geometry.dispose()
      }
    }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.03
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions.current} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#323358"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  )
}

function SecurityGrid() {
  const gridRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={gridRef}>
      <gridHelper args={[30, 30, '#323358', '#323358']} position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial attach="material" color="#323358" transparent opacity={0.1} />
      </gridHelper>
    </group>
  )
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[3, 2, -3]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#c74449" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[-4, -1, -2]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#323358" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh position={[2, -3, -1]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color="#323358" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

export function ParticleBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    // Vérifier le support WebGL
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setHasWebGL(!!gl)
    } catch {
      setHasWebGL(false)
    }
  }, [])

  if (!isMounted) return null

  // Fallback si pas de WebGL
  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-light to-white">
        <div className="absolute inset-0 security-grid opacity-30" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: true,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            console.warn('WebGL context lost')
          }, false)
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#323358" />
        <Particles />
        <SecurityGrid />
        <FloatingShapes />
      </Canvas>
    </div>
  )
}
