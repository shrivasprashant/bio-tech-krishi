import React from 'react';
import 'tailwindcss/tailwind.css';

const Marquee = () => {
    return (
        <div className="overflow-hidden fixed bg-gray-100  bottom-0">
            <div className="whitespace-nowrap animate-marquee py-2">
                <span className="text-lg text-gray-800 mx-4 font-extrabold">
                    Need Help? Contact our customer care at  +91 9201016798
                </span>
                <span className="text-lg text-gray-800 mx-4 font-extrabold">
                    Email us at  biotechbhartiya@gmail.com 
                </span>
                <span className="text-lg text-gray-800 mx-4 font-extrabold">
                    Visit our FAQ page for more info
                </span>
                <span className="text-lg text-gray-800 mx-4 font-extrabold">
                    Follow us on social media for updates
                </span>
            </div>
        </div>
    );
};

export default Marquee;
