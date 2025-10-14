import React from "react";
import { Link } from "react-router-dom";

function Hero() {
   const services = [
     { name: "Hotel", path: "/hotel", desc: "Book comfortable hotels with ease." },
     { name: "Sightseeing", path: "/sightseeing", desc: "Explore the best attractions." },
     { name: "Restaurant", path: "/restaurant", desc: "Find top-rated restaurants nearby." },
   ];
 
   return (
     <div
       className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
       style={{
         backgroundImage: "url('/assets/download.jpeg')",
       }}
     >
       {/* طبقة تغطية خفيفة جدًا */}
       <div className="absolute inset-0 bg-black/20"></div>
 
       {/* المحتوى */}
       <div className="relative z-10 w-full py-16 px-6">
         <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 drop-shadow-lg">
           Welcome to Our Services
         </h1>
 
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {services.map((service, index) => (
             <Link
               key={index}
               to={service.path}
               className="bg-white/20 backdrop-blur-sm p-6 rounded-xl shadow-md 
                          hover:bg-white/90 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
             >
               <h2 className="text-xl font-bold mb-4 text-white hover:text-gray-900 transition-colors duration-300">
                 {service.name}
               </h2>
               <p className="text-gray-200 hover:text-gray-800 transition-colors duration-300">
                 {service.desc}
               </p>
             </Link>
           ))}
         </div>
       </div>
     </div>
   );
}

export default Hero;