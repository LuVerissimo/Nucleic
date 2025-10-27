import { LinearSequence } from '../scene/renderers/LinearSequence';

export const Homepage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-white">
                DNA Sequence Viewer
            </h1>
            <p className="text-lg text-grey-400 mb-4">
                Click and drag to pan. Use the scroll wheel to zoom.
            </p>
            <LinearSequence />
        </div>
    );
};
