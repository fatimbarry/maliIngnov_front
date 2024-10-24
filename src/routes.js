import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Home from './pages/Home';
import Login from './pages/Login';
import EmployeeFormComponent from './pages/EmployeeFormComponent';
import WelcomeComponent from './pages/WelcomeComponent';
import EmployeeList from './pages/EmployeeList';
import AddProjectForm from './pages/AddProjectForm';
import ListProject from './pages/ListProject';
import AddClientForm from './pages/AddClientForm';
import DashboardComponent from './pages/DashboardComponent';
import EmployeeGallery from './pages/EmployeeGallery';
import ClientList from './pages/ClientList';
import PointageList from './pages/PointageList';
import EmployeeImputation from './pages/EmployeeImputation';

function AppRoutes() {
    return (
        <Router>
            <Routes>
            

                <Route path="/" element={<Login />} />
                <Route path="/employeeform" element={<EmployeeFormComponent/>} />
                <Route path="/welcome" element={<WelcomeComponent />} />
                <Route path="/EmployeeList" element={<EmployeeList />} />
                <Route path="/AddProjectForm" element={<AddProjectForm />} />
                <Route path="/AddClientForm" element={<AddClientForm />} />
                <Route path="/DashboardComponent" element={<DashboardComponent />} />
                <Route path="/ListProject" element={<ListProject />} />
                <Route path="/ClientList" element={<ClientList />} />
                <Route path="/EmployeeGallery" element={<EmployeeGallery />} />
                <Route path="/PointageList" element={<PointageList />} />
                <Route path="/EmployeeImputation" element={<EmployeeImputation />} />




            </Routes>
        </Router>
    );
}

export default AppRoutes;
