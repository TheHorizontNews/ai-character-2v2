import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlatformDetailPage from './pages/PlatformDetailPage';
import CategoryPage from './pages/CategoryPage';
import SEOPage from './pages/SEOPage';
import ExplorePage from './pages/ExplorePage';
import ComparePage from './pages/ComparePage';
import AllComparisonsPage from './pages/AllComparisonsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform/:slug" element={<PlatformDetailPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/all-comparisons" element={<AllComparisonsPage />} />
          <Route path="/seo/*" element={<SEOPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;