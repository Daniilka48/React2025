import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":page/:detailsId?" element={<MainPage />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
