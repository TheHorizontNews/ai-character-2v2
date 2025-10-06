import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlatformDetailPage from './pages/PlatformDetailPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform/:slug" element={<PlatformDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;