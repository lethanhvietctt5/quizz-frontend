import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import AfterQuestion from 'pages/AfterQuestion';
import Library from 'pages/Library';
import Play from 'pages/Play';
import Report from 'pages/Report';
import WaitingRoom from 'pages/WaitingRoom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from 'redux/store';
import ProtectedRoute from 'route/ProtectedRoute';
import MainLayout from './layouts';
import CreateAndEditGame from './pages/CreateAndEditGame';
import EnterGame from './pages/EnterGame';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportSummary from './pages/ReportSummary';

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
                <Route element={<MainLayout />}>
                  <Route path="/library" element={<Library />} />
                  <Route path="/create" element={<CreateAndEditGame />} />
                  <Route path="/edit/:game_id" element={<CreateAndEditGame />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/report/:report_id" element={<ReportSummary />} />
                </Route>
              </Route>
              <Route path="/waiting/:id" element={<WaitingRoom />} />
              <Route path="/play" element={<Play />} />
              <Route path="/afterQuestion" element={<AfterQuestion />} />
              <Route path="/" element={<EnterGame />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
