import { LinearSequence } from '../scene/renderers/LinearSequence';
import { useQuery } from 'urql';
import { PDBViewer } from '../scene/renderers/PDBViewer';

const SequencesQuery = `
  query ListSequences {
    list_sequences {
      results {
        id
        name
        data
      }
    }
  }
`;

export const HomePage = () => {
    const [result] = useQuery({ query: SequencesQuery });
    const { data, fetching, error } = result;

    if (fetching) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-red-500">Oh no... {error.message}</p>;

    const firstSequence = data?.list_sequences.results[0];

    return (
        <div>
            {/* 2D view */}
            <h1 className="text-3xl font-bold mb-4 text-white">
                {firstSequence?.name || 'DNA Sequence Viewer'}
            </h1>
            {firstSequence ? (
                <LinearSequence sequence={firstSequence.data} />
            ) : (
                <p className="text-yellow-500">
                    No sequences found in database.
                </p>
            )}
            {/* --- 3D Molecule Viewer --- */}
            <h1 className="text-3xl font-bold mt-12 mb-4 text-white">
                PDB Viewer
            </h1>
            <p className="text-lg text-gray-400 mb-6">
                Click and drag to rotate. Use the scroll wheel to zoom.
            </p>
            <PDBViewer /> {/* <-- 2. Add the new component */}
        </div>
    );
};
