import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text, Center, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export type LandmarkKind = "tower" | "skytree" | "pagoda" | "torii";

/* ---------- Shared materials ---------- */

const RED = "#ff2d55";
const HOT_PINK = "#ff2d8a";
const DEEP_PINK = "#ff5fa8";
const WHITE = "#ffffff";
const DARK = "#1a0a14";
const GOLD = "#ffd27a";

/* ---------- Reusable lattice strut helper ---------- */

function Strut({
  from,
  to,
  radius = 0.012,
  color = RED,
  emissive = RED,
  emissiveIntensity = 0.6,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius?: number;
  color?: string;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize());
    return { position: mid.toArray() as [number, number, number], quaternion: q, length: len };
  }, [from, to]);
  return (
    <mesh ref={ref} position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        metalness={0.4}
        roughness={0.5}
      />
    </mesh>
  );
}

/* ---------- Tokyo Tower (lattice with X-bracing) ---------- */

function TokyoTower() {
  // Build a 4-leg tapered tower with horizontal rings + X-bracing per section.
  const sections = useMemo(() => {
    // Each section: bottom Y, top Y, half-width at bottom, half-width at top
    const s = [
      { y0: 0.0, y1: 0.55, w0: 0.55, w1: 0.45 },
      { y0: 0.55, y1: 1.05, w0: 0.45, w1: 0.32 },
      { y0: 1.05, y1: 1.5, w0: 0.32, w1: 0.22 },
      { y0: 1.5, y1: 1.95, w0: 0.22, w1: 0.16 },
      { y0: 1.95, y1: 2.4, w0: 0.16, w1: 0.1 },
    ];
    return s;
  }, []);

  const corners = (y: number, w: number) =>
    [
      [w, y, w],
      [-w, y, w],
      [-w, y, -w],
      [w, y, -w],
    ] as Array<[number, number, number]>;

  return (
    <group position={[0, -0.4, 0]}>
      {/* Concrete base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.4, 0.1, 1.4]} />
        <meshStandardMaterial color="#2a1a22" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.2, 0.06, 1.2]} />
        <meshStandardMaterial color={DARK} roughness={0.8} />
      </mesh>

      {sections.map((sec, idx) => {
        const bot = corners(sec.y0, sec.w0);
        const top = corners(sec.y1, sec.w1);
        return (
          <group key={idx}>
            {/* 4 legs */}
            {[0, 1, 2, 3].map((i) => (
              <Strut key={`leg-${i}`} from={bot[i]} to={top[i]} radius={0.028} />
            ))}
            {/* Bottom ring */}
            {[0, 1, 2, 3].map((i) => (
              <Strut
                key={`br-${i}`}
                from={bot[i]}
                to={bot[(i + 1) % 4]}
                radius={0.016}
                color={WHITE}
                emissive={RED}
                emissiveIntensity={0.3}
              />
            ))}
            {/* Top ring */}
            {[0, 1, 2, 3].map((i) => (
              <Strut
                key={`tr-${i}`}
                from={top[i]}
                to={top[(i + 1) % 4]}
                radius={0.016}
                color={WHITE}
                emissive={RED}
                emissiveIntensity={0.3}
              />
            ))}
            {/* X bracing on each face */}
            {[0, 1, 2, 3].map((i) => {
              const j = (i + 1) % 4;
              return (
                <group key={`x-${i}`}>
                  <Strut from={bot[i]} to={top[j]} radius={0.014} />
                  <Strut from={bot[j]} to={top[i]} radius={0.014} />
                </group>
              );
            })}
          </group>
        );
      })}

      {/* Main observatory deck */}
      <group position={[0, 1.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 0.14, 24]} />
          <meshStandardMaterial color={WHITE} emissive={HOT_PINK} emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.5, 0.55, 0.05, 24]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.6} />
        </mesh>
        {/* Window strip */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.555, 0.555, 0.06, 32, 1, true]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Top observatory */}
      <group position={[0, 1.95, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 20]} />
          <meshStandardMaterial color={WHITE} emissive={HOT_PINK} emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.305, 0.305, 0.05, 24, 1, true]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Antenna mast */}
      <mesh position={[0, 2.55, 0]}>
        <cylinderGeometry args={[0.025, 0.05, 1.0, 10]} />
        <meshStandardMaterial color={WHITE} emissive={RED} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 3.05, 0]}>
        <cylinderGeometry args={[0.01, 0.025, 0.4, 8]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={1} />
      </mesh>
      {/* Blinking aviation light */}
      <mesh position={[0, 3.3, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={3} />
      </mesh>
      <pointLight position={[0, 3.3, 0]} intensity={3} color={RED} distance={3} />
    </group>
  );
}

/* ---------- Tokyo Skytree ---------- */

function Skytree() {
  // A tapered tripod-feel main shaft with two observation pods + long mast.
  return (
    <group position={[0, -0.6, 0]}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 0.08, 12]} />
        <meshStandardMaterial color={DARK} />
      </mesh>

      {/* Lower flared shaft (triangular feel via 6-sided cylinder) */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.18, 0.42, 1.0, 6, 8]} />
        <meshStandardMaterial
          color="#dfe6ff"
          emissive={HOT_PINK}
          emissiveIntensity={0.25}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Lattice rings on lower shaft */}
      {[0.2, 0.45, 0.7, 0.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.18 + (1 - y) * 0.22, 0.012, 6, 18]} />
          <meshStandardMaterial color={HOT_PINK} emissive={HOT_PINK} emissiveIntensity={0.8} />
        </mesh>
      ))}

      {/* Mid shaft (cylindrical) */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.13, 0.18, 0.6, 16]} />
        <meshStandardMaterial color="#eef0ff" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Vertical accent strips */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.16, 1.3, Math.sin(a) * 0.16]}>
            <boxGeometry args={[0.012, 0.6, 0.012]} />
            <meshStandardMaterial color={HOT_PINK} emissive={HOT_PINK} emissiveIntensity={1.2} />
          </mesh>
        );
      })}

      {/* Lower observatory pod (Tembo Deck) */}
      <group position={[0, 1.75, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.16, 0.2, 24]} />
          <meshStandardMaterial color={WHITE} emissive={HOT_PINK} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.305, 0.305, 0.08, 32, 1, true]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.22, 0.3, 0.08, 24]} />
          <meshStandardMaterial color={WHITE} emissive={HOT_PINK} emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Upper observatory pod (Tembo Galleria) */}
      <group position={[0, 2.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.18, 24, 18]} />
          <meshStandardMaterial color={WHITE} emissive={HOT_PINK} emissiveIntensity={0.5} metalness={0.4} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.185, 0.185, 0.06, 32, 1, true]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Long broadcast mast */}
      <mesh position={[0, 2.75, 0]}>
        <cylinderGeometry args={[0.02, 0.05, 1.0, 10]} />
        <meshStandardMaterial color="#cfd6ff" emissive={HOT_PINK} emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 3.35, 0]}>
        <cylinderGeometry args={[0.008, 0.02, 0.5, 8]} />
        <meshStandardMaterial color={HOT_PINK} emissive={HOT_PINK} emissiveIntensity={1.2} />
      </mesh>
      {/* Tip beacon */}
      <mesh position={[0, 3.65, 0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color={HOT_PINK} emissive={HOT_PINK} emissiveIntensity={3} />
      </mesh>
      <pointLight position={[0, 3.65, 0]} intensity={3} color={HOT_PINK} distance={3} />
    </group>
  );
}

