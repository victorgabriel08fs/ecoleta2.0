import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import SucessScreen from './pages/SucessScreen';
import Points from './pages/Points';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
            <Route component={SucessScreen} path="/sucess" />
            <Route component={Points} path="/points" />

        </BrowserRouter>
    );
}

export default Routes;