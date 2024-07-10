import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    return (
        <div className={styles.container}>
            <h2>Account Settings</h2>
            <form id="accountForm">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="  USERNAME" required/>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="  EMAIL" required/>
                
                <label for="password">Password:</label>
                <input type="password" name="password" placeholder="  PASSWORD" required/>
                
                <button type="submit">Update</button>
            </form>
            <button className={styles.logoutButton}>Logout</button>
        </div>
    );
};

export default Dashboard;  