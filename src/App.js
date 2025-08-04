import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import AnimatedRoutes from 'AnimatedRoutes';
function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes/>
    </BrowserRouter>
  );
}

export default App;
