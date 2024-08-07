import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='user-profile'>
      {user ? (
        <>
          <h2>User Profile</h2>
          <div className='profile-details'>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;
