import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { store } from './store';
import { AppRoutes } from '../routes/AppRoutes';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from '../context/ThemeContext';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="dark">
            <AppRoutes />
            <Toaster position="top-right" richColors />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}