import { formatDate, formatDatetime } from '../../../utils/dateUtils';

const informationConfig = (data) => [{
  name: 'Total Transfer Record: ',
  value: data.totalTransfer
}, {
  name: 'Total Amount: ',
  value: data.totalAmount
}, {
  name: 'Estimated Service Fee: ',
  value: 0
}];

const tableHeadConfig = [{
  name: 'No.',
}, {
  name: 'To. Account No.'
}, {
  name: 'To Account Name',
}, {
  name: 'To Account Bank'
}, {
  name: 'Transfer Amount'
}, {
  name: 'Description'
}, {
  name: 'Status',
  style: { position: 'sticky', right: 0 }
}];

const mappedTransaction = (data) => [{
  title: 'From Account No.: ',
  value: data.sourceAccount,
  position: 'left'
}, {
  title: 'Submit Date and Time: ',
  value: formatDatetime(data.createdAt),
  position: 'left'
}, {
  title: 'Transfer Date: ',
  value: data.transferDate ? formatDate(data.transferDate) : '-',
  position: 'left'
}, {
  title: 'Instruction Type: ',
  value: data.instructionType === 'STANDING_INSTRUCTION' ? 'Standing Instruction' : 'Immediate ',
  position: 'left'
}, {
  title: 'Maker: ',
  value: data.makerUser?.username,
  position: 'right'
}, {
  title: 'Reference No.: ',
  value: data.referenceNumber,
  position: 'right'
}, {
  title: 'Transfer Type: ',
  value: data.transferType,
  position: 'right'
}];

export default { tableHeadConfig, mappedTransaction, informationConfig };
