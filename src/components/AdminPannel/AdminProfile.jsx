import React, { useState, useEffect } from 'react';
import Sidebar from './Dash/Sidebar';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
// import { setAuthToken } from '../redux/authSlice';

const AdminProfile = () => {
    const userId = useSelector((state) => state.auth.userId);
    const authToken = useSelector((state) => state.auth.token); // Change authToken to token
    const dispatch = useDispatch(); // Initialize useDispatch

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        language: '',
        password: ''
    });

    const [originalProfile, setOriginalProfile] = useState(null);

    useEffect(() => {
        if (userId && authToken) { // Check if userId and authToken are available
            fetchProfile();
        }
    }, [userId, authToken]); // Update dependencies

    const fetchProfile = async () => {
        try {
            const response = await fetch(`https://api.bhartiyabiotech.com/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Admin profile data:', data);
                setProfile(data);
                setOriginalProfile(data);
            } else {
                console.error('Failed to fetch admin profile data');
            }
        } catch (error) {
            console.error('Error fetching admin profile data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log('Profile saved', profile);
    };

    const handleBack = () => {
        console.log('Back button clicked');
    };

    return (
        <div className="min-h-screen mx-auto flex bg-gray-100 p-6">
            <div className='w-1/6 shadow-md'> <Sidebar /> </div>
            <div className='w-5/6 m-2 p-4'>
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-700 p-6 text-white flex justify-between items-center">
                        <div className="text-right">
                            <h1 className="text-3xl font-bold">Admin Profile</h1>
                            <p className="mt-2">Manage your profile information</p>
                        </div>
                        <img
                            className='rounded-full'
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt="Profile"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={profile.mobile_number}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={profile.password}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={profile.role}
                                disabled
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Language</label>
                            <select
                                name="language"
                                value={profile.language}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            >
                                <option>English</option>
                                <option>Hindi</option>
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleBack}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
