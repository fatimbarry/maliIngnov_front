import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Home from './pages/Home';
import Login from './pages/Login';
import EmployeeFormComponent from './pages/AddEmployeeModal';
import WelcomeComponent from './pages/WelcomeComponent';
import EmployeeList from './pages/EmployeeList';
import AddProjectForm from './pages/AddProjectModal';
import ListProject from './pages/ListProject';
import AddClientForm from './pages/AddClientModal';
import DashboardComponent from './pages/DashboardComponent';
import EmployeeGallery from './pages/EmployeeGallery';
import ClientList from './pages/ClientList';
import PointageList from './pages/PointageList';
import EmployeeImputation from './pages/EmployeeImputation';
import EmployeeInterface from './pages/EmployeeInterface';
import MaliIngenovWorkInterface from './pages/MaliIngenovWorkInterface';
import ProjectsList from './pages/ProjectsList';
import ProjectDetails from './pages/ProjectDetails';
import TacheList from './pages/TacheList';
import ChefInterface from './pages/ChefInterface';
import ChefProject from './pages/ChefProject';
import ContractList from './pages/ContractList';

function AppRoutes() {
    return (
        <Router>
            <Routes>
            

                <Route path="/login" element={<Login />} />
                <Route path="/ContractList" element={<ContractList />} />
                <Route path="/ChefProject" element={<ChefProject />} />
                <Route path="/ChefInterface" element={<ChefInterface />} />
                <Route path="/MaliIngenovWorkInterface" element={<MaliIngenovWorkInterface />} />
                <Route path="/EmployeeInterface" element={<EmployeeInterface />} />
                <Route path="/ProjectsList" element={<ProjectsList />} />
                <Route path="/TacheList" element={<TacheList />} />
                <Route path="/employeeform" element={<EmployeeFormComponent/>} />
                <Route path="/" element={<WelcomeComponent />} />
                <Route path="/EmployeeList" element={<EmployeeList />} />
                <Route path="/AddProjectForm" element={<AddProjectForm />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
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
