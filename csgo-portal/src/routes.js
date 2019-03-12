import React from 'react';
import Layout from './Components/Hoc/Layout';
import { Switch } from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';

import Home from './Components/home/home';
import SignIn from './Components/signin/signin';

import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches/admin-matches';
import AddEditMatch from './Components/admin/matches/addEditMatch';

const Routes = (props) => {
  return(
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/admin_matches/add_match/" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches}/>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn}/>
        <PublicRoute {...props} restricted={false} path="/" exact component={Home}/>
      </Switch>
    </Layout>
  )
} 

export default Routes;
