import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Hook for Hotels
export const useHotels = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchHotels = async () => {
    try {
      setLoading(true)
      console.log('🔍 Fetching hotels from Supabase...')
      
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('id', { ascending: false })
      
      console.log('📊 Supabase response:', { data, error })
      
      if (error) {
        console.error('❌ Supabase error:', error)
        throw error
      }
      
      console.log('✅ Hotels fetched successfully:', data)
      setHotels(data || [])
    } catch (err) {
      console.error('🚨 Error in fetchHotels:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addHotel = async (hotel) => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .insert(hotel)
        .select()
      
      if (error) throw error
      setHotels(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const updateHotel = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      setHotels(prev => prev.map(hotel => 
        hotel.id === id ? data[0] : hotel
      ))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const deleteHotel = async (id) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setHotels(prev => prev.filter(hotel => hotel.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return {
    hotels,
    loading,
    error,
    addHotel,
    updateHotel,
    deleteHotel,
    refetch: fetchHotels
  }
}

// Hook for Restaurants
export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('id', { ascending: false })
      
      if (error) throw error
      setRestaurants(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addRestaurant = async (restaurant) => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .insert(restaurant)
        .select()
      
      if (error) throw error
      setRestaurants(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const updateRestaurant = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      setRestaurants(prev => prev.map(restaurant => 
        restaurant.id === id ? data[0] : restaurant
      ))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const deleteRestaurant = async (id) => {
    try {
      const { error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  return {
    restaurants,
    loading,
    error,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    refetch: fetchRestaurants
  }
}

// Hook for Sightseeing
export const useSightseeing = () => {
  const [sightseeing, setSightseeing] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchSightseeing = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sightseeing')
        .select('*')
        .order('id', { ascending: false })
      
      if (error) throw error
      setSightseeing(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addSightseeing = async (attraction) => {
    try {
      const { data, error } = await supabase
        .from('sightseeing')
        .insert(attraction)
        .select()
      
      if (error) throw error
      setSightseeing(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const updateSightseeing = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('sightseeing')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      setSightseeing(prev => prev.map(attraction => 
        attraction.id === id ? data[0] : attraction
      ))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const deleteSightseeing = async (id) => {
    try {
      const { error } = await supabase
        .from('sightseeing')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setSightseeing(prev => prev.filter(attraction => attraction.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchSightseeing()
  }, [])

  return {
    sightseeing,
    loading,
    error,
    addSightseeing,
    updateSightseeing,
    deleteSightseeing,
    refetch: fetchSightseeing
  }
}

// Hook for Messages/Contact
export const useMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('id', { ascending: false })
      
      if (error) throw error
      setMessages(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  const addMessage = async (message) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
      
      if (error) throw error
      setMessages(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const updateMessage = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      setMessages(prev => prev.map(message => 
        message.id === id ? data[0] : message
      ))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const deleteMessage = async (id) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setMessages(prev => prev.filter(message => message.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])
  return {
    messages,
    loading,
    error,
    addMessage,
    updateMessage,
    deleteMessage,
    refetch: fetchMessages
  }
}
