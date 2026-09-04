"use client";

import React, { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, Float } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { assetUrl } from "@/utils/formatters";

const StaticLogoMesh = ({ url }) => {
  const svg = useLoader(SVGLoader, url);

  const pathData = useMemo(() => {
    if (!svg || !svg.paths) return [];
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
      curveSegments: 20,
    }),
    [],
  );

  if (!pathData.length) return null;

  return (
    <group rotation={[0, 0, 0]}>
      <Center>
        <group scale={[0.55, -0.55, 0.55]}>
          {pathData.map((data, index) =>
            data.shapes.map((shape, i) => (
              <mesh key={`${index}-${i}`}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial
                  color={data.color || "#02FCCF"}
                  metalness={0.9}
                  roughness={0.2}
                  envMapIntensity={1.8}
                  toneMapped={false}
                />
              </mesh>
            )),
          )}
        </group>
      </Center>
    </group>
  );
};

export default function LinksLogo3D() {
  const finalUrl = assetUrl("/assets/logos/hexa_logo.svg");

  return (
    <div className="hx-links-3d-canvas-container">
      <div className="hx-instant-logo-fallback">
        <img src={finalUrl} alt="Hexa Dijital" className="instant-logo-img" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 92], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[10, 15, 10]} intensity={3.5} />
        <directionalLight
          position={[-12, -10, 10]}
          intensity={2.8}
          color="#00ffd1"
        />
        <pointLight position={[0, 0, 30]} intensity={1.5} color="#00ffd1" />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0} floatIntensity={0.6}>
            <StaticLogoMesh url={finalUrl} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
