
import React, { useState } from 'react';
import useSharedList from './useSharedList';

const SignUp = () => {
  // State to store form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State to store the list of users
  const [users, setUsers] = useState([]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form fields (simple check for now)
    if (username && password) {
      // Add new user to the users list
      setUsers([...users,{username, password }]);

      //shared code below
      // useSharedList.addItem([...users,{username, password }]);
      // alert(useSharedList.users);



      // Reset form fields
      setUsername('');
      setPassword('');  
      
      alert(users);
    } else {
      alert('Please enter both username and password!');
    }
  };

  return (
    <div>
      <h2>User Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <h3>Registered Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username} - {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SignUp;
