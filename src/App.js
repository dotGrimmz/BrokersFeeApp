import Layout from './Layout/Layout';
import React, { lazy, Suspense } from "react";
import ContextImplementation from './context/ContextImplementation';
import { createBrowserHistory } from "history";
import { withRouter } from 'react-router';

import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SnackbarProvider } from 'notistack';



const LoginPage = lazy(() => import('./Login/LoginPage.jsx'));
const LogoutPage = lazy(() => import('./Logout/LogoutPage.jsx'));
const CreateBrokerFee = lazy(() => import('./CreateBrokerFee/CreateBrokerFee.jsx'));
const BrokerFeeView = lazy(() => import('./BrokerFeeView/BrokerFeeView.jsx'));
const PendingPaymentsTable = lazy(() => import('./PendingPaymentsTable/PendingPaymentsTable.jsx'));
const PaymentsRecievedTable = lazy(() => import('./PaymentsReceivedTable/PaymentsReceivedTable.jsx'));




function App() {

  let hist = createBrowserHistory();

  return (
    <Suspense fallback={<div />}>
      <ContextImplementation>
        <SnackbarProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <BrowserRouter history={hist}  >
              <Layout >
                <Switch>
                  <Route path='/' exact component={LoginPage} />
                  <Route path='/login' component={LoginPage} />
                  <Route path='/logout' component={LogoutPage} />
                  <Route path='/bfview/:id' component={BrokerFeeView} />
                  <Route path='/create' component={CreateBrokerFee} />
                  <Route path='/pending' component={PendingPaymentsTable} />
                  <Route path='/paid' component={PaymentsRecievedTable} />

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
