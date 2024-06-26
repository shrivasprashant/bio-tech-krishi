import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

const Chat = () => {
  const phoneNumber = "+919201016798"; 
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div>
      <div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <button className="w-32 z-50 fixed top-[80%] right-[10%] bg-green-100 rounded-full flex items-center justify-center">
            <p className="text-center text-sm">Chat with us</p>
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
