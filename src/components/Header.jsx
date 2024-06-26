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
  // ..............................................search bar................................................
















  const [dropdownOpen, setDropdownOpen] = useState({
    fertilizers: false,
    pesticides: false,
    fungicides: false,
    herbicides: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false); // State for account dropdown

  const authToken = useSelector((state) => state.auth.token);


  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      fertilizers: menu === 'fertilizers' ? !prev.fertilizers : false,
      pesticides: menu === 'pesticides' ? !prev.pesticides : false,
      fungicides: menu === 'fungicides' ? !prev.fungicides : false,
      herbicides: menu === 'herbicides' ? !prev.herbicides : false,
    }));
  };


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
  };

  return (
    <header className='bg-lime-200 shadow-md relaive top-0 z-20 w-full'>
      <div className='hidden md:block text-sm py-1'>
        <div className='container mx-auto  flex justify-between items-center text-gray-600'>
          <div className='flex gap-4'>
            <a href="/about" className='hover:text-green-600 transition'>About Us</a>
            <a href="/profile" className='hover:text-green-600 transition'>My Account</a>
            <a href="/cart" className='hover:text-green-600 transition'>Wishlists</a>
            <a href="/orders" className='hover:text-green-600 transition'>Order Tracking</a>
          </div>
          <div className='flex gap-4'>
            <h1>Need help? Call Us +91 9201016798</h1>
            <a href="/contact" className='hover:text-green-600 transition'>Contact</a>
          </div>
        </div>
      </div>
      <hr />

      <div className=' flex flex-wrap items-center justify-between bg-white w-full px-4'>
        <div className='flex items-center gap-4 '>
          <img className='w-32 md:pl-0 md:h-full md:w-30' src={log} alt="Logo" />

          <ProductSearch />
          <SearchedProduct />
        </div>
        <div className='md:ml-2 items-center lg:flex  hidden md:gap-6 text-lg'>
          <NavLink
            to='/productlist'
            className='flex items-center gap-2 hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Products <LuGitCompare />
          </NavLink>
          <NavLink
            to='/wishlist'
            className='flex items-center gap-2 hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Wishlist <FaRegHeart />
          </NavLink>
          <NavLink
            to='/cart'
            className='flex items-center gap-2 hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Cart <Cart />
          </NavLink>
          <div className='relative'>
            <button
              onClick={toggleAccountDropdown}
              className='flex items-center gap-2 hover:text-green-600 transition'
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
      <nav className='bg-white pb-2 hidden md:block'>
        <div className='container mx-auto flex justify-between'>
          <NavLink
            exact
            to='/'
            className='hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Home
          </NavLink>
          <div className='relative'>
            <button
              className='flex items-center hover:text-green-600 transition'
              onClick={() => toggleDropdown('fertilizers')}
            >
              Fertilizers <FaChevronDown className='ml-1' />
            </button>
            {dropdownOpen.fertilizers && (
              <div className='absolute z-10 top-full mt-2 bg-white shadow-lg'>
                <NavLink
                  to='/organic-fertilizers'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Organic Fertilizers
                </NavLink>
                <NavLink
                  to='/manures-soil'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Manures & Soil
                </NavLink>
                <NavLink
                  to='/npk-fertilizers'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  NPK Fertilizers
                </NavLink>
                <NavLink
                  to='/plant-growth-regulator'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Plant Growth Regulator
                </NavLink>
                <NavLink
                  to='/bio-fertilizers'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Bio Fertilizers
                </NavLink>
              </div>
            )}
          </div>
          <div className='relative'>
            <button
              className='flex items-center hover:text-green-600 transition'
              onClick={() => toggleDropdown('pesticides')}
            >
              Pesticides <FaChevronDown className='ml-1' />
            </button>
            {dropdownOpen.pesticides && (
              <div className='absolute top-full z-10 mt-2 bg-white shadow-lg'>
                <NavLink
                  to='/pesticides'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Pesticides
                </NavLink>
                <NavLink
                  to='/chemical-insecticides'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Chemical Insecticides
                </NavLink>
                <NavLink
                  to='/organic-pest-control'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Organic Pest Control
                </NavLink>
              </div>
            )}
          </div>
          <div className='relative'>
            <button
              className='flex items-center hover:text-green-600 transition'
              onClick={() => toggleDropdown('fungicides')}
            >
              Fungicides <FaChevronDown className='ml-1' />
            </button>
            {dropdownOpen.fungicides && (
              <div className='absolute z-10 top-full mt-2 bg-white shadow-lg'>
                <NavLink
                  to='/fungicides'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Fungicides
                </NavLink>
              </div>
            )}
          </div>
          <div className='relative'>
            <button
              className='flex items-center hover:text-green-600 transition'
              onClick={() => toggleDropdown('herbicides')}
            >
              Herbicides <FaChevronDown className='ml-1' />
            </button>
            {dropdownOpen.herbicides && (
              <div className='absolute z-10 top-full mt-2 bg-white shadow-lg'>
                <NavLink
                  to='/herbicides'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Herbicides
                </NavLink>
              </div>
            )}
          </div>
          <NavLink
            to='/blog'
            className='hover:text-green-600 transition'
            activeClassName='text-green-600'
          >
            Blogs
          </NavLink>
        </div>
      </nav>
      <div
        className={`absolute top-30 left-0 z-50 h-64 w-72 bg-gray-100 text-black p-5  duration-300 easween-in-out transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:hidden`}
      >
        <ul onClick={() => setIsOpen(false)}>
          <li className='mb-4'><NavLink to='/profile'>Profile</NavLink></li>
          <li className='mb-4'><NavLink to='/productlist'>Products</NavLink></li>
          <li className='mb-4'><NavLink to='/cart'>Cart</NavLink></li>
          <li className='mb-4'><NavLink to='/userorders'>Order</NavLink></li>
          <li className='mb-4'><NavLink to='/wishlist'>Wishlist</NavLink></li>
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
          <div className='relative'>
            <button
              className='flex items-center hover:text-green-600 transition'
              onClick={() => toggleDropdown('fertilizers')}
            >
              Fertilizers <FaChevronDown className='ml-1' />
            </button>
            {dropdownOpen.fertilizers && (
              <div className='absolute top-full mt-2 bg-white shadow-lg z-50'>
                <NavLink
                  to='/organic-fertilizers'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Organic Fertilizers
                </NavLink>
                <NavLink
                  to='/manures-soil'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Manures & Soil
                </NavLink>
                <NavLink
                  to='/npk-fertilizers'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  NPK Fertilizers
                </NavLink>
                <NavLink
                  to='/plant-growth-regulator'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Plant Growth Regulator
                </NavLink>
                <NavLink
                  to='/bio-fertilizers'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Bio Fertilizers
                </NavLink>
              </div>
            )}
          </div>
          <div className='relative'>
            <button
              className='flex items-center hover:text-green-600 transition'
              onClick={() => toggleDropdown('pesticides')}
            >
              Pesticides <FaChevronDown className='ml-1' />
            </button>
            {dropdownOpen.pesticides && (
              <div className='absolute top-full mt-2 bg-white shadow-lg z-50'>
                <NavLink
                  to='/pesticides'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Pesticides
                </NavLink>
                <NavLink
                  to='/chemical-insecticides'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Chemical Insecticides
                </NavLink>
                <NavLink
                  to='/organic-pest-control'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Organic Pest Control
                </NavLink>
              </div>
            )}
          </div>
          <div className='relative'>
            <button
              className='flex items-center hover:text-green-600 transition'
              onClick={() => toggleDropdown('fungicides')}
            >
              Fungicides <FaChevronDown className='ml-1' />
            </button>
            {dropdownOpen.fungicides && (
              <div className='absolute top-full mt-2 bg-white shadow-lg z-50'>
                <NavLink
                  to='/fungicides'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Fungicides
                </NavLink>
              </div>
            )}
          </div>
          <div className='relative'>
            <button
              className='flex items-center hover:text-green-600 transition'
              onClick={() => toggleDropdown('herbicides')}
            >
              Herbicides <FaChevronDown className='ml-1' />
            </button>
            {dropdownOpen.herbicides && (
              <div className='absolute top-full mt-2 bg-white shadow-lg z-50'>
                <NavLink
                  to='/herbicides'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Herbicides
                </NavLink>
                <NavLink
                  to='/international'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  International
                </NavLink>
                <NavLink
                  to='/returns'
                  className='block px-4 py-2 hover:text-green-600 transition'
                  activeClassName='text-green-600'
                >
                  Returns
                </NavLink>
              </div>
            )}
          </div>
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

