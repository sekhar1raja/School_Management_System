import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    note: '',
    courseId: '',
    sectionId: '',
    userId: '',
  });
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    fetchAnnouncements();
    fetchCourses();
    fetchSections();
  }, []);

  const fetchAnnouncements = () => {
    axios.get('http://localhost:8080/util/announcement')
      .then(response => setAnnouncements(response.data))
      .catch(error => console.error('Error fetching announcements:', error));
  };

  const fetchCourses = () => {
    axios.get('http://localhost:8080/util/course')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  };

  const fetchSections = () => {
    axios.get('http://localhost:8080/util/section')
      .then(response => setSections(response.data))
      .catch(error => console.error('Error fetching sections:', error));
  };

  const handleOpenDialog = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDialog(true);
    if (announcement) {
      setNewAnnouncement({
        note: announcement.note || '',
        courseId: announcement.courseoffered?.courseId || '',
        sectionId: announcement.section?.sectionId || '',
        userId: announcement.user?.userId || '',
      });
      setSelectedCourse(announcement.courseoffered?.courseId || '');
      setSelectedSection(announcement.section?.sectionId || '');
    } else {
      setNewAnnouncement({
        note: '',
        courseId: '',
        sectionId: '',
        userId: '',
      });
      setSelectedCourse('');
      setSelectedSection('');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAnnouncement(null);
  };

  const handleChange = (e) => {
    setNewAnnouncement({
      ...newAnnouncement,
      [e.target.name]: e.target.value
    });
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleAddAnnouncement = () => {
    const announcementData = {
      ...newAnnouncement,
      courseId: selectedCourse,
      sectionId: selectedSection,
    };

    axios.post('http://localhost:8080/util/announcement', announcementData)
      .then(() => {
        fetchAnnouncements();
        handleCloseDialog();
      })
      .catch(error => console.error('Error adding announcement:', error));
  };

  const handleDeleteAnnouncement = (id) => {
    axios.delete(`http://localhost:8080/util/announcement?announId=${id}`)
      .then(() => fetchAnnouncements())
      .catch(error => console.error('Error deleting announcement:', error));
  };

  const columns = [
    { field: 'announcementId', headerName: 'ID', width: 90 },
    { field: 'note', headerName: 'Note', width: 300 },
    { field: 'courseoffered', headerName: 'Course', width: 150, valueGetter: params => params.row.courseoffered?.courseName || 'N/A' },
    { field: 'section', headerName: 'Section', width: 150, valueGetter: params => params.row.section?.sectionName || 'N/A' },
    { field: 'user', headerName: 'User', width: 150, valueGetter: params => params.row.user?.userName || 'N/A' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenDialog(params.row)}>Edit</Button>
          <Button onClick={() => handleDeleteAnnouncement(params.row.announcementId)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Announcements</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog(null)}>Add Announcement</Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={announcements} columns={columns} pageSize={5} />
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div style={{ padding: '20px' }}>
          <h2>{selectedAnnouncement ? 'Edit Announcement' : 'Add Announcement'}</h2>
          <TextField
            label="Note"
            name="note"
            value={newAnnouncement.note}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              {courses.map(course => (
                <MenuItem key={course.courseId} value={course.courseName}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="section-label">Section</InputLabel>
            <Select
              labelId="section-label"
              value={selectedSection}
              onChange={handleSectionChange}
            >
              {sections.map(section => (
                <MenuItem key={section.sectionId} value={section.section}>
                  {section.section}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="User ID"
            name="userId"
            value={newAnnouncement.userId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddAnnouncement}>
            {selectedAnnouncement ? 'Update' : 'Add'}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Announcements;
