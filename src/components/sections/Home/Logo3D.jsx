"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Float, ContactShadows } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";

const SvgModel = ({ url }) => {
  const svg = useLoader(SVGLoader, url);
  const groupRef = useRef();

  // Ekran boyutunu takip etmek için state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // İlk render'da kontrol et
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pathData = useMemo(() => {
    return svg.paths.map((path) => ({
      shapes: path.toShapes(true),
      color: path.color,
    }));
  }, [svg]);

  const extrudeSettings = useMemo(
    () => ({
      depth: 10,
      bevelEnabled: true,
      bevelThickness: 1.5,
      bevelSize: 1,
      bevelSegments: 4,
      curveSegments: 12,
    }),
    [],
  );

  useFrame((state) => {
    if (groupRef.current) {
      if (isMobile) {
        // Mobil: Sürekli 360 derece dönüş
        groupRef.current.rotation.y += 0.006;
        groupRef.current.rotation.x = 0; // Mobil için tilt'i sıfırla
      } else {
        // Masaüstü: Fare takibi (Mevcut mantık)
        const targetX = -(state.mouse.y * 12 * Math.PI) / 90;
        const targetY = (state.mouse.x * 12 * Math.PI) / 90;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          targetX,
          0.05,
        );
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetY,
          0.05,
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <group scale={[0.4, -0.4, 0.4]}>
          {pathData.map((data, index) =>
            data.shapes.map((shape, i) => (
              <mesh key={`${index}-${i}`}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial
                  color={data.color}
                  metalness={0.8}
                  roughness={0.3}
                  envMapIntensity={0.8}
                  toneMapped={false}
                />{" "}
              </mesh>
            )),
          )}
        </group>
      </Center>
    </group>
  );
};

export default function Logo3D({ logoUrl }) {
  // VİTE KALINTISI TEMİZLENDİ VE NEXT.JS PUBLIC KLASÖRÜNE YÖNLENDİRİLDİ
  const finalUrl = logoUrl || "/assets/logos/hexa_logo.svg";

  return (
    <div
      style={{ width: "100%", height: "100%", position: "absolute", zIndex: 1 }}
    >
      <Canvas camera={{ position: [0, 0, 120], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} />
        <directionalLight
          position={[-10, -10, -10]}
          intensity={1}
          color="#00fffb"
        />
        <Environment preset="studio" />

        <Float speed={2} rotationIntensity={0.1} floatIntensity={1.2}>
          <SvgModel url={finalUrl} />
        </Float>
      </Canvas>
    </div>
  );
}
