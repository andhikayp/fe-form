import { Switch, Route } from 'react-router-dom';

import Paths from './Paths';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { TransferForm } from '../pages/TransferForm';

const RootNavigation = () => (
  <Switch>
    <Route path={Paths.Home} component={Home} exact />
    <Route path={Paths.Login} component={Login} exact />
    <Route path={Paths.Register} component={Register} exact />
    <Route path={Paths.Transfer} component={TransferForm} exact />
    <Route path="*" component={Home} />
  </Switch>
);

export default RootNavigation;
