'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Center, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Version 3D améliorée avec effet de glow
function Logo3DModel() {
  const groupRef = useRef<THREE.Group>(null)
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05
    }
    if (textRef.current) {
      // Effet de pulsation subtile
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      textRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Center ref={groupRef}>
      <Text
        ref={textRef}
        fontSize={2}
        color="#323358"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        outlineWidth={0.05}
        outlineColor="#fafafa"
      >
        2KF
      </Text>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#323358" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#c74449" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#323358" />
    </Center>
  )
}

export function Logo3D() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mb-8 relative"
    >
      {/* Version 2D avec animations améliorées */}
      <div className="relative">
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold font-heading bg-gradient-to-r from-primary-dark via-primary-accent via-primary-dark to-primary-accent bg-clip-text text-transparent bg-[length:200%_auto]"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          2KF
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl sm:text-2xl text-primary-gray font-semibold mt-2"
        >
          SÉCURITÉ
        </motion.div>
        
        {/* Effet de glow animé */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 blur-2xl bg-primary-accent/30 -z-10"
          style={{
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Version 3D optionnelle (décommenter si vous avez les fonts) */}
      {/*
      <div className="h-32 w-full mt-4">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Logo3DModel />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      */}
    </motion.div>
  )
}

