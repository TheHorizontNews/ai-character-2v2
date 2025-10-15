import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import PlatformDetailPage from './pages/PlatformDetailPage';
import CategoryPage from './pages/CategoryPage';
import SEOPage from './pages/SEOPage';
import ExplorePage from './pages/ExplorePage';
import ComparePage from './pages/ComparePage';
import AllComparisonsPage from './pages/AllComparisonsPage';
import ComparisonDetailPage from './pages/ComparisonDetailPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform/:slug" element={<PlatformDetailPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/all-comparisons" element={<AllComparisonsPage />} />
          <Route path="/compare/:comparisonId" element={<ComparisonDetailPage />} />
          <Route path="/character-review/*" element={<SEOPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    </HelmetProvider>
  );
}

export default App;