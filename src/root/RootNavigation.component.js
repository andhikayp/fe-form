import { Switch, Route } from 'react-router-dom';

import Paths from './Paths';
import { Home } from '../pages/Home';
import { DetailUser } from '../pages/DetailUser';

const RootNavigation = () => (
  <Switch>
    <Route path={Paths.Home} component={Home} exact />
    <Route path={Paths.DetailUser} component={DetailUser} exact />
    <Route path="*" component={Home} />
  </Switch>
);

export default RootNavigation;
