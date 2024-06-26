import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-6 ">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Navigate Part started */}

          <div>
            <h2 className="text-xl font-bold mb-4">Navigate</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Fertilizers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pesticides
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Fungicides &amp; Weedicides
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Herbicides
                </a>
              </li>
              <li>
                <a href="/product" className="hover:underline">
                  Other Products
                </a>
              </li>
            </ul>
          </div>
          {/* Navigate Part ended */}

          {/* Quick Links Part started */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="product" className="hover:underline">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Return and Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          {/* Quick Links Part ended */}

          {/* Contact Part started */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <div className="space-y-2">
              <p>
                <a href="#" className="hover:underline">
                  Jambadi,multai Betul Madhya Pradesh
                </a>
              </p>
              <p>
                For Any Problem <a href="tel:+91 9201016798" className="hover:underline">+91 9201016798</a>
              </p>
              <p>
                For sales: <a href="tel:+91 9201016798" className="hover:underline">+91 9201016798</a>
              </p>
              <p>
                <a href="biotechbhartiya@gmail.com" className="hover:underline"> biotechbhartiya@gmail.com </a>
              </p>
            </div>
          </div>
          {/* Contact Part ended */}

          {/* About us Started */}

          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p>We are your one stop solution for all your farming and gardening needs with 100+ products made to work and give the best results. We deliver products to all major pin codes in India with totally Free delivery. Our Expert Agri Advisors are always there to give you the best solutions.</p>
            <ul className="flex space-x-4 mt-4">
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  <svg aria-hidden="true" focusable="false" className="w-6 h-6" viewBox="0 0 18 18">
                    <path fill="currentColor" d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-pink-700">
                  <svg aria-hidden="true" focusable="false" className="w-6 h-6" viewBox="0 0 18 18">
                    <path fill="currentColor" d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"></path>
                    <path fill="currentColor" d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"></path>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-red-600">
                  <svg aria-hidden="true" focusable="false" className="w-6 h-6" viewBox="0 0 100 70">
                    <path fill="currentColor" d="M98 11c2 7.7 2 24 2 24s0 16.3-2 24a12.5 12.5 0 01-9 9c-7.7 2-39 2-39 2s-31.3 0-39-2a12.5 12.5 0 01-9-9c-2-7.7-2-24-2-24s0-16.3 2-24c1.2-4.4 4.6-7.8 9-9 7.7-2 39-2 39-2s31.3 0 39 2c4.4 1.2 7.8 4.6 9 9zM40 50l26-15-26-15v30z"></path>
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
              </li>
            </ul>
          </div>
          {/* About Part End */}

        </div>
        <div className="mt-10 text-center">
          <div className="text-sm">
            <small>© 2024, <a href="#" className="hover:underline">Bio Tech</a></small>
            <small><a href="#" target="_blank" rel="nofollow" className="hover:underline ml-2">Powered by .........</a></small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;