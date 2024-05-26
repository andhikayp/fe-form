import React from 'react';
import { Table, Pagination } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const TableLayout = (props) => {
  const {
    renderTableHead, renderTableContent, totalPages, currentPage, handlePageChange, totalItems,
    setItemsPerPage
  } = props;

  const onChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  const renderDropdown = () => (
    <Form.Select
      onChange={onChange}
      name="dropdown"
    >
      <option value={5} selected>5/page</option>
      <option value={10}>10 / page</option>
      <option value={20}>20 / page</option>
      <option value={50}>50 / page</option>
    </Form.Select>
  );

  return (
    <div className="my-4">
      <Table hover responsive>
        <thead className="bg-light">
          <tr className="text-left align-top bg-light">
            {renderTableHead()}
          </tr>
        </thead>
        <tbody>
          {renderTableContent()}
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
          <div className="text-align-right">{`Total ${totalItems} items`}</div>
          {renderDropdown()}
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
