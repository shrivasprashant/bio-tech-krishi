import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuPhoneCall} from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

const Signup = () => {
  const [name, setuName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const [show, setshow] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    // if (!acceptedTerms) {
    //   return;
    // }
    try {
      const response = await axios.post(
        "https://api.bhartiyabiotech.com/user",
        { name, email, mobile_number, password }
      );
      if (response) {
        navigate("/signin");
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // <div classNameName="flex flex-col justify-center font-[sans-serif] text-[#333] sm:h-screen pt-6">
    //   <div className="max-w-md w-full h-screen mx-auto border border-gray-300 rounded-md p-6 bg-lime-200">
    //     <form onSubmit={handleSubmit}>
    //       <div className="space-y-2">
    //         <div className="relative">
    //           <label className="text-sm mb-2 block">Name</label>
    //           <input
    //             name="name"
    //             type="text"
    //             value={name}
    //             onChange={(e) => setuName(e.target.value)}
    //             className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
    //             placeholder="Enter name"
    //           />
    //         </div>
    //         <div>
    //           <label className="text-sm mb-2 block">Email </label>
    //           <input
    //             name="email"
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
    //             placeholder="Enter email"
    //           />
    //         </div>
    //         <div>
    //           <label className="text-sm mb-2 block">Mobile Number</label>
    //           <input
    //             name="mobile_number"
    //             type="text"
    //             value={mobile_number}
    //             onChange={(e) => setMobile_number(e.target.value)}
    //             className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
    //             placeholder="Enter Mobile Number"
    //           />
    //         </div>
    //         <div>
    //           <label className="text-sm mb-2 block">Password</label>
    //           <input
    //             name="password"
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
    //             placeholder="Enter password"
    //           />
    //         </div>
    //         <div>
    //           <label className="text-sm mb-2 block">Confirm Password</label>
    //           <input
    //             name="cpassword"
    //             type="password"
    //             value={confirmPassword}
    //             onChange={(e) => setConfirmPassword(e.target.value)}
    //             className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
    //             placeholder="Enter confirm password"
    //           />
    //         </div>

    //         {/* <div className="flex items-center">
    //           <input
    //             id="remember-me"
    //             name="rememberMe"
    //             type="checkbox"
    //             checked={acceptedTerms}
    //             onChange={(e) => setAcceptedTerms(e.target.checked)}
    //             className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    //           />
    //           <label htmlFor="remember-me" className="ml-3 block text-sm">
    //             I accept the{" "}
    //             <a
    //               href="/"
    //               className="text-blue-600 font-semibold hover:underline ml-1"
    //             >
    //               Terms and Conditions
    //             </a>
    //           </label>
    //         </div> */}
    //       </div>
    //       <div className="!mt-10">
    //         <button
    //           type="submit"
    //           className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
    //         >
    //           Create an account
    //         </button>
    //       </div>
    //       <p className="text-sm mt-6 text-center">
    //         Already have an account?{" "}
    //         <a
    //           href="/signin"
    //           className="text-blue-600 font-semibold hover:underline ml-1"
    //         >
    //           Login here
    //         </a>
    //       </p>
    //     </form>
    //   </div>
    // </div>
    <div className="bg-cover bg-center min-h-full w-full" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551970634-747846a548cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}  >
      
    <div className="   font-[sans-serif] bg-transparent max-w-5xl flex items-center mx-auto md:min-h-screen p-4 md:bg-transparent">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700  lg:px-8 px-4 py-4">
          <div>
           
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
            <p className="text-white text-lg font-semibold">  <span className="text-green-600 text-lg font-semibold">Bhartiya Biotech</span> - Innovating Agriculture, Sustaining Futures.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Namaskar! Bhartiya Biotech is your trusted partner in the realm of agricultural biotechnology</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Explore our website to learn more about our products, their applications, and how Bhartiya Biotech can contribute to your agricultural success. Join us in shaping the future of farming with sustainable, innovative solutions. Together, let’s grow towards a prosperous agricultural landscape for generations to come.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-2 w-full py-6 px-6   shadow-lg sm:px-16 border">
          <div className="mb-6">
            <h3 className="text-gray-100 text-2xl font-bold">Create an account</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-200 text-sm mb-2 block">Full-Name</label>
              <div className="relative flex items-center">
                <input  onChange={(e) => setuName(e.target.value)} value={name} name="name" type="text" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter name" />
               
                <FaRegUser className="w-4 h-4 absolute right-4"/>
              </div>
            </div>

            <div>
              <label className="text-gray-200 text-sm mb-2 block">Email Id</label>
              <div className="relative flex items-center">
                <input   value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" />
                
                <MdMailOutline className="w-4 h-4 absolute right-4" />
              </div>
            </div>
            <div>
              <label  className="text-gray-200 text-sm mb-2 block">Phone Number</label>
              <div className="relative flex items-center">
                <input  value={mobile_number} onChange={(e) => setMobile_number(e.target.value)} name="mobile_number" type="text" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
               
                <LuPhoneCall className="w-4 h-4 absolute right-4 cursor-pointer" />
              </div>
            </div>

            <div>
              <label  className="text-gray-200 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
                
                <FaRegEye className="w-4 h-4 absolute right-4 cursor-pointer"  />
              </div>
            </div>
            <div>
              <label className="text-gray-200 text-sm mb-2 block">Confirm Password</label>
              <div className="relative flex items-center">
                <input  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="cpassword" type="password" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter Confirm password" />
                <FaRegEye className="w-4 h-4 absolute right-4 cursor-pointer"  />
              </div>
            </div>

            {/* <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="remember-me" className="ml-3 block text-sm text-gray-800">
                I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div> */}
          </div>

          <div className="!mt-12">
            <button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white hover:bg-green-700 bg-gray-800 focus:outline-none">
              Create an account
            </button>
          </div>
          <p className="text-gray-200 text-sm mt-6 text-center">Already have an account? <a  href="/signin" className="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
