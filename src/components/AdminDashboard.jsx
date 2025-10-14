import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useHotels, useRestaurants, useSightseeing, useMessages } from "../hooks/useData";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("hotels");
    // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "edit"
  const [modalEntity, setModalEntity] = useState(""); // "hotel", "restaurant", "sightseeing"
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
    // Use Supabase data hooks
  const { hotels, loading: hotelsLoading, addHotel, updateHotel, deleteHotel } = useHotels();
  const { restaurants, loading: restaurantsLoading, addRestaurant, updateRestaurant, deleteRestaurant } = useRestaurants();
  const { sightseeing, loading: sightseeingLoading, addSightseeing, updateSightseeing, deleteSightseeing } = useSightseeing();
  const { messages, loading: messagesLoading, updateMessage, deleteMessage } = useMessages();

  // Check authentication
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // Handle delete operations
  const handleDeleteHotel = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      await deleteHotel(id);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      await deleteRestaurant(id);
    }
  };

  const handleDeleteSightseeing = async (id) => {
    if (window.confirm("Are you sure you want to delete this attraction?")) {
      await deleteSightseeing(id);
    }
  };  const handleDeleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      await deleteMessage(id);
    }
  };
  const handleMarkAsRead = async (id, isRead) => {
    try {
      await updateMessage(id, { 
        is_read: isRead,
        read_at: isRead ? new Date().toISOString() : null
      });
    } catch (error) {
      console.error("Error updating message:", error);
      alert("Failed to update message status.");
    }
  };

  // Modal handlers
  const openModal = (type, entity, item = null) => {
    setModalType(type);
    setModalEntity(entity);
    setEditingItem(item);
    
    // Initialize form data based on entity type
    if (type === "add") {
      if (entity === "hotel") {
        setFormData({
          name: "",
          location: "",
          price: "",
          rating: "",
          description: "",
          image_url: "",
          map_url: "",
          amenities: ""
        });
      } else if (entity === "restaurant") {
        setFormData({
          name: "",
          location: "",
          cuisine: "",
          price: "",
          rating: "",
          description: "",
          image_url: "",
          map_url: ""
        });
      } else if (entity === "sightseeing") {
        setFormData({
          name: "",
          location: "",
          type: "",
          ticket_price: "",
          rating: "",
          description: "",
          image_url: "",
          map_url: ""
        });
      }
    } else if (type === "edit" && item) {
      setFormData(item);
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setModalEntity("");
    setEditingItem(null);
    setFormData({});
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalType === "add") {
        if (modalEntity === "hotel") {
          await addHotel(formData);
        } else if (modalEntity === "restaurant") {
          await addRestaurant(formData);
        } else if (modalEntity === "sightseeing") {
          await addSightseeing(formData);
        }
      } else if (modalType === "edit") {
        if (modalEntity === "hotel") {
          await updateHotel(editingItem.id, formData);
        } else if (modalEntity === "restaurant") {
          await updateRestaurant(editingItem.id, formData);
        } else if (modalEntity === "sightseeing") {
          await updateSightseeing(editingItem.id, formData);
        }
      }
      
      closeModal();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value    }));
  };

  // Filter functions for search
  const filteredHotels = hotels.filter(hotel => 
    hotel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSightseeing = sightseeing.filter(site => 
    site.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(message => 
    message.sender_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Header with Logout */}
      <div className="bg-white shadow-md mb-6">
        <div className="container mx-auto px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🛠 Admin Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome back, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-8 pb-8">
        {/* Tabs */}
        <div className="flex border-b mb-6 bg-white rounded-t-xl">
          <button
            onClick={() => setActiveTab("hotels")}
            className={`px-6 py-3 ${
              activeTab === "hotels" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-600"
            }`}
          >
            🏨 Hotels
          </button>
          <button
            onClick={() => setActiveTab("restaurants")}
            className={`px-6 py-3 ${
              activeTab === "restaurants" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-600"
            }`}
          >
            🍽 Restaurants
          </button>
          <button
            onClick={() => setActiveTab("sightseeing")}
            className={`px-6 py-3 ${
              activeTab === "sightseeing" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-600"
            }`}
          >
            🏛 Sightseeing
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-3 ${
              activeTab === "messages" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-600"
            }`}
          >            💬 Messages
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-600">
              Searching for: <span className="font-semibold text-indigo-600">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {/* Hotels Management */}
        {activeTab === "hotels" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Hotels Management</h2>              <button 
                onClick={() => openModal("add", "hotel")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                + Add New Hotel
              </button>
            </div>

            {hotelsLoading ? <LoadingSpinner /> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Location</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-left">Rating</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>                  <tbody>
                    {filteredHotels.map((h) => (
                      <tr key={h.id} className="hover:bg-gray-50 border-b">
                        <td className="px-6 py-4">{h.name}</td>
                        <td className="px-6 py-4">{h.location}</td>
                        <td className="px-6 py-4">${h.price}</td>
                        <td className="px-6 py-4">{h.rating}</td>                        <td className="px-6 py-4">
                          <button 
                            onClick={() => openModal("edit", "hotel", h)}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteHotel(h.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>                </table>
                {filteredHotels.length === 0 && !searchQuery && (
                  <div className="text-center py-8 text-gray-500">
                    No hotels found. Add your first hotel!
                  </div>
                )}
                {filteredHotels.length === 0 && searchQuery && (
                  <div className="text-center py-8 text-gray-500">
                    No hotels found matching "{searchQuery}". Try a different search term.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Restaurants Management */}
        {activeTab === "restaurants" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Restaurants Management</h2>              <button 
                onClick={() => openModal("add", "restaurant")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                + Add New Restaurant
              </button>
            </div>

            {restaurantsLoading ? <LoadingSpinner /> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Location</th>
                      <th className="px-6 py-3 text-left">Cuisine</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>                  <tbody>
                    {filteredRestaurants.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 border-b">
                        <td className="px-6 py-4">{r.name}</td>
                        <td className="px-6 py-4">{r.location}</td>
                        <td className="px-6 py-4">{r.cuisine}</td>
                        <td className="px-6 py-4">${r.price}</td>                        <td className="px-6 py-4">
                          <button 
                            onClick={() => openModal("edit", "restaurant", r)}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteRestaurant(r.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>                </table>
                {filteredRestaurants.length === 0 && !searchQuery && (
                  <div className="text-center py-8 text-gray-500">
                    No restaurants found. Add your first restaurant!
                  </div>
                )}
                {filteredRestaurants.length === 0 && searchQuery && (
                  <div className="text-center py-8 text-gray-500">
                    No restaurants found matching "{searchQuery}". Try a different search term.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Sightseeing Management */}
        {activeTab === "sightseeing" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Sightseeing Management</h2>              <button 
                onClick={() => openModal("add", "sightseeing")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                + Add New Site
              </button>
            </div>

            {sightseeingLoading ? <LoadingSpinner /> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Location</th>
                      <th className="px-6 py-3 text-left">Type</th>
                      <th className="px-6 py-3 text-left">Ticket Price</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>                  <tbody>
                    {filteredSightseeing.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 border-b">
                        <td className="px-6 py-4">{s.name}</td>
                        <td className="px-6 py-4">{s.location}</td>
                        <td className="px-6 py-4">{s.type}</td>
                        <td className="px-6 py-4">${s.ticket_price || s.price}</td>                        <td className="px-6 py-4">
                          <button 
                            onClick={() => openModal("edit", "sightseeing", s)}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteSightseeing(s.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>                </table>
                {filteredSightseeing.length === 0 && !searchQuery && (
                  <div className="text-center py-8 text-gray-500">
                    No attractions found. Add your first attraction!
                  </div>
                )}
                {filteredSightseeing.length === 0 && searchQuery && (
                  <div className="text-center py-8 text-gray-500">
                    No attractions found matching "{searchQuery}". Try a different search term.
                  </div>
                )}
              </div>
            )}
          </div>
        )}        {/* Messages */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
              <div className="text-sm text-gray-600">
                Total: {filteredMessages.length} messages
              </div>
            </div>
            
            {messagesLoading ? <LoadingSpinner /> : (
              <div>
                {filteredMessages.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMessages.map((m) => (
                      <div key={m.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        {/* Message Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg text-gray-900">
                                {m.sender_name || 'Unknown Sender'}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                m.is_read ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600'
                              }`}>
                                {m.is_read ? 'Read' : 'New'}
                              </span>
                              {m.is_important && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                                  Important
                                </span>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <span>📧</span>
                                <span>{m.sender_email}</span>
                              </div>
                              {m.sender_phone && (
                                <div className="flex items-center gap-1">
                                  <span>📞</span>
                                  <span>{m.sender_phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <span>📅</span>
                                <span>{new Date(m.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleMarkAsRead(m.id, !m.is_read)}
                              className={`px-3 py-1 rounded text-sm transition ${
                                m.is_read 
                                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }`}
                            >
                              {m.is_read ? 'Mark Unread' : 'Mark Read'}
                            </button>
                            <button 
                              onClick={() => handleDeleteMessage(m.id)}
                              className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Subject */}
                        {m.subject && m.subject !== 'Contact Form Submission' && (
                          <div className="mb-3">
                            <span className="font-medium text-gray-700">Subject: </span>
                            <span className="text-gray-600">{m.subject}</span>
                          </div>
                        )}

                        {/* Message Content */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2">Message:</h4>
                          <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                            {m.content || m.message || 'No message content'}
                          </p>
                        </div>

                        {/* Status and Source */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>Status: <span className="font-medium">{m.status || 'new'}</span></span>
                            <span>Source: <span className="font-medium">{m.source || 'contact_form'}</span></span>
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {m.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📬</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {searchQuery ? 'No messages found' : 'No messages yet'}
                    </h3>
                    <p className="text-gray-600">
                      {searchQuery 
                        ? `No messages found matching "${searchQuery}". Try a different search term.`
                        : 'Contact messages will appear here when visitors use the contact form.'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-90vh overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {modalType === "add" ? "Add New" : "Edit"} {modalEntity.charAt(0).toUpperCase() + modalEntity.slice(1)}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Common fields for all entities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Entity-specific fields */}
              {modalEntity === "hotel" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <input
                      type="text"
                      name="amenities"
                      value={formData.amenities || ""}
                      onChange={handleInputChange}
                      placeholder="WiFi, Pool, Spa..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {modalEntity === "restaurant" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type *</label>
                    <input
                      type="text"
                      name="cuisine"
                      value={formData.cuisine || ""}
                      onChange={handleInputChange}
                      required
                      placeholder="Egyptian, Italian, Mediterranean..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Average Price *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {modalEntity === "sightseeing" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                    <select
                      name="type"
                      value={formData.type || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      <option value="Historical">Historical</option>
                      <option value="Religious">Religious</option>
                      <option value="Natural">Natural</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Price</label>
                    <input
                      type="number"
                      name="ticket_price"
                      value={formData.ticket_price || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5) *</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating || ""}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  step="0.1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url || ""}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Map URL</label>
                <input
                  type="url"
                  name="map_url"
                  value={formData.map_url || ""}
                  onChange={handleInputChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  {modalType === "add" ? "Add" : "Update"} {modalEntity.charAt(0).toUpperCase() + modalEntity.slice(1)}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
