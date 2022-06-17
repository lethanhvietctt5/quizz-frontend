import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Library from "pages/Library";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "redux/store";
import ProtectedRoute from "route/ProtectedRoute";
import MainLayout from "./layouts";
import CreateAndEditGame from "./pages/CreateAndEditGame";
import Login from "./pages/Login";
import Register from "./pages/Register";

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                  <Route path="library" element={<Library />} />
                  <Route path="create" element={<CreateAndEditGame />} />
                  <Route path="edit/:game_id" element={<CreateAndEditGame />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
