import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

const Chat = () => {
  const phoneNumber = "+919201016798"; 
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div>
      <div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <button className="md:w-32 md:p-0 p-3 z-50 fixed top-[90%] right-[5%] bg-green-100 rounded-full flex items-center justify-center">
            <p className="text-center text-sm hidden md:block">Chat with us</p>
            <IoLogoWhatsapp
              style={{
                width: "30px",
                color: "green",
                height: "30px",
              }}
            />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Chat;
