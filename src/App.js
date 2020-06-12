import React from 'react';
import './App.css';

import { getSignature } from './config/zoom'

function App() {
  function handleSubmit(e) {
    e.preventDefault();

    const meetConfig = {
      apiKey: process.env.API_KEY,
      meetingNumber: e.target['meeting_number'].value,
      leaveUrl: 'http://localhost:3000/end',
      userName: e.target['display_name'].value,
      userEmail: '', // required for webinar
      passWord: e.target['meeting_pwd'].value, // if required
      role: parseInt(e.target['meeting_role'].value) // 1 for host; 0 for attendee or webinar
    }

    getSignature(meetConfig);
  }

  return (
    <div className="App">
      <nav id="nav-tool" className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Zoom WebSDK</a>
          </div>
          <div id="navbar" className="websdktest">
            <form className="navbar-form navbar-right" id="meeting_form"
              onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="display_name" id="display_name" maxLength="100"
                  placeholder="Name" className="form-control" required />
              </div>

              <div className="form-group">
                <input type="text" name="meeting_number" id="meeting_number" maxLength="11"
                  style={{ width: 150 }} placeholder="Meeting Number" className="form-control" required />
              </div>

              <div className="form-group">
                <input type="text" name="meeting_pwd" id="meeting_pwd" style={{ width: 150 }}
                  maxLength="32" placeholder="Meeting Password" className="form-control" />
              </div>

              <div className="form-group">
                <select id="meeting_role" className="sdk-select">
                  <option value={0}>Attendee</option>
                  <option value={1}>Host</option>
                  <option value={5}>Assistant</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" id="join_meeting">Join</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