/* ---------- Senso-ji 5-story Pagoda ---------- */

function PagodaRoof({ width, y }: { width: number; y: number }) {
  // Curved upturned roof: a flat slab + 4 small upturned eave tips
  return (
    <group position={[0, y, 0]}>
      {/* Roof slab as a 4-sided pyramid */}
      <mesh position={[0, 0.05, 0]}>
        <coneGeometry args={[width * 0.95, 0.18, 4]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.5} roughness={0.6} />
      </mesh>
      {/* Underside trim */}
      <mesh position={[0, -0.04, 0]} rotation={[Math.PI, Math.PI / 4, 0]}>
        <coneGeometry args={[width * 1.0, 0.05, 4]} />
        <meshStandardMaterial color={DARK} emissive={HOT_PINK} emissiveIntensity={0.4} />
      </mesh>
      {/* Upturned eave tips (corners) */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const r = width * 0.78;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, 0.03, Math.sin(a) * r]}
            rotation={[0, -a, 0.4]}
          >
            <coneGeometry args={[0.06, 0.18, 6]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.0} />
          </mesh>
        );
      })}
    </group>
  );
}

function Pagoda() {
  const tiers = [0, 1, 2, 3, 4];
  return (
    <group position={[0, -0.7, 0]}>
      {/* Stone base */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.4, 0.08, 1.4]} />
        <meshStandardMaterial color="#3a2530" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[1.2, 0.1, 1.2]} />
        <meshStandardMaterial color={DARK} />
      </mesh>

      {tiers.map((i) => {
        const tierH = 0.55;
        const y = 0.25 + i * tierH;
        const w = 0.95 - i * 0.13;
        return (
          <group key={i} position={[0, y, 0]}>
            {/* Body */}
            <mesh>
              <boxGeometry args={[w * 0.7, 0.32, w * 0.7]} />
              <meshStandardMaterial color={DARK} emissive={HOT_PINK} emissiveIntensity={0.18} />
            </mesh>
            {/* Wood frame trim */}
            <mesh position={[0, 0.16, 0]}>
              <boxGeometry args={[w * 0.74, 0.04, w * 0.74]} />
              <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, -0.16, 0]}>
              <boxGeometry args={[w * 0.74, 0.04, w * 0.74]} />
              <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.5} />
            </mesh>
            {/* Lit window strip on each face */}
            {[0, 1, 2, 3].map((k) => {
              const a = (k / 4) * Math.PI * 2;
              return (
                <mesh
                  key={k}
                  position={[Math.cos(a) * w * 0.36, 0, Math.sin(a) * w * 0.36]}
                  rotation={[0, -a, 0]}
                >
                  <planeGeometry args={[w * 0.4, 0.12]} />
                  <meshStandardMaterial
                    color={GOLD}
                    emissive={GOLD}
                    emissiveIntensity={1.4}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              );
            })}
            {/* Roof above body */}
            <PagodaRoof width={w} y={0.22} />
          </group>
        );
      })}

      {/* Sorin (spire) on top */}
      <group position={[0, 3.25, 0]}>
        <mesh>
          <cylinderGeometry args={[0.025, 0.04, 0.7, 10]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} metalness={0.8} />
        </mesh>
        {/* Rings on the spire */}
        {[0.0, 0.12, 0.24, 0.36, 0.48].map((y, i) => (
          <mesh key={i} position={[0, y - 0.2, 0]}>
            <torusGeometry args={[0.06, 0.015, 6, 16]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.4} metalness={0.8} />
          </mesh>
        ))}
        {/* Top jewel */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={HOT_PINK} emissive={HOT_PINK} emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Torii Gate ---------- */

function ToriiPillar({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      {/* Stone footing */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.08, 16]} />
        <meshStandardMaterial color="#3a2530" roughness={0.9} />
      </mesh>
      {/* Pillar (slight taper) */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 1.78, 20]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.45} roughness={0.45} />
      </mesh>
      {/* Black collar at base */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.155, 0.155, 0.06, 20]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
    </group>
  );
}

