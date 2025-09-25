'use client'

import { useState, useEffect } from 'react'
import { supabase, type RSVP } from '@/lib/supabaseClient'
import { supabaseConfig } from '@/lib/config'
import Image from 'next/image'

export default function BirthdayInvitation() {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [bringing, setBringing] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  // Test connection and fetch RSVPs on component mount
  useEffect(() => {
    testConnection()
    fetchRsvps()
  }, [])

  const testConnection = async () => {
    console.log('🧪 Testing Supabase connection...')
    try {
      const { error } = await supabase.from('rsvps').select('count', { count: 'exact', head: true })
      if (error) {
        console.error('❌ Connection test failed:', error)
        if (error.message.includes('relation "rsvps" does not exist')) {
          console.error('🚨 TABLE MISSING: You need to create the "rsvps" table in Supabase!')
        }
      } else {
        console.log('✅ Connection test successful! Table exists.')
      }
    } catch (err) {
      console.error('💥 Connection test error:', err)
    }
  }

  const fetchRsvps = async () => {
    console.log('🔍 Starting to fetch RSVPs...')
    console.log('🔗 Supabase URL:', supabaseConfig.url)
    console.log('🔑 Supabase Key (first 20 chars):', supabaseConfig.anonKey.substring(0, 20) + '...')
    
    try {
      console.log('📡 Making request to supabase...')
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('📥 Response received:', { data, error })
      
      if (error) {
        console.error('❌ Supabase error:', error)
        throw error
      }
      
      console.log('✅ Successfully fetched RSVPs:', data)
      setRsvps(data || [])
    } catch (err) {
      console.error('💥 Error fetching RSVPs:', err)
      console.error('💥 Error details:', JSON.stringify(err, null, 2))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!name.trim() || !phone.trim()) {
      setError('Please fill in your name and phone number')
      return
    }

    setIsSubmitting(true)

    try {
      console.log('📝 Submitting RSVP:', { name: name.trim(), phone: phone.trim(), bringing: bringing.trim() })
      
      const { data, error } = await supabase
        .from('rsvps')
        .insert([{ name: name.trim(), phone: phone.trim(), bringing: bringing.trim() }])
        .select()

      console.log('📤 Insert response:', { data, error })

      if (error) {
        console.error('❌ Insert error:', error)
        throw error
      }

      console.log('✅ RSVP submitted successfully!')
      
      // Success - clear form and show success message
      setName('')
      setPhone('')
      setBringing('')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      
      // Refresh the list
      fetchRsvps()
    } catch (err) {
      console.error('💥 Error submitting RSVP:', err)
      console.error('💥 Submit error details:', JSON.stringify(err, null, 2))
      setError('Failed to submit RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-10 relative">
          {/* Fun decorative images */}
          <div className="absolute -top-4 -left-4 w-16 h-16 opacity-80 animate-bounce">
            <Image
              src="/pokemon.png"
              alt="Pokemon decoration"
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 opacity-80 animate-bounce" style={{animationDelay: '0.5s'}}>
            <Image
              src="/overcooked.png"
              alt="Overcooked decoration"
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>
          
          <div className="inline-block p-6 bg-white rounded-2xl shadow-sm border border-slate-200/50 backdrop-blur-sm relative">
            <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">
              You&apos;re Invited 🎉
            </h1>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-4"></div>
            <h2 className="text-xl md:text-2xl font-medium text-slate-800 mb-3">
              James Han&apos;s Birthday Celebration 🎂
            </h2>
            <div className="space-y-1 text-slate-600 text-sm">
              <p>Saturday, September 27th, 2025 📅</p>
              <p>5:00 PM - 9:00 PM ⏰</p>
              <p>57 St Joseph Street 📍</p>
              <p className="text-slate-500 text-xs">Meet in the lobby</p>
              <div className="mt-3 pt-2 border-t border-slate-200">
                <p className="text-slate-500 text-xs italic">
                  Feel free to bring a gift 🎁 (or food if you prefer!)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* RSVP Form */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Confirm Your Attendance</h3>
            
            {showSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg relative overflow-hidden">
                <div className="absolute top-1 right-1 w-8 h-8 opacity-30">
                  <Image
                    src="/pokemon.png"
                    alt="Success decoration"
                    width={32}
                    height={32}
                    className="rounded"
                  />
                </div>
                <p className="text-emerald-800 font-medium text-sm">Thank you for your RSVP! 🎉✨</p>
                <p className="text-emerald-600 text-xs mt-1">See you at the party! 🎮🎂</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              <div>
                <label htmlFor="bringing" className="block text-xs font-medium text-slate-700 mb-1">
                  What are you bringing? (optional)
                </label>
                <input
                  type="text"
                  id="bringing"
                  value={bringing}
                  onChange={(e) => setBringing(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Gift, food, or just your awesome presence! 🎁"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Attendance'}
              </button>
            </form>
          </div>

          {/* Guest List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">
              Who&apos;s Coming ({rsvps.length})
            </h3>
            
            {rsvps.length === 0 ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-sm">Be the first to RSVP!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {rsvps.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200/50 hover:bg-slate-100 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-slate-900 text-sm">{rsvp.name}</h4>
                        <p className="text-slate-500 text-xs">{rsvp.phone}</p>
                        <p className="text-slate-600 text-xs mt-0.5">Bringing: {rsvp.bringing}</p>
                      </div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-slate-500 relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 opacity-60">
              <Image
                src="/pokemon.png"
                alt="Pokemon"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
            <p className="text-sm">Can&apos;t wait to celebrate with you! 🎂✨</p>
            <div className="w-12 h-12 opacity-60">
              <Image
                src="/overcooked.png"
                alt="Overcooked"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
          </div>
          <p className="text-xs text-slate-400">Games, food, and fun await! 🎮🍕</p>
        </div>
      </div>
    </div>
  )
}
