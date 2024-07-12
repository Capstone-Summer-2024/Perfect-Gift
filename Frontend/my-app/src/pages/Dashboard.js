import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log('Updating account info:', { email, password });
        if(newEmail !== null && newEmail !== ""){ 
            setEmail(newEmail);
            alert('Updated account information successfully!');
        }
        if(newPassword !== null && newPassword !== ""){ 
            setPassword(newPassword);
            alert('Updated account information successfully!');
        }
    };

    const handleLogout = () => {
        console.log('Logging out...');
        alert('Logged out successfully!');
    };    

    return (
        <div className={styles.container}>
            <h2>Account Settings</h2>
            
            <p>If you would like to see your favorites click the button below</p>
            <Link to= "/product-grid">
                <button className={styles.favoriteButton}>Go To Favorites</button>
            </Link> 
            
            <form id="accountForm" onSubmit={handleUpdate}>
                <label type="password" for="email">Current Email: {email}</label>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder=" EMAIL" onChange={(e) => setNewEmail(e.target.value)}/>
                
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder=" PASSWORD" onChange={(e) => setNewPassword(e.target.value)}/>

                <button type="submit">Update</button>
            </form>
            <Link to= "/">
                <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </Link>
        </div>
    );
};

export default Dashboard;  