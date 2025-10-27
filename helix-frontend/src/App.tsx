import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

function App() {
    return (
        <div className="bg-gray-900 min-h-screen p-8">
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
