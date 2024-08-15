import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './LeaveApprove.css'; // Import your custom styles    

function LeaveApprove() {
  const [leaveApprove, setLeaveApprove] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:8080/util/getProfessorLeaveRequest?prof_id=${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Leave Requests:', data); // Debug log
        setLeaveApprove(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching leave requests:', error));
  }, [userId]);

  const handleStatusChange = (requestId, status) => {
    const payload = {
      leaveRequestId: requestId,
      isApproved: status,
    };

    fetch('http://localhost:8080/util/leaveRequest', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          // Update the state to reflect the new status
          setLeaveApprove(prevState =>
            prevState.map(leave =>
              leave.leaveRequestId === requestId ? { ...leave, isApproved: status } : leave
            )
          );
        } else {
          console.error('Failed to update leave status');
        }
      })
      .catch(error => console.error('Error updating leave status:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Leave Approval</h1>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Leave Reason</th>
            <th scope="col">To Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveApprove.map((leave, index) => (
            <tr key={index}>
              <td>{leave.student_id.firstName}</td>
              <td>{leave.leaveReason}</td>
              <td>{leave.toDate}</td>
              <td>
                {leave.isApproved === 1
                  ? 'Approved'
                  : leave.isApproved === 2
                  ? 'Rejected'
                  : 'Pending'}
              </td>
              <td>
                <button
                  onClick={() => handleStatusChange(leave.leaveRequestId, 1)}
                  disabled={leave.isApproved === 1}
                  className={`btn btn-circle ${
                    leave.isApproved === 1 ? 'btn-success' : 'btn-outline-success'
                  }`}
                >
                  ✓
                </button>
                <button
                  onClick={() => handleStatusChange(leave.leaveRequestId, 2)}
                  disabled={leave.isApproved === 2}
                  className={`btn btn-circle ${
                    leave.isApproved === 2 ? 'btn-danger' : 'btn-outline-danger'
                  } ml-2`}
                >
                  ✗
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveApprove;
