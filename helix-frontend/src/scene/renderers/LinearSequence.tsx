import { Text, OrthographicCamera, MapControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
const NUCLEOTIDE_COLORS: Record<string, string> = {
    A: '#00A86B',
    T: '#CC0000',
    C: '#0000CC',
    G: '#FFA500',
    N: '#AAAAAA',
};

type Vec3 = [number, number, number];
const vec3 = (x: number, y: number, z: number): Vec3 => [x, y, z];

interface BaseProps {
    base: string;
    position: Vec3;
}

const Base = ({ base, position }: BaseProps) => {
    const color = NUCLEOTIDE_COLORS[base.toUpperCase()] || '#000000';
    return (
        <Text
            position={position}
            fontSize={0.8}
            color={color}
            anchorX="center"
            anchorY="middle"
        >
            {base}
        </Text>
    );
};

interface SceneProps {
    sequence: string;
}
const Scene = ({ sequence }: SceneProps) => {
    const bases = useMemo(() => {
        const baseWidth = 1.0; // How far apart to space them in 3D units
        return sequence.split('').map((base, index) => ({
            id: `${index}-${base}`,
            base: base,
            position: vec3(index * baseWidth, 0, 0),
        }));
    }, [sequence]);

    return (
        <>
            {bases.map(({ id, base, position }) => (
                <Base key={id} base={base} position={position} />
            ))}
        </>
    );
};

export const LinearSequence = () => {
    // A simple test sequence. We'll fetch this from Elixir later.
    const sequence = 'ATGC'.repeat(100);

    return (
        <div
            style={{ height: '300px', width: '100%', border: '1px solid #555' }}
        >
            <Canvas>
                {/* For "2D camera" setup It looks at the scene flat-on, with no perspective. */}
                <OrthographicCamera
                    makeDefault
                    position={[0, 0, 10]} // Position it 10 units "above" the 2D plane
                    zoom={50}
                />
                <ambientLight intensity={1.5} />
                // pan (drag) and zoom (wheel)
                <MapControls
                    enableRotate={false} // No 3D rotation
                />
                <Scene sequence={sequence} />
            </Canvas>
        </div>
    );
};
