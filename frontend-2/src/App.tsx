import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SimulationPage from './pages/SimulationPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-800 flex flex-col overflow-x-hidden w-full">
                <Header />

                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/simulation" element={<SimulationPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;