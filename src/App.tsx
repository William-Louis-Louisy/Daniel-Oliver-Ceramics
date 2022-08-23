import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PublicRoutes from "../src/routes/PublicRoutes";

function App() {
  return (
    <div className="App">
      <PublicRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