function Torii() {
  return (
    <group position={[0, -0.7, 0]}>
      {/* Ground stone slab */}
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[2.4, 0.02, 0.6]} />
        <meshStandardMaterial color="#2a1a22" roughness={0.9} />
      </mesh>

      <ToriiPillar x={-0.85} />
      <ToriiPillar x={0.85} />

      {/* Nuki (lower beam) */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2.2, 0.14, 0.16]} />
        <meshStandardMaterial color={DARK} emissive={HOT_PINK} emissiveIntensity={0.3} />
      </mesh>

      {/* Shimaki (under-cap) */}
      <mesh position={[0, 1.78, 0]}>
        <boxGeometry args={[2.4, 0.1, 0.22]} />
        <meshStandardMaterial color={DARK} />
      </mesh>

      {/* Kasagi (top curved beam) — built from 3 rotated boxes for a slight curve */}
      <group position={[0, 1.92, 0]}>
        <mesh>
          <boxGeometry args={[2.1, 0.18, 0.26]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.55} />
        </mesh>
        {/* Upturned ends */}
        <mesh position={[1.05, 0.05, 0]} rotation={[0, 0, -0.18]}>
          <boxGeometry args={[0.5, 0.18, 0.26]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.55} />
        </mesh>
        <mesh position={[-1.05, 0.05, 0]} rotation={[0, 0, 0.18]}>
          <boxGeometry args={[0.5, 0.18, 0.26]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.55} />
        </mesh>
        {/* Top trim */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[2.2, 0.04, 0.3]} />
          <meshStandardMaterial color={DARK} />
        </mesh>
      </group>

      {/* Center plaque (gakuzuka) */}
      <mesh position={[0, 1.65, 0.14]}>
        <boxGeometry args={[0.32, 0.22, 0.04]} />
        <meshStandardMaterial color={DARK} emissive={GOLD} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 1.65, 0.165]}>
        <planeGeometry args={[0.28, 0.18]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} />
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

