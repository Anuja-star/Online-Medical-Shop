// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// // Background images
// import bg1 from "./assets/Medical1.jpg";
// import bg2 from "./assets/Medical4.jpg";
// import bg3 from "./assets/Medical3.jpg";

// const backgrounds = [bg1, bg2, bg3];

// function LandingPage() {
//   const [index, setIndex] = useState(0);
//   const [activeFAQ, setActiveFAQ] = useState(null);

//   // Auto slide every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % backgrounds.length);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const faqs = [
//     {
//       q: "How to order medicines online from MediShop?",
//       a: "Search medicines, add them to cart, proceed to checkout and place your order. Once confirmed, we prepare your order for safe home delivery.",
//     },
//     {
//       q: "Is online medicine delivery safe?",
//       a: "Yes. All medicines are sourced from licensed pharmacies and checked thoroughly for quality and authenticity.",
//     },
//     {
//       q: "How will I know if my order is delayed?",
//       a: "If there is a delay, our team will notify you via SMS, call, or email. You can also track your order online.",
//     },
//     {
//       q: "Do you provide express delivery?",
//       a: "Express delivery is available in select cities depending on medicine availability and location.",
//     },
//   ];

//   return (
//     <div className="text-white overflow-hidden">
//       <Navbar />

//       {/* ================= HERO SECTION ================= */}
//       <section className="relative min-h-screen flex items-center justify-center">
//         {/* Background Slider */}
//         <div
//           className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
//           style={{ backgroundImage: `url(${backgrounds[index]})` }}
//         />

//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black bg-opacity-60" />

//         {/* Content */}
//         <div className="relative z-10 text-center px-6 max-w-4xl animate-fadeIn">
//           <h1 className="text-4xl md:text-6xl font-bold">
//             Your Trusted Online Pharmacy
//           </h1>

//           <p className="text-2xl md:text-3xl font-semibold text-indigo-400 mt-3">
//             💊 MediShop
//           </p>

//           <p className="mt-6 text-lg text-gray-200">
//             Order genuine medicines at affordable prices and get them delivered
//             safely to your doorstep.
//           </p>

//           <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
//             <Link
//               to="/shop"
//               className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105"
//             >
//               Browse Medicines
//             </Link>

//             <Link
//               to="/login"
//               className="bg-white text-indigo-700 px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105"
//             >
//               Login / Register
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section className="py-20 bg-slate-100 text-gray-800">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
//           <div className="p-4 bg-white rounded-xl shadow">✔ 100% Genuine Medicines</div>
//           <div className="p-4 bg-white rounded-xl shadow">✔ Licensed Pharmacy</div>
//           <div className="p-4 bg-white rounded-xl shadow">✔ Secure Payments</div>
//           <div className="p-4 bg-white rounded-xl shadow">✔ Fast Home Delivery</div>
//         </div>
//       </section>

//       {/* ================= WHY CHOOSE US ================= */}
//       <section className="py-20 bg-white text-gray-800">
//         <div className="max-w-5xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-6">Why Choose MediShop?</h2>
//           <p className="text-gray-600">
//             We partner with licensed pharmacies to ensure safe, fast and
//             affordable medicine delivery across India.
//           </p>
//         </div>
//       </section>

//       {/* ================= FAQ SECTION (ADDED) ================= */}
//       <section className="py-20 bg-slate-100 text-gray-800">
//         <div className="max-w-4xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-10">
//             Frequently Asked Questions
//           </h2>

//           {faqs.map((faq, i) => (
//             <div key={i} className="border-b py-4">
//               <button
//                 className="w-full flex justify-between items-center font-medium text-lg text-left"
//                 onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
//               >
//                 {faq.q}
//                 <span>{activeFAQ === i ? "−" : "+"}</span>
//               </button>

//               {activeFAQ === i && (
//                 <p className="mt-3 text-gray-600">{faq.a}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= TESTIMONIALS ================= */}
//       <section className="py-20 bg-white text-gray-800">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
//               ⭐⭐⭐⭐⭐
//               <p className="mt-4">
//                 Fast delivery and genuine medicines. Very reliable!
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
//               ⭐⭐⭐⭐⭐
//               <p className="mt-4">
//                 Easy to use and affordable prices. Highly recommended.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
//               ⭐⭐⭐⭐⭐
//               <p className="mt-4">
//                 Customer support is excellent. Loved the service.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default LandingPage;







