import { Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/HomePage';

function App() {
    return (
        <div className="bg-gray-900 min-h-screen p-8">
            <main>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
