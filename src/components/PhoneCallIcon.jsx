import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const PhoneCallIcon = ({ phoneNumber }) => {
    const handlePhoneCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div className='z-50 fixed top-[90%] left-[5%]  rounded-full bg-blue-500 py-2 px-3'>
            <a href={`tel:${phoneNumber}`} onClick={handlePhoneCall}>
                <FontAwesomeIcon icon={faPhone} size="lg" />
            </a>
        </div>
    );
};

export default PhoneCallIcon;
