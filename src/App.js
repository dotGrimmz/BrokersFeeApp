import Layout from './Layout/Layout';
import React, { lazy, Suspense } from "react";
import ContextImplementation from './context/ContextImplementation';

import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SnackbarProvider } from 'notistack';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';


const LoginPage = lazy(() => import('./Login/LoginPage.jsx'));
const LogoutPage = lazy(() => import('./Logout/LogoutPage.jsx'));
const CreateBrokerFee = lazy(() => import('./CreateBrokerFee/CreateBrokerFee.jsx'));
const BrokerFeeView = lazy(() => import('./BrokerFeeView/BrokerFeeView.jsx'));
const PendingPaymentsTable = lazy(() => import('./PendingPaymentsTable/PendingPaymentsTable.jsx'));
const PaymentsRecievedTable = lazy(() => import('./PaymentsReceivedTable/PaymentsReceivedTable.jsx'));
const AdminView = lazy(() => import('./AdminView/AdminView.jsx'));




function App() {

  return (
    <Suspense fallback={<div />}>
      <ContextImplementation>
        <SnackbarProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <BrowserRouter  >
              <Layout >
                <Switch>
                  <Route path='/' exact component={LoginPage} />
                  <Route path='/login' component={LoginPage} />
                  <ProtectedRoute path='/logout' component={LogoutPage} />
                  <ProtectedRoute path='/bfview/:id' component={BrokerFeeView} />
                  <ProtectedRoute path='/create' component={CreateBrokerFee} />
                  <ProtectedRoute path='/pending' component={PendingPaymentsTable} />
                  <ProtectedRoute path='/paid' component={PaymentsRecievedTable} />
                  <ProtectedRoute path='/admin' component={AdminView} />

                </Switch>
              </Layout>
            </BrowserRouter>



          </MuiPickersUtilsProvider>
        </SnackbarProvider>

      </ContextImplementation >

    </Suspense >
  );
}

export default App;
