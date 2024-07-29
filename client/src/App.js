import { BrowserRouter,Navigate, Route, Routes } from'react-router-dom'
import Home from './views/homePage/Home.jsx';
import Login from './views/loginPage/Login.jsx';
import Profile from './views/profilePage/Profile.jsx';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme.js';
import Edit from './views/editPage/Edit.jsx';
import Services from './views/homePage/Services.jsx';
import Dashboard from './views/dashboards/Dashboard.jsx';
import LeadershipPage from "./views/homePage/LeadershipPage";
import DoctorDashboard from "./views/dashboards/DoctorDashboard";
import AdminDashboard from "./views/dashboards/AdminDashboard";
import PatientDashboard from './views/dashboards/PatientDashboard.jsx';


function App() {

  const mode = useSelector((state)=> state.mode)
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/> 
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path='/' element={<Home />} />
            <Route path='/services' element={ <Services />}/>
            <Route path='/edit' element={<Edit /> } />
            <Route path='/profile' element={<Profile />}  />
            <Route path='/dashboard/test' element={<DoctorDashboard />} />
            <Route path='/dashboard/patient' element={<PatientDashboard />} />
            <Route path='/dashboard/admin' element={<AdminDashboard />} />
            <Route path='/dashboard' element={<Dashboard  />}  />
            <Route path='/staff' element={<LeadershipPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
