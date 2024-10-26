import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

import Root from "./routes/root";
import ErrorPage from "./error-page";
import Jobs, { loader as jobsLoader } from "./routes/jobs";
import Login from "./routes/login";
import Job from './routes/job';
import Employees, { loader as employeesLoader } from './routes/employees';
import Employee from './routes/employee';
import Account from './routes/account';
import AccountEdit from './routes/accountEdit';
import EmployerJobDetail from './routes/employerJobDetail';
import EmployerJobListed from './routes/employerJobListed';
import NewJobCreate from './routes/newJobCreate';
import NewCompanyCreate from './routes/newCompanyCreate';
import MyCompanies from './routes/myCompanies';
import Company from './routes/company';
import EditCompany from './routes/editCompany';
import SavedJobs from './routes/savedJobs';
import SignUp from './routes/signUp';
import store from './redux/store'
import VerifiedUser from './verified/VerifiedUser';
import Companies from './routes/companies';
import VerifiedEmployer from './verified/VerifiedEmployer';
import VerifiedAdmin from './verified/VerifiedAdmin';
import EmployerJobEdit from './routes/employerJobEdit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/jobs",
        element: <Jobs />,
        loader: jobsLoader,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign_up",
        element: <SignUp />,
      },
      {
        path: "/jobs/:id",
        element: <Job />,
      },
      {
        path: "/user",
        element: <VerifiedUser />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "account_edit",
            element: <AccountEdit />,
          },
          {
            path: "companies",
            element: <Companies />,
          },
          {
            path: "companies/:id",
            element: <Company />,
          },
          {
            path: "saved_jobs",
            element: <SavedJobs />,
          },
        ]
      },
      {
        path: "/employer",
        element: <VerifiedEmployer />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "account_edit",
            element: <AccountEdit />,
          },
          {
            path: "employees",
            element: <Employees />,
            loader: employeesLoader,
          },
          {
            path: "employees/:id",
            element: <Employee />,
          },
          {
            path: "employer_jobs_listed",
            element: <EmployerJobListed />,
          },
          {
            path: "employer_job_detail/:id",
            element: <EmployerJobDetail />,
          },
          {
            path: "employer_job_edit/:id",
            element: <EmployerJobEdit />,
          },
          {
            path: "new_job_create",
            element: <NewJobCreate />,
          },
          {
            path: "company_Create",
            element: <NewCompanyCreate />,
          },
          {
            path: "companies",
            element: <Companies />,
          },
          {
            path: "my_companies",
            element: <MyCompanies />,
          },
          {
            path: "companies/:id",
            element: <Company />,
          },
          {
            path: "edit_company/:id",
            element: <EditCompany />,
          },
        ]
      },
      {
        path: "/admin",
        element: <VerifiedAdmin />,
        children: [
          {
            path: "jobs",
            element: <Jobs />,
            loader: jobsLoader
          },
          {
            path: "companies",
            element: <Companies />
          },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
