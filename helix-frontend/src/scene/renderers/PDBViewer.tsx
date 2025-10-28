import { Suspense, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { PDBLoader } from 'three-stdlib';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// ---------- Bond component ----------
const Bond = ({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) => {
    const position = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
    const length = start.distanceTo(end);

    const orientation = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    orientation.setFromUnitVectors(up, direction);

    return (
        <mesh position={position} quaternion={orientation}>
            <cylinderGeometry args={[0.05, 0.05, length, 8]} />
            <meshStandardMaterial color="#888" />
        </mesh>
    );
};

// ---------- Scene ----------
const Scene = ({ pdbUrl }: { pdbUrl: string }) => {
    const pdb = useLoader(PDBLoader, pdbUrl);

    const { atoms, bonds } = useMemo(() => {
        const atoms: { position: THREE.Vector3; color: THREE.Color }[] = [];
        const bonds: {
            start: THREE.Vector3;
            end: THREE.Vector3;
            id: string;
        }[] = [];

        const atomsJson = pdb.json.atoms || [];
        const bondsJson = pdb.json.bonds || [];

        // Parse atoms
        for (let i = 0; i < atomsJson.length; i++) {
             const atom = atomsJson[i];
             atoms.push({
                  position: new THREE.Vector3(atom.x, atom.y, atom.z),
                  color: new THREE.Color(atom.color),
               });
          }
          
          // Parse bonds
          for (let i = 0; i < bondsJson.length; i++) {
            const bond = bondsJson[i];
            const start = atoms[bond.atoms[0]]?.position;
            const end = atoms[bond.atoms[1]]?.position;
            if (start && end) {
                bonds.push({
                    start,
                    end,
                    id: `${i}-${bond.atoms[0]}-${bond.atoms[1]}`,
                });
            }
        }
        return { atoms, bonds };
    }, [pdb]);

    return (
        <>
            {atoms.map((atom, i) => (
                <mesh key={i} position={atom.position}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color={atom.color} />
                </mesh>
            ))}
            {bonds.map((bond) => (
                <Bond key={bond.id} start={bond.start} end={bond.end} />
            ))}
        </>
    );
};

const LoadingSpinner = () => (
    <Html center>
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full"
        />
        <p className="mt-3 text-white text-sm font-medium">
            Loading molecule...
        </p>
    </Html>
);

//  Main Viewer to wrap 3D Canvas
export const PDBViewer = () => {
    return (
        <div className="h-[500px] w-full border border-gray-700 bg-black rounded-2xl overflow-hidden">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <ambientLight intensity={1.0} />
                <directionalLight position={[0, 10, 0]} intensity={1.5} />
                <OrbitControls enablePan enableZoom enableRotate />

                <Suspense fallback={<LoadingSpinner />}>
                    <Scene pdbUrl="/6TV4.pdb" />
                </Suspense>
            </Canvas>
        </div>
    );
};
