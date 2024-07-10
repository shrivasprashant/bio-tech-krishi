import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaRegHeart, FaChevronDown } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import log from "../components/images/logo.png";
import { LuGitCompare } from "react-icons/lu";
import Cart from './Cart';
import { FiAlignLeft } from "react-icons/fi";
import Blogs from './Blogs';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import ProductSearch from './ProductSearch';
import SearchedProduct from './SearchedProduct';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false); // State for account dropdown

  const authToken = useSelector((state) => state.auth.token);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
  };

  return (
    <header className='bg-[#467d1b] shadow-md relaive  top-0 z-20 w-full '>
      <div className='hidden md:block text-sm py-1 '>
        <div className='container mx-auto  flex justify-between items-center px-6 text-white'>
          <div className='flex gap-4'>
            <a href="/about" className='hover:text-green-600 transition '>About Us</a>
            <a href="/profile" className='hover:text-green-600 transition'>My Account</a>
          </div>
          <div className='flex gap-4'>
            <h1>Need help? Call Us +91 9201016798</h1>
            <a href="/contact" className='hover:text-green-600 transition'>Contact</a>
          </div>
        </div>
      </div>
      <hr />
      <div className='  flex flex-wrap items-center justify-between   bg-[#E7F0DC] w-full px-4'>
        <div className='flex items-center gap-4 '>
          <img className='w-32 md:pl-0 md:h-full md:w-30' src={log} alt="Logo" />
        </div>
        <div className="">
          <ProductSearch />
          <SearchedProduct />
        </div>
        <div className='md:ml-2 items-center lg:flex  hidden md:gap-6  text-lg '>
          <NavLink
            to='/productlist'
            className='flex items-center gap-2 p-1 bg-[#589826] rounded-lg text-white hover:text-white hover:bg-[#3a5c3a] transition'
            activeClassName='text-green-400'
          >
            Products <LuGitCompare />
          </NavLink>
          <NavLink
            to='/cart'
            className='flex items-center text-white p-1 gap-2  bg-[#589826] rounded-md hover:bg-[#3a5c3a] transition'
            activeClassName='text-green-600'
          >
            Cart <Cart />
          </NavLink>
          <div className='relative'>
            <button
              onClick={toggleAccountDropdown}
              className='flex items-center gap-2 text-white p-1 bg-[#589826] rounded-md hover:bg-[#3a5c3a] transition'
            >
              Account <VscAccount />
            </button>
            {accountDropdownOpen && (
              <div onClick={() => setAccountDropdownOpen(false)} className='absolute z-10 top-full  bg-white shadow-lg'>
                {authToken ? (
                  <>
                    <NavLink
                      to='/profile'
                      className='block px-4 py-2 hover:text-green-600 transition'
                      activeClassName='text-green-600'
                      onClick={toggleAccountDropdown}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to='/userorders'
                      className='block px-4 py-2 hover:text-green-600 transition'
                      activeClassName='text-green-600'
                      onClick={toggleAccountDropdown}
                    >
                      Orders
                    </NavLink>
                    <NavLink
                      to='/signin'
                      className='block px-4 py-2 hover:text-green-600 transition'
                      activeClassName='text-green-600'
                      onClick={toggleAccountDropdown}
                    >
                      <LogoutButton />
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to='/signin'
                    className='block px-4 py-2 hover:text-green-600 transition'
                    activeClassName='text-green-600'
                  >
                    Login
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </div>
        <button
          className='md:hidden border-none px-2'
          onClick={toggleMenu}
        >
          <FiAlignLeft className='text-2xl' />
        </button>
      </div>
      <nav className='bg-white p-3 hidden md:block'>
        <div className='container mx-auto flex justify-between'>
          <div className="relative group overflow-hidden border-2 border-gray-300 px-5 py-2 rounded-md">
            <NavLink
              exact
              to='/'
              className='flex items-center text-lg font-bold relative group z-10  rounded-md text-black hover:text-white transition px-1 overflow-hidden'
              activeClassName='text-green-600'
            >
              Home
            </NavLink>
            <span className="absolute w-full h-full bg-[#589826] left-0 bottom-[-100%] rounded-full transition-all ease duration-400 group-hover:bottom-0 group-hover:rounded-none group-hover:text-black"></span>
          </div>
          <div className="relative group overflow-hidden border-2 border-gray-300 px-4 py-2  rounded-md">
            <NavLink
              to='/category/Fertilizers'
              className='flex items-center text-lg font-bold relative group z-10  rounded-md text-black hover:text-white transition px-1 overflow-hidden'
              activeClassName='text-green-600'
            >
              Fertilizers
            </NavLink>
            <span className="absolute w-full h-full bg-[#589826] left-0 bottom-[-100%] rounded-full transition-all ease duration-400 group-hover:bottom-0 group-hover:rounded-none group-hover:text-black"></span>
          </div>
          <div className="relative group overflow-hidden border-2 border-gray-300 px-5 py-2 rounded-md">
            <NavLink
              to='/category/Pesticides'
              className='flex items-center text-lg font-bold relative group z-10  rounded-md text-black hover:text-white transition px-1 overflow-hidden'
              activeClassName='text-green-600'
            >
              Pesticides
            </NavLink>
            <span className="absolute w-full h-full bg-[#589826] left-0 bottom-[-100%] rounded-full transition-all ease duration-400 group-hover:bottom-0 group-hover:rounded-none group-hover:text-black"></span>
          </div>
          <div className="relative group overflow-hidden border-2 border-gray-300 px-5 py-2 rounded-md">
            <NavLink
              to='/category/Fungicides'
              className='flex items-center text-lg font-bold relative group z-10  rounded-md text-black hover:text-white transition px-1 overflow-hidden'
              activeClassName='text-green-600'
            >
              Fungicides
            </NavLink>
            <span className="absolute w-full h-full bg-[#589826] left-0 bottom-[-100%] rounded-full transition-all ease duration-400 group-hover:bottom-0 group-hover:rounded-none group-hover:text-black"></span>
          </div>
          <div className="relative group overflow-hidden border-2 border-gray-300 px-5 py-2 rounded-md">
            <NavLink
              to='/category/Herbicide'
              className='flex items-center text-lg font-bold relative group z-10  rounded-md text-black hover:text-white transition px-1 overflow-hidden    '
              activeClassName='text-green-600'
            >
              Herbicide
            </NavLink>
            <span className="absolute w-full h-full bg-[#589826] left-0 bottom-[-100%] rounded-full transition-all ease duration-400 group-hover:bottom-0 group-hover:rounded-none group-hover:text-black"></span>
          </div>
          <div className="relative group overflow-hidden border-2 border-gray-300 px-5 py-2 rounded-md">
            <NavLink
              to='/blog'
              className='flex items-center text-lg font-bold relative group z-10  rounded-md text-black hover:text-white transition px-1 overflow-hidden  '
              activeClassName='text-green-600'
            >
              Blogs
            </NavLink>
            <span className="absolute w-full h-full bg-[#589826] left-0 bottom-[-100%] rounded-full transition-all ease duration-400 group-hover:bottom-0 group-hover:rounded-none group-hover:text-black"></span>

          </div>

        </div>
      </nav>
      <div
        className={`absolute top-30 left-0 z-50 h-64 w-72 bg-gray-100 text-black px-5 py-3 duration-300 easween-in-out transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:hidden`}
      >
        <ul onClick={() => setIsOpen(false)}>
          <li className='mb-4'><NavLink to='/profile'>Profile</NavLink></li>
          <li className='mb-4'><NavLink to='/productlist'>Products</NavLink></li>
          <li className='mb-4'><NavLink to='/cart'>Cart</NavLink></li>
          <li className='mb-4'><NavLink to='/userorders'>Order</NavLink></li>
          {authToken ? (<li className='mb-4'><NavLink to='/logout'>Logout</NavLink></li>) : (
            <li className='mb-4'><NavLink to='/signin'>Login</NavLink></li>
          )}
        </ul>
        <div className='container bg-gray-100 bg-transparent-sm md:hidden z-50 transition-all duration-1000 ease-in-out  flex flex-col py-4 px-4 gap-8 text-base text-gray-800 absolute w-72 top-64 left-0 right-0'>
          <NavLink
            onClick={() => setIsOpen(false)}
            exact
            to='/'
            className='hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Home
          </NavLink>
          <NavLink
            to='/category/Fertilizers'
            className='flex items-center hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Fertilizers
          </NavLink>
          <NavLink
            to='/category/Pesticides'
            className='flex items-center hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Pesticides
          </NavLink>
          <NavLink
            to='/category/Fungicides'
            className='flex items-center hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Fungicides
          </NavLink>
          <NavLink
            to='/category/Herbicides'
            className='flex items-center hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Herbicides
          </NavLink>
          <NavLink
            to='/blog'
            className='hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Blogs
          </NavLink>
          <NavLink
            to='/contact'
            className='hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
