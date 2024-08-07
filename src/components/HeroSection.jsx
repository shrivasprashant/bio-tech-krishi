import React from 'react'
import logo from "../components/images/logo.png"
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div class="flex flex-wrap">
    <div class="w-full sm:w-8/12 mb-10">
      <div class="container mx-auto h-full sm:p-10">
        <nav class="flex px-4 justify-between items-center">
        
          <div class="text-4xl font-bold">
            Bhartiya BioTeach<span class="text-green-700">.</span>
          </div>
          <div>
            <img width={"200px"} src={logo} alt="Logo" />
          </div>
          
          <div>
            <img src="https://image.flaticon.com/icons/svg/497/497348.svg" alt="" class="w-8"/>
          </div>
        </nav>
        <header class="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
          <div class="w-full">
            <h1 class="text-4xl lg:text-6xl font-bold">Growing your <span class="text-green-700">greeny</span> stuff for your room</h1>
            <div class="w-20 h-2 bg-green-700 my-4"></div>
            <p class="text-xl mb-10 tracking-tighter">At Bhartiya Biotech, we understand the vital role you play in feeding the nation. Our mission is to support you with the best agricultural products to ensure healthy crops and bountiful harvests. We are committed to providing innovative solutions and quality products that enhance your farming practices and productivity..</p>
            <Link to="/"> <button class="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">Explore</button>  </Link>
          </div>
        </header>
      </div>
    </div>
          <img src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Leafs" class="w-full h-48 object-cover sm:h-screen sm:w-4/12"/>
  </div>
  )
}

export default HeroSection;
