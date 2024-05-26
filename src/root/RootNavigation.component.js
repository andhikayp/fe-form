import { Switch, Route } from 'react-router-dom';

import Paths from './Paths';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { TransferForm } from '../pages/TransferForm';
import { ConfirmTransfer } from '../pages/ConfirmTransfer';
import { InflightPayment } from '../pages/InflightPayment';
import AuthenticateRoute from './AuthenticatedRoute';
import constants from '../utils/constants';

const { ROLE } = constants;
const ALL_ROLE = [ROLE.APPROVER, ROLE.MAKER];
const MAKER_ONLY = [ROLE.MAKER];

const RootNavigation = () => (
  <Switch>
    <Route path={Paths.Login} component={Login} exact />
    <Route path={Paths.Register} component={Register} exact />
    <AuthenticateRoute path={Paths.Home} component={Home} exact roles={ALL_ROLE} />
    <AuthenticateRoute path={Paths.Transfer} component={TransferForm} exact roles={MAKER_ONLY} />
    <AuthenticateRoute path={Paths.ConfirmTransfer} component={ConfirmTransfer} exact roles={MAKER_ONLY} />
    <AuthenticateRoute path={Paths.InflightPayment} component={InflightPayment} exact roles={MAKER_ONLY} />
    <Route path="*" component={Home} />
  </Switch>
);

export default RootNavigation;
