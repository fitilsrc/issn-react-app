import { Main } from './routes/Main';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Main />
    </ThemeProvider>
  )
}

export default App;
