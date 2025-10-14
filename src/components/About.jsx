import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">About Transit</h1>
            <p className="text-xl text-gray-600">
              Your trusted partner for exploring the wonders of Cairo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded with a passion for sharing Cairo's incredible heritage, Transit has been 
                connecting travelers with authentic Egyptian experiences for over a decade.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe every journey should be transformative, combining comfort, 
                authenticity, and unforgettable memories.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To showcase the timeless beauty of Egypt while providing world-class service 
                  that exceeds expectations and creates lifelong memories.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    10+
                  </div>
                  <span className="text-gray-700">Years of Experience</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    1K+
                  </div>
                  <span className="text-gray-700">Happy Customers</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    50+
                  </div>
                  <span className="text-gray-700">Tours Available</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                    24/7
                  </div>
                  <span className="text-gray-700">Customer Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Rawan", role: "Tour Guide", emoji: "👩‍🎨" },
                { name: "Noraldeen Motez", role: "CEO", emoji: "👨‍🏫" },
                { name: "Husam Elfatih", role: "Founder", emoji: "👨‍💼" }
              ].map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">{member.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;