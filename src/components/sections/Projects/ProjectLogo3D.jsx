"use client";

import React, { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Float } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";
import { assetUrl } from "@/utils/formatters";

const SvgModel = ({ url }) => {
  const svg = useLoader(SVGLoader, url);
  const groupRef = useRef();

  const pathData = useMemo(() => {
    if (!svg || !svg.paths) return [];
    return svg.paths.map((path) => ({
      shapes: path.toShapes(true),
      color: path.color,
    }));
  }, [svg]);

  const baseExtrudeSettings = useMemo(
    () => ({
      bevelEnabled: false,
      curveSegments: 24,
    }),
    [],
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  if (!pathData.length) return null;

  return (
    <group ref={groupRef}>
      <Center
        onCentered={({ container, width }) => {
          if (width > 0) {
            const targetWidth = 40;
            const scaleFactor = targetWidth / width;
            container.scale.set(scaleFactor, -scaleFactor, scaleFactor);
          }
        }}
      >
        <group>
          {pathData.map((data, index) => {
            const layerDepth = 8 + index * 0.1;
            const zOffset = -(index * 0.05);

            return data.shapes.map((shape, i) => (
              <mesh key={`${index}-${i}`} position={[0, 0, zOffset]}>
                <extrudeGeometry
                  args={[shape, { ...baseExtrudeSettings, depth: layerDepth }]}
                />
                <meshStandardMaterial
                  color={data.color || "#02FCCF"}
                  metalness={0.5}
                  roughness={0.4}
                  envMapIntensity={0.8}
                  toneMapped={false}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ));
          })}
        </group>
      </Center>
    </group>
  );
};

export default function ProjectLogo3D({ logoUrl }) {
  if (!logoUrl) return null;
  const finalUrl = assetUrl(logoUrl);

  return (
    <div className="project-logo-canvas-container">
      <Canvas camera={{ position: [0, 0, 120], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} />
        <directionalLight
          position={[-10, -10, -10]}
          intensity={1}
          color="#00fffb"
        />
        <Environment preset="studio" />

        <Float speed={2} rotationIntensity={0} floatIntensity={1.2}>
          <Suspense fallback={null}>
            <SvgModel url={finalUrl} />
          </Suspense>
        </Float>
      </Canvas>
    </div>
  );
}
