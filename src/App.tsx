import { Main } from './routes/Main';
import { ThemeProvider } from './components/theme-provider';
import { IssnProvider } from './lib/hooks/useIssnContext';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <IssnProvider>
        <Main />
      </IssnProvider>
    </ThemeProvider>
  )
}

export default App;
