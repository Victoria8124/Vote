import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Vote from "./pages/vote/Vote";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { auth } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Vote />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/vote"
          element={auth ? <Vote /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

