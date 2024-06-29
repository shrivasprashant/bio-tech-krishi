import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 p-4">
  <section className="text-center my-8" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523124796445-9d5e12909d2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '5px', height: '240px', width: '100%' }}>
    <div className=" items-center justify-center p-4">
      <h1 className="text-4xl text-white  font-extrabold mb-4">About Us</h1>
      <p className="text-white font-semibold text-2xl max-w-2xl mx-auto">
      Empowering Agriculture, Enriching Lives: Bhartiya Bio-Tech, Your Partner in Progress.
      </p>
    </div>
  </section>

      <section className="my-8">
        <h2 className="text-3xl text-center font-bold text-green-600 mb-4">Our Mission</h2>
        <p className="text-gray-700 font-semibold text-lg border-gray-300 mb-8 px-12 text-center">
        At Bhartiya Bio-Tech, our mission is to revolutionize agriculture through innovation and sustainability. We are committed to empowering farmers with cutting-edge biotechnological products and solutions that enhance crop yield, protect against pests, and promote eco-friendly practices. Our e-commerce platform bridges the gap between advanced agricultural products and the farmers who need them, ensuring accessibility and affordability. By fostering a community of knowledgeable and resourceful agriculturalists, we aim to contribute to global food security and environmental stewardship, driving progress and prosperity in the agricultural sector.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 bg-slate-100">
  <div className="rounded-lg flex items-center justify-center">
    <img 
      src="https://images.unsplash.com/photo-1620200423727-8127f75d7f53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFncmljdWx0dXJlfGVufDB8fDB8fHww" 
      alt="Agricultural field with green crops" 
      className="w-full h-auto md:h-full object-cover rounded-lg" 
      style={{ borderRadius: '10px' }}
    />
  </div>
  <div className="rounded-lg flex items-center justify-center">
    <img 
      src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="Close-up of a farmer's hands holding soil" 
      className="w-full h-auto md:h-full object-cover rounded-lg" 
      style={{ borderRadius: '10px' }}
    />
  </div>
  <div className="rounded-lg flex items-center justify-center">
    <img 
      src="https://images.unsplash.com/photo-1611843467160-25afb8df1074?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxhbnRpbmd8ZW58MHx8MHx8fDA%3D" 
      alt="Close-up of a farmer's hands holding soil" 
      className="w-full h-auto md:h-full object-cover rounded-lg" 
      style={{ borderRadius: '10px' }}
    />
  </div>
  <div className="rounded-lg flex items-center justify-center">
    <img 
      src="https://plus.unsplash.com/premium_photo-1661832711622-e70ea4ec8301?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFRyYWN0b3IlMjBwbG93aW5nJTIwYSUyMGZpZWxkJTIwdW5kZXIlMjBhJTIwYmx1ZSUyMHNreXxlbnwwfHwwfHx8MA%3D%3D" 
      alt="Tractor plowing a field under a blue sky" 
      className="w-full h-auto md:h-full object-cover rounded-lg" 
      style={{ borderRadius: '10px' }}
    />
  </div>
</div>


      </section>
     
     <section>
     <div class="bg-gray-50 grid lg:grid-cols-2 gap-6 px-6 py-12 font-[sans-serif]">
          <div class="space-y-6">
              <div class="bg-white shadow-md rounded-lg transition-all" role="accordion">
                  <button type="button" class="w-full text-sm font-semibold text-left p-6 text-blue-600
         flex items-center hover:text-blue-600 transition-all">
                      <span class="mr-4">Are there any special discounts or promotions available during the event.</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-[14px] fill-current ml-auto shrink-0" viewBox="0 0 124 124">
                          <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000" />
                      </svg>
                  </button>
                  <div class="pb-6 px-6">
                      <p class="text-sm text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu,
                          at fermentum dui. Maecenas
                          vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae
                          consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam
                          auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et
                          tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.
                      </p>
                  </div>
              </div>

              <div class="bg-white shadow-md rounded-lg transition-all" role="accordion">
                  <button type="button" class="w-full text-sm font-semibold text-left p-6 text-gray-800 flex items-center hover:text-blue-600 transition-all">
                      <span class="mr-4">What are the dates and locations for the product launch events?</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-[14px] fill-current ml-auto shrink-0" viewBox="0 0 42 42">
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
                      </svg>
                  </button>
                  <div class="hidden pb-6 px-6">
                      <p class="text-sm text-gray-600 leading-relaxed">Content</p>
                  </div>
              </div>
          </div>

          <div class="space-y-4">
              <div class="bg-white shadow-md rounded-lg transition-all" role="accordion">
                  <button type="button" class="w-full text-sm font-semibold text-left p-6 text-gray-800 flex items-center hover:text-blue-600 transition-all">
                      <span class="mr-4">Can I bring a guest with me to the product launch event?</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-[14px] fill-current ml-auto shrink-0" viewBox="0 0 42 42">
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
                      </svg>
                  </button>
                  <div class="hidden pb-6 px-6">
                      <p class="text-sm text-gray-600 leading-relaxed">Content</p>
                  </div>
              </div>

              <div class="bg-white shadow-md rounded-lg transition-all" role="accordion">
                  <button type="button" class="w-full text-sm font-semibold text-left p-6 text-gray-800 flex items-center hover:text-blue-600 transition-all">
                      <span class="mr-4">Are there any special discounts or promotions available during the event.</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-[14px] fill-current ml-auto shrink-0" viewBox="0 0 42 42">
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
                      </svg>
                  </button>
                  <div class="hidden pb-6 px-6">
                      <p class="text-sm text-gray-600 leading-relaxed">Content</p>
                  </div>
              </div>
          </div>
      </div>
     </section>
    
    </div>
  );
};

export default AboutUs;
