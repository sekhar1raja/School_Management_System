import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function createData(programName, numberOfSessions, attendancePercentage) {
  return { programName, numberOfSessions, attendancePercentage };
}

const rows = [
  createData('Web Development', 12, '75%'),
  createData('Data Science', 10, '85%')
];

function RegistrationPage() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <h1>My Attendance</h1>
      <p>Attendance Register</p>
      <Box width="80%" mt={2}>
        <TableContainer component={Paper}>
          <Table aria-label="attendance table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#d1e4f336' }}>
                <TableCell sx={{ color: 'black', fontWeight:'100' }}>Program Name</TableCell>
                <TableCell sx={{ color: 'black',fontWeight:'100' }} align="right"># of Sessions</TableCell>
                <TableCell sx={{ color: 'black',fontWeight:'100' }} align="right">% of Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow 
                  key={row.programName}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <TableCell component="th" scope="row" sx={{color:'blue'}}>
                    {row.programName}
                  </TableCell>
                  <TableCell align="right">{row.numberOfSessions}</TableCell>
                  <TableCell align="right">{row.attendancePercentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default RegistrationPage;
