import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App.jsx';
import DataContext from './Context/DataContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import FlightContext from './Context/FlightContext.jsx';
import { LoadingProvider } from './components/loading/LoadingContext.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoadingProvider>
      <DataContext>
        <FlightContext>
          <App />
        </FlightContext>
      </DataContext>
    </LoadingProvider>
  </BrowserRouter>
);
