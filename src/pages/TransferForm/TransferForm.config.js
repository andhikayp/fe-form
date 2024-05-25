const formConfig = (isShowForm, setIsShowForm) => [{
  controlId: 'instructionType',
  label: '* Instruction Type',
  name: 'instructionType',
  type: 'radio',
  isPassword: false,
  setIsShow: setIsShowForm
}, {
  controlId: 'transferDate',
  label: '* Transfer Date',
  name: 'transferDate',
  type: 'datePicker',
  placeholder: 'Please select',
  isPassword: false,
  isShow: isShowForm
}, {
  controlId: 'transferTime',
  label: '* Transfer Time',
  name: 'transferTime',
  type: 'timePicker',
  placeholder: 'Please select',
  isPassword: false,
  isShow: isShowForm
}, {
  controlId: 'totalTransfer',
  label: '* Total Transfer Record',
  name: 'totalTransfer',
  type: 'text',
  placeholder: 'Please input',
  isPassword: false
}, {
  controlId: 'totalAmount',
  label: '* Transfer Amount',
  name: 'totalAmount',
  type: 'text',
  placeholder: 'Please input amount',
  isPassword: false,
  prefix: 'Rp'
}];

export default { formConfig };
