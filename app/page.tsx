'use client';

import supabase from '@/lib/supabase';
import Link from 'next/link';
import { useState } from 'react';

const Home = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }
  
    try {
      const { data } = await supabase.from('subscribers').select('email').eq('email', email);
  
      if (data.length > 0) {
        setMessage('You are already with us ! Les goo 🚀');
        return;
      }
  
      const { error } = await supabase.from('subscribers').insert({ email });
  
      if (error) {
        setMessage('Error saving email. Please try again.');
        console.error('Supabase Error:', error);
      } else {
        setMessage('You will be the first to know when we launch ! 🚀');
        setEmail('');
      }
    } catch (err) {
      console.error('Error submitting email:', err);
      setMessage('An unexpected error occurred.');
    }
  };
  

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url(/aa.avif)' }}
    >
      <div className="absolute top-4 right-4">
  <Link href="/features" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition shadow-md" >
      Why Stash Stash tho?
  </Link>
</div>

      <div className="bg-white bg-opacity-75 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-semibold text-center text-indigo-900 mb-6 tracking-wide">
          Stash Stash
        </h1>
        <h1 className="text-2xl font-semibold text-center text-indigo-900 mb-6 tracking-wide">
          Better Ideas, Every Day
        </h1>
        <p className="text-center text-indigo-700 mb-8">Join now to not miss out !</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-3 border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Update me 😃
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default Home;