import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Background images
import bg1 from "./assets/Medical1.jpg";
import bg2 from "./assets/Medical4.jpg";
import bg3 from "./assets/Medical3.jpg";

const backgrounds = [bg1, bg2, bg3];

function LandingPage() {
  const [index, setIndex] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto slide every 3 seconds (changed from 1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, 3000); // 3 seconds is better for hero section
    return () => clearInterval(interval);
  }, []);

  // Simulate loading for images
  useEffect(() => {
    const imagePromises = backgrounds.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, []);

  const faqs = [
    {
      q: "How to order medicines online from MediShop?",
      a: "Search medicines, add them to cart, proceed to checkout and place your order. Once confirmed, we prepare your order for safe home delivery.",
    },
    {
      q: "Is online medicine delivery safe?",
      a: "Yes. All medicines are sourced from licensed pharmacies and checked thoroughly for quality and authenticity.",
    },
    {
      q: "How will I know if my order is delayed?",
      a: "If there is a delay, our team will notify you via SMS, call, or email. You can also track your order online.",
    },
    {
      q: "Do you provide express delivery?",
      a: "Express delivery is available in select cities depending on medicine availability and location.",
    },
  ];

  const features = [
    {
      icon: "💊",
      title: "100% Genuine Medicines",
      desc: "Authentic medicines from licensed pharmacies"
    },
    {
      icon: "🏥",
      title: "Licensed Pharmacy",
      desc: "Certified and verified pharmacy partners"
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      desc: "Safe and encrypted payment methods"
    },
    {
      icon: "🚚",
      title: "Fast Home Delivery",
      desc: "Quick doorstep delivery service"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      rating: "⭐⭐⭐⭐⭐",
      text: "Fast delivery and genuine medicines. Very reliable service!",
      location: "Mumbai"
    },
    {
      name: "Priya Sharma",
      rating: "⭐⭐⭐⭐⭐",
      text: "Easy to use and affordable prices. Highly recommended for regular medicines.",
      location: "Delhi"
    },
    {
      name: "Amit Patel",
      rating: "⭐⭐⭐⭐⭐",
      text: "Customer support is excellent. Loved the prescription upload feature!",
      location: "Bangalore"
    }
  ];

  return (
    <div className="text-white overflow-hidden">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg">Loading MediShop...</p>
            </div>
          </div>
        )}

        {/* Background Slider */}
        <div className="absolute inset-0">
          {backgrounds.map((bg, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ 
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>

        {/* Dark Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Your Trusted <span className="text-indigo-300">Online Pharmacy</span>
          </h1>

          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-indigo-300 mt-4 mb-2">
            💊 MediShop
          </p>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Order genuine medicines at affordable prices with safe doorstep delivery.
            Your health, our priority.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/shop"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl shadow-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/50"
            >
              🛍️ Browse Medicines
            </Link>

            <Link
              to="/login"
              className="bg-white text-indigo-700 px-8 py-4 rounded-xl shadow-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-white/50"
            >
              🔐 Login / Register
            </Link>
          </div>

          {/* Slider indicators */}
          <div className="flex justify-center mt-12 space-x-2">
            {backgrounds.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? "bg-indigo-400 w-8" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose <span className="text-indigo-600">MediShop?</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            How It <span className="text-indigo-600">Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center ">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">1️⃣</div>
              <h3 className="text-xl font-bold mb-3">Browse Medicines</h3>
              <p className="text-gray-600">Search and select medicines you need</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">2️⃣</div>
              <h3 className="text-xl font-bold mb-3">Upload Prescription</h3>
              <p className="text-gray-600">Upload your prescription for verification</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">3️⃣</div>
              <h3 className="text-xl font-bold mb-3">Get Delivery</h3>
              <p className="text-gray-600">Receive medicines at your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <span className={`text-2xl font-light text-indigo-600 transition-transform duration-300 ${
                    activeFAQ === i ? "rotate-180" : ""
                  }`}>
                    ▼
                  </span>
                </button>

                <div className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeFAQ === i ? "max-h-48 pb-5" : "max-h-0"
                }`}>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            What Our <span className="text-indigo-600">Customers</span> Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-2xl text-yellow-500 mb-4">{testimonial.rating}</div>
                <p className="text-gray-700 text-lg italic mb-6">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">50+</div>
              <div className="text-gray-600">Cities Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">98%</div>
              <div className="text-gray-600">Positive Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust MediShop for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Shopping Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;