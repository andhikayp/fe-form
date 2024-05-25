import { HiOutlineHome } from 'react-icons/hi';
import { FaChartLine, FaRegCalendarCheck } from 'react-icons/fa';

import Paths from '../../root/Paths';

const menus = [{
  name: 'Home',
  path: Paths.Home,
  icon: <HiOutlineHome />
}, {
  name: 'Create Transaction',
  path: Paths.Transfer,
  icon: <FaChartLine />
}, {
  name: 'Transaction List',
  path: null,
  icon: <FaRegCalendarCheck />,
  children: [{
    name: 'Transfer List',
    path: Paths.Transaction,
    icon: <HiOutlineHome />
  }]
}];

export default { menus };
