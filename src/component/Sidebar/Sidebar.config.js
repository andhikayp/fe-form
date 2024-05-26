import { HiOutlineHome } from 'react-icons/hi';
import { FaChartLine, FaRegCalendarCheck } from 'react-icons/fa';

import constants from '../../utils/constants';
import Paths from '../../root/Paths';

const { ROLE } = constants;

const menus = [{
  name: 'Home',
  path: Paths.Home,
  icon: <HiOutlineHome />,
  role: [ROLE.APPROVER, ROLE.MAKER]
}, {
  name: 'Create Transaction',
  path: Paths.Transfer,
  icon: <FaChartLine />,
  role: [ROLE.MAKER]
}, {
  name: 'Transaction List',
  path: null,
  icon: <FaRegCalendarCheck />,
  role: [ROLE.APPROVER, ROLE.MAKER],
  children: [{
    name: 'Transfer List',
    path: Paths.Transaction,
    icon: <HiOutlineHome />,
    role: [ROLE.APPROVER, ROLE.MAKER]
  }]
}];

export default { menus };
