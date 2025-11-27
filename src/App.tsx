import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <HomePage />
      </div>
    </ErrorBoundary>
  );
}

export default App;
