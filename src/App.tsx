import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <TaskManager />
    </ThemeProvider>
  );
}

export default App;
