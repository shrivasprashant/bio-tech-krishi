import React, { useState, useEffect } from 'react';
import Sidebar from './Dash/Sidebar';

function Admin() {
    const [adminName, setAdminName] = useState('Admin');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        // Set admin name from storage or API
        const adminNameFromStorage = localStorage.getItem('adminName');
        if (adminNameFromStorage) {
            setAdminName(adminNameFromStorage);
        }

        // Update current time every second
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSidebarItemClick = (itemName) => {
        // Handle direct access to sidebar items
        console.log('Clicked on sidebar item:', itemName);
    };

    return (
        <div className='flex w-full flex-row bg-gray-300'>
            <div className='flex w-1/5'><Sidebar onItemClick={handleSidebarItemClick} /></div>
            <div className='flex flex-col w-4/5 p-8'>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome, {adminName}</h1>
                        <p className="text-gray-600">Current Time: {currentTime}</p>
                    </div>
                    <div className="space-x-4">
                        <button onClick={() => handleSidebarItemClick('Dashboard')} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Dashboard</button>
                    </div>
                </div>
                <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Panel</h2>
                    <p className="text-gray-700">This is the admin panel. Here you can manage your website. </p>
                </div>
                <img src="src\assets\BHARTIYA.jpg" alt="Admin Panel" style={{ width: '32%',margin: 'auto', height: 'auto', marginTop: '20px',borderRadius: '50%' , border: '1px solid black', zIndex: '10',  }} />
            </div>
        </div>
    );
}

export default Admin;
