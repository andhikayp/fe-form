import React from 'react';
import { Table, Pagination } from 'react-bootstrap';

const TableLayout = (props) => {
  const {
    renderTableHead, renderTableContent, totalPages, currentPage, handlePageChange
  } = props;

  return (
    <div className="my-4">
      <Table hover>
        <thead className="bg-light">
          <tr className="text-left align-top bg-light">
            {renderTableHead()}
          </tr>
        </thead>
        <tbody>
          {renderTableContent()}
        </tbody>
      </Table>
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
    </div>
  );
};

export default TableLayout;
