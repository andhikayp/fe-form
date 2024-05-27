import React from 'react';
import { Table, Pagination } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { CiFolderOff } from 'react-icons/ci';

const TableLayout = (props) => {
  const {
    tableHeadConfig, renderTableContent, totalPages, currentPage, handlePageChange, totalItems,
    setItemsPerPage, isEmpty
  } = props;

  const renderTableHeaderItem = (item) => (
    <th style={{ backgroundColor: '#FAFAFA', fontWeight: '400', ...item.style }}>{item.name}</th>
  );

  const onChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  const renderDropdown = () => (
    <Form.Select
      onChange={onChange}
      name="dropdown"
    >
      <option value={5} selected>5 / page</option>
      <option value={10}>10 / page</option>
      <option value={20}>20 / page</option>
      <option value={50}>50 / page</option>
    </Form.Select>
  );

  const renderEmptyState = () => (
    <tr className="">
      <td colSpan={tableHeadConfig.length} className="">
        <div className="d-flex justify-content-center align-items-center flex-column text-center" style={{ height: '200px' }}>
          <img alt="emptyState" src="https://icons.iconarchive.com/icons/mazenl77/NX11/128/Folder-Default-icon.png" width="64" height="64" />
          <div className="text-secondary">No Data</div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="my-4">
      <Table hover responsive>
        <thead className="bg-light">
          <tr className="text-left align-top bg-light">
            {tableHeadConfig.map(renderTableHeaderItem)}
          </tr>
        </thead>
        <tbody>
          {isEmpty ? renderEmptyState() : renderTableContent()}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Pagination
          className="text-warning"
          linkStyle={{ backgroundColor: 'yellow' }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        <div>
          <div className="d-flex justify-content-center">{`Total ${totalItems} items`}</div>
          {renderDropdown()}
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
