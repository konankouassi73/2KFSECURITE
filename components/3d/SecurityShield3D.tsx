'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Optimisé pour les performances
function ShieldMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  
  const isMobile = viewport.width < 5
  
  useFrame((state) => {
    if (meshRef.current) {
      // Animation simplifiée
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.08
    }
  })

  const positionX = isMobile ? 0 : 2.5 

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group position={[positionX, 0, 0]} scale={isMobile ? 1 : 1.6}>
        <mesh ref={meshRef}>
          {/* Géométrie simplifiée */}
          <icosahedronGeometry args={[1, 0]} /> 
          <MeshDistortMaterial
            color="#323358"
            clearcoat={0.8}
            metalness={0.7}
            roughness={0.3}
            distort={0.3}
            speed={1}
          />
        </mesh>
        
        {/* Un seul anneau */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 8, 64]} />
          <meshBasicMaterial color="#c74449" />
        </mesh>
      </group>
    </Float>
  )
}

export function SecurityShield3D() {
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Observer la visibilité pour désactiver le rendu quand hors écran
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="h-full w-full absolute inset-0">
      {isVisible && (
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }} 
          dpr={1} // DPR réduit pour performance
          frameloop="demand" // Rendu à la demande
          gl={{
            powerPreference: 'low-power',
            antialias: false,
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl, invalidate }) => {
            // Forcer le rendu initial
            invalidate()
            
            // Animation loop manuelle plus légère
            const animate = () => {
              if (isVisible) {
                invalidate()
                requestAnimationFrame(animate)
              }
            }
            animate()
            
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault()
            }, false)
          }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#c74449" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#323358" />
          <ShieldMesh />
        </Canvas>
      )}
    </div>
  )
}
