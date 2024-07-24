// Dashboard.js
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import FavoritesGrid from "../components/FavoritesGrid";
import { getAuth, onAuthStateChanged, verifyBeforeUpdateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error('No user is currently logged in.');
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const reauthenticate = async (currentPassword) => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!newEmail && !newPassword) {
      alert('Please provide a new email or new password to update.');
      return;
    }

    if (user) {
      try {
        await reauthenticate(currentPassword);
      } catch (error) {
        setError(error.message);
        alert('Your current password may be incorrect. Please provide your current password for updating any account information');
        return;
      }
      
      //Update email
      if (newEmail && newEmail !== '') {
        try {
          await verifyBeforeUpdateEmail(user, newEmail);
          alert('Please go to your new email to verify the address. Your email will update once it is verified');
        } catch (error) {
          setError(error.message);
          alert('Failed to update email. You may need to verify your email address before updating.');
          sendEmailVerification(user);
        }
      }

      //Update password
      if (newPassword && newPassword !== '') {
        try {
          await updatePassword(user, newPassword);
          alert('Updated password successfully!');
        } catch (error) {
          setError(error.message);
          alert('Failed to update password.');
          return;
        }
        
      }

      // Refetch user info after updates
      await user.reload();
      setUser(auth.currentUser);
    } else {
      alert('No user is currently logged in.');
      navigate('/');
    }

    document.getElementById('accountForm').reset();
  };

  return (
    <div className={styles.dashboardContainer}>
      <form id="accountForm" onSubmit={handleUpdate} className={styles.container}>
        <h2>Account Settings</h2>

        <label htmlFor="accountForm" className={styles.passDisc}>
          To Update either your email or password, please provide your current password.
        </label>

        <label htmlFor="password">Current Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="currentPassword"
          name="password"
          placeholder=" CURRENT PASSWORD"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label htmlFor="email">Update Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder=" EMAIL"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        
        <label htmlFor="password">New Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="newPassword"
          name="password"
          placeholder=" NEW PASSWORD"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className={styles.checkbox}
          />
          Reveal Password
        </label>

        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.updateButton}>Update</button>
      </form>
      <FavoritesGrid /> {/* Add the FavoritesGrid component here */}
    </div>
  );
};

export default Dashboard;
