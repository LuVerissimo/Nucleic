import { LinearSequence } from '../scene/renderers/LinearSequence';
import { useQuery } from 'urql';

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
        </div>
    );
};
