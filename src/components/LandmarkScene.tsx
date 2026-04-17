import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, OrbitControls, Text, Center } from "@react-three/drei";
import * as THREE from "three";

// Explicitly extend the R3F catalogue with all Three.js classes so that
// lowercase JSX elements like <mesh>, <coneGeometry>, etc. resolve under
// React 19 + r3f v9 + Vite HMR. Without this, children of <Canvas> can
// silently fail to mount.
extend(THREE);

export type LandmarkKind = "tower" | "skytree" | "pagoda" | "torii";

/* -------- Procedural landmark meshes ---------- */

function TokyoTower() {
  // Lattice tower made of 4 tapered cones + observation deck
  return (
    <group>
      {/* Base lattice */}
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.8, 1.2, 4, 6, true]} />
        <meshStandardMaterial color="#ff2d55" emissive="#ff2d55" emissiveIntensity={0.5} wireframe />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[0.4, 1.2, 4, 6, true]} />
        <meshStandardMaterial color="#ff5577" emissive="#ff2d55" emissiveIntensity={0.4} wireframe />
      </mesh>
      {/* Decks */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff2d55" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.1, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff2d55" emissiveIntensity={0.3} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 2.6, 0]}>
        <cylinderGeometry args={[0.02, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#ff2d55" emissive="#ff2d55" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function Skytree() {
  return (
    <group>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.18, 0.45, 1.6, 12]} />
        <meshStandardMaterial color="#e0e7ff" emissive="#ff2d8a" emissiveIntensity={0.25} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.32, 0.18, 0.45, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff2d8a" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.22, 0.32, 0.3, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff2d8a" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 2.7, 0]}>
        <cylinderGeometry args={[0.015, 0.04, 1.0, 8]} />
        <meshStandardMaterial color="#ff2d8a" emissive="#ff2d8a" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Pagoda() {
  // Senso-ji 5-tier pagoda
  const tiers = [0, 1, 2, 3, 4];
  return (
    <group position={[0, -0.4, 0]}>
      {tiers.map((i) => {
        const y = 0.2 + i * 0.5;
        const w = 0.9 - i * 0.12;
        return (
          <group key={i} position={[0, y, 0]}>
            {/* roof */}
            <mesh position={[0, 0.18, 0]}>
              <coneGeometry args={[w, 0.22, 4]} />
              <meshStandardMaterial color="#ff2d55" emissive="#ff2d55" emissiveIntensity={0.4} />
            </mesh>
            {/* body */}
            <mesh>
              <boxGeometry args={[w * 0.7, 0.28, w * 0.7]} />
              <meshStandardMaterial color="#1a0a14" emissive="#ff5577" emissiveIntensity={0.15} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, 2.9, 0]}>
        <cylinderGeometry args={[0.02, 0.04, 0.6, 8]} />
        <meshStandardMaterial color="#ff2d8a" emissive="#ff2d8a" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Torii() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* pillars */}
      <mesh position={[-0.7, 0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 1.6, 12]} />
        <meshStandardMaterial color="#ff2d55" emissive="#ff2d55" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.7, 0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 1.6, 12]} />
        <meshStandardMaterial color="#ff2d55" emissive="#ff2d55" emissiveIntensity={0.4} />
      </mesh>
      {/* lower beam */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.7, 0.1, 0.12]} />
        <meshStandardMaterial color="#1a0a14" emissive="#ff2d8a" emissiveIntensity={0.3} />
      </mesh>
      {/* upper beam (kasagi) - curved via flattened torus */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[2.0, 0.16, 0.18]} />
        <meshStandardMaterial color="#ff2d55" emissive="#ff2d55" emissiveIntensity={0.5} />
      </mesh>
      {/* small cap */}
      <mesh position={[0, 1.78, 0]}>
        <boxGeometry args={[2.1, 0.08, 0.22]} />
        <meshStandardMaterial color="#1a0a14" />
      </mesh>
    </group>
  );
}

function LandmarkMesh({ kind }: { kind: LandmarkKind }) {
  if (kind === "tower") return <TokyoTower />;
  if (kind === "skytree") return <Skytree />;
  if (kind === "pagoda") return <Pagoda />;
  return <Torii />;
}

/* ---------- Wrapped text ring ---------- */

function TextRing({ text, radius = 2.2, y = 1.0 }: { text: string; radius?: number; y?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const chars = useMemo(() => Array.from(text), [text]);
  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y -= dt * 0.15;
  });
  return (
    <group ref={groupRef} position={[0, y, 0]}>
      {chars.map((ch, i) => {
        const angle = (i / chars.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Text
            key={i}
            position={[x, 0, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            fontSize={0.22}
            color="#ff2d8a"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#ff2d8a"
          >
            {ch === " " ? "·" : ch}
          </Text>
        );
      })}
    </group>
  );
}

/* ---------- Scene ---------- */

export function LandmarkScene({
  kind,
  ringText,
  height = 480,
}: {
  kind: LandmarkKind;
  ringText: string;
  height?: number;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-border"
      style={{
        height,
        background:
          "radial-gradient(circle at 30% 20%, oklch(0.35 0.22 350 / 60%), oklch(0.08 0.02 350) 70%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <Canvas
        camera={{ position: [5, 3, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[3, 4, 3]} intensity={40} color="#ff2d8a" distance={15} />
        <pointLight position={[-3, 2, -3]} intensity={30} color="#ff2d55" distance={15} />
        <pointLight position={[0, -1, 4]} intensity={20} color="#ff5577" distance={12} />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
            <Center disableY>
              <LandmarkMesh kind={kind} />
            </Center>
          </Float>
          <TextRing text={`${ringText}   ✦   `} radius={2.6} y={1.4} />
          <TextRing text={`${ringText}   ✦   `} radius={2.2} y={0.3} />
        </Suspense>

        {/* ground glow disc */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <ringGeometry args={[1.2, 3.6, 64]} />
          <meshBasicMaterial color="#ff2d8a" transparent opacity={0.15} />
        </mesh>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 1, 0]}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
