import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Theme from "./theme/Theme";
import { RequireAuth } from "../navigation";
import { Login } from "../screens";
import { Dashboard } from "screens/Dashboard";
import { AuthProvider } from "context/auth";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* <Route element={<Login />} path="/login" /> */}
              <Route
                // path="dashboard/*"
                path="*"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              {/* <Route path="*" element={<Login />} /> */}
            </Routes>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
