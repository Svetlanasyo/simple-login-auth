import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { Welcome } from './components/welcome';
import { UserDashboard } from './components/userDashboard';
import { Login } from './components/login';
import PrivateRoute from './utils/PrivateRoute';
//import { useUser } from './hooks/useUser';

function App() {
  const [authLoading] = useState(false);

  //const user = useUser();

  // useEffect(() => {
  //   if (!user.token) {
  //     return;
  //   }

  //   axios
  //     .get('http://localhost:8080/verifyToken', {{ withCredentials: true }})
  //     .then((response) => {
  //       setUserSession(response.data.token, response.data.user);
  //       setAuthLoading(false);
  //     })
  //     .catch(() => {
  //       removeUserSession();
  //       setAuthLoading(false);
  //     });
  // }, []);

  if (authLoading) {
    return <div>Checking authentification ...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/userdashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
