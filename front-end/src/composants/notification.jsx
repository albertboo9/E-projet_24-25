import '../styles/notification.css'
import Popup from 'reactjs-popup';

import React, { useState } from 'react';

const Notification = ({ count = 0, notifications = [] }) => {
  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = () => setShowPanel(!showPanel);

  const notificationList = notifications.map((notification) => (
    <Popup trigger={ <li key={notification.id} className={notification.isRead ? 'read' : 'unread'}>
      <img src={notification.avatar} alt="Avatar" />
      <strong>{notification.sender}</strong> {notification.message}
      <a href={notification.link}>{notification.linkText}</a>
      <span className="unread-indicator"></span>
    </li>} >{close => ( 
      <div>
        <h1>notification.sender</h1>

        <button onClick={close}> accepter </button>
        <button onclick={close}> refuser </button>
      </div>
    )}

    

    </Popup>
  ));

  return (
    <div className="notification">
      <input type="checkbox" id="btn" checked={showPanel} onChange={togglePanel} />
      <input type="checkbox" id="uro" />
      <label htmlFor="btn">
        <span className="counter">{count}</span>
      </label>
      <div className={`${showPanel ? 'panel' :'activ'}`}>
        <div className="unread-only">
          <span>Only show unread</span>
          <label htmlFor="uro">
            <span className="circle"></span>
          </label>
        </div>
        <ul>{notificationList}</ul>
      </div>
    </div>
  );
};

export default Notification;
