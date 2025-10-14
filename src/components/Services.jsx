import React from "react";

function Services() {
  const services = [
    {
      icon: "🗺️",
      title: "City Tours",
      description: "Comprehensive guided tours of Cairo's most iconic landmarks including the Pyramids, Sphinx, and Egyptian Museum",
      price: "From $50",
      features: ["Professional Guide", "Transportation", "Entry Tickets"]
    },
    {
      icon: "👥",
      title: "Cultural Experiences",
      description: "Immerse yourself in authentic Egyptian culture and traditions with local families and artisans",
      price: "From $75",
      features: ["Local Family Visit", "Traditional Meal", "Handicraft Workshop"]
    },
    {
      icon: "🚗",
      title: "Private Transportation",
      description: "Comfortable and safe transportation throughout the city with experienced local drivers",
      price: "From $30",
      features: ["Air Conditioning", "WiFi", "Flexible Schedule"]
    }
  ];

  const additionalServices = [
    { icon: "🏨", title: "Hotel Booking", desc: "Best rates for top hotels" },
    { icon: "🍽️", title: "Restaurant Reservations", desc: "Authentic dining experiences" },
    { icon: "📸", title: "Photography Tours", desc: "Capture perfect moments" },
    { icon: "🛍️", title: "Shopping Tours", desc: "Best local markets and bazaars" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of services designed to make your Cairo experience unforgettable
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-6 text-center">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-center">{service.description}</p>
              
              {/* Features */}
              <div className="mb-6">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-500">{service.price}</span>
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Additional Services</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today to customize your perfect Cairo experience
            </p>
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
              Get Custom Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;