import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useSelector((state) => state.auth.userId);
    const authToken = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (userId && authToken) {
            fetchProfile();
        }
    }, [userId, authToken]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`https://api.bhartiyabiotech.com/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log('user profile data:', data);
                setUserData(data);
                setLoading(false);
            } else {
                setError('Failed to fetch user profile data');
                setLoading(false);
            }
        } catch (error) {
            setError('Error fetching user profile data');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="container mx-auto my-10 p-5 bg-lime-200 shadow-lg rounded-lg w-[70%]">
                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                    <img
                        src={`https://robohash.org/${userData.id}.png?size=150x150`}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mb-4 md:mb-0"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                        <p className="text-gray-600">{userData.email}</p>
                        <p className="text-gray-600">{userData.mobile_number}</p>
                        <p className="text-gray-600 capitalize">{userData.gender}</p>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Address</h2>
                    <div className="mt-4 text-gray-600 space-y-1">
                        <p>{userData.address && userData.address.colony}</p>
                        <p>{userData.address && userData.address.city}, {userData.address && userData.address.zipcode}</p>
                        <p>{userData.address && userData.address.pincode}, {userData.address && userData.address.zipcode}</p>
                        <p>{userData.address && userData.address.state}, {userData.address && userData.address.zipcode}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Profile;
