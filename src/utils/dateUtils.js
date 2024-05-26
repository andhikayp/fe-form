import moment from 'moment';

export const formatDatetime = (date) => moment(date).format('DD MMM, YYYY HH:mm:ss');

export const formatDate = (date) => moment(date).format('DD MMM, YYYY');
