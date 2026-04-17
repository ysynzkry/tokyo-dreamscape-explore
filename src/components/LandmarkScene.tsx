import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

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
  // Distribute characters along a circle
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
          <group key={i} position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
            <Text3D
              font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
              size={0.18}
              height={0.03}
              curveSegments={4}
              bevelEnabled
              bevelThickness={0.005}
              bevelSize={0.005}
            >
              {ch === " " ? "·" : ch}
              <meshStandardMaterial
                color="#ff2d8a"
                emissive="#ff2d8a"
                emissiveIntensity={0.8}
              />
            </Text3D>
          </group>
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
      className="relative w-full overflow-hidden rounded-2xl border border-border bg-ink"
      style={{ height }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <Canvas camera={{ position: [4, 2.5, 4], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#0a0510"]} />
        <fog attach="fog" args={["#0a0510", 6, 14]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 4, 3]} intensity={2} color="#ff2d8a" />
        <pointLight position={[-3, 2, -3]} intensity={1.5} color="#ff2d55" />
        <pointLight position={[0, -2, 0]} intensity={0.5} color="#ff5577" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
            <Center disableY>
              <LandmarkMesh kind={kind} />
            </Center>
          </Float>
          <TextRing text={`${ringText}   ✦   `} radius={2.4} y={1.2} />
          <TextRing text={`${ringText}   ✦   `} radius={2.0} y={0.2} />
        </Suspense>

        {/* ground glow disc */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <ringGeometry args={[1.2, 3.2, 64]} />
          <meshBasicMaterial color="#ff2d8a" transparent opacity={0.08} />
        </mesh>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
