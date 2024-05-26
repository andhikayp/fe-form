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
}];

export default { formConfig };
