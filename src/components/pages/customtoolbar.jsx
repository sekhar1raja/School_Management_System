import React from 'react';
import { Toolbar } from 'react-big-calendar';
import IconButton from '@mui/material/IconButton';
import TodayIcon from '@mui/icons-material/Today';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../pages/style.css';

const CustomToolbar = (toolbar) => {
  return (
    <div class="btn-group">
      <span >
        <IconButton class="icon-button" onClick={() => toolbar.onNavigate('TODAY')}>
          <TodayIcon />
        </IconButton>
        <IconButton  class="icon-button" onClick={() => toolbar.onNavigate('PREV')}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton class="icon-button" onClick={() => toolbar.onNavigate('NEXT')}>
          <ArrowForwardIcon />
        </IconButton>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <span className="rbc-btn-group" >
        <button class="icon-button" type="button" onClick={() => toolbar.onView('month')}>Month</button>
        <button class="icon-button"type="button" onClick={() => toolbar.onView('week')}>Week</button>
        <button class="icon-button" type="button" onClick={() => toolbar.onView('day')}>Day</button>
        <button class="icon-button" type="button" onClick={() => toolbar.onView('agenda')}>Agenda</button>
      </span>
    </div>
  );
};

export default CustomToolbar;