function TextRing({
  text,
  radius = 2.2,
  y = 1.0,
  reverse = false,
}: {
  text: string;
  radius?: number;
  y?: number;
  reverse?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const chars = useMemo(() => Array.from(text), [text]);
  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.18 * (reverse ? 1 : -1);
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
            color={HOT_PINK}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.006}
            outlineColor={HOT_PINK}
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
      className="relative w-full overflow-hidden rounded-2xl border border-neon-pink/40 shadow-[var(--shadow-neon-pink)]"
      style={{
        height,
        background:
          "radial-gradient(circle at 30% 20%, oklch(0.45 0.28 350 / 55%), oklch(0.08 0.02 350) 70%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <Canvas
        camera={{ position: [5.5, 3.2, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        shadows
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#ffffff" castShadow />
        <pointLight position={[3, 4, 3]} intensity={45} color={HOT_PINK} distance={18} />
        <pointLight position={[-3, 2, -3]} intensity={35} color={RED} distance={18} />
        <pointLight position={[0, -1, 4]} intensity={20} color={DEEP_PINK} distance={12} />
        <spotLight
          position={[0, 6, 0]}
          angle={0.6}
          penumbra={0.8}
          intensity={30}
          color={HOT_PINK}
          distance={12}
        />

        <Suspense fallback={null}>
          <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.35}>
            <Center disableY>
              <LandmarkMesh kind={kind} />
            </Center>
          </Float>
          <TextRing text={`${ringText}   ✦   `} radius={2.7} y={1.6} />
          <TextRing text={`${ringText}   ✦   `} radius={2.3} y={0.4} reverse />
          <Sparkles count={60} scale={[7, 5, 7]} size={2} speed={0.4} color={HOT_PINK} />
        </Suspense>

        {/* Ground glow disc */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]}>
          <ringGeometry args={[1.2, 4.0, 64]} />
          <meshBasicMaterial color={HOT_PINK} transparent opacity={0.18} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.94, 0]}>
          <circleGeometry args={[1.2, 48]} />
          <meshBasicMaterial color={HOT_PINK} transparent opacity={0.08} />
        </mesh>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.0}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.7}
          target={[0, 1, 0]}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
