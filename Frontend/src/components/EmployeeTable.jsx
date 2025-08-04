// import React from 'react';
// import EmployeeRow from './EmployeeRow';

// const EmployeeTable = ({ employees, handleEdit, handleDelete }) => (
//   <div className="table-responsive">
//     <title>Employee Details</title>
//     <table className="table table-striped table-hover table-bordered align-middle shadow-sm bg-white">
//       <thead className="table-primary">
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Department</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {employees.length === 0 ? (
//           <tr>
//             <td colSpan="5" className="text-center text-muted py-4">
//               No employees found
//             </td>
//           </tr>
//         ) : (
//           employees.map(emp => (
//             <EmployeeRow
//               key={emp.id}
//               emp={emp}
//               handleEdit={handleEdit}
//               handleDelete={handleDelete}
//             />
//           ))
//         )}
//       </tbody>
//     </table>
//   </div>
// );

// export default EmployeeTable;
import React from 'react';
import EmployeeRow from './EmployeeRow';

const EmployeeTable = ({ employees, handleEdit, handleDelete }) => (
  <div className="table-responsive">
    <title>Employee Details</title>
    <table className="table table-striped table-hover table-bordered align-middle shadow-sm bg-white">
      <thead className="table-primary">
        <tr>
          <th>ID</th> {/* Serial number instead of database ID */}
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center text-muted py-4">
              No employees found
            </td>
          </tr>
        ) : (
          employees.map((emp, index) => (
            <EmployeeRow
              key={emp._id || emp.id} // still use db id for key
              serial={index + 1}       // pass serial number to the row
              emp={emp}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
