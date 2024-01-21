"use client"
// app/page.js

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    let user_data = localStorage.getItem('user_data');

    try {
      user_data = JSON.parse(user_data);

      if (!user_data || !user_data.name) {
        setButtonPopup(true);
      }
    } catch (error) {
      console.error('Error parsing user_data from localStorage', error);
      setButtonPopup(true);
    }
  }, []);

  const handleClick = () => {
    setButtonPopup(false);

    const userId = uuidv4();

    const userData = {
      name: name,
      id: userId,
    };

    const userDataString = JSON.stringify(userData);

    localStorage.setItem('user_data', userDataString);
    window.location.reload();
  };

  return (
    <div>
      <div className='flex items-center justify-center h-screen gap-4'>
        {/* Redirige vers la page d'hébergement */}
        <Link href='/host'>
          <button className='bg-blue-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72'>
            HEBERGER
          </button>
        </Link>
        {/* Redirige vers la page de multijoueur */}
        <Link href='/join'>
          <button className='bg-red-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72'>
            REJOINDRE
          </button>
        </Link>
      </div>
      {buttonPopup && (
        <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-amber-200 relative p-8 w-80 h-30vh flex flex-col justify-center items-center text-center rounded-lg border-4 border-white shadow-2xl'>
            <p>Rentrez votre nom :</p>
            <input
              type='text'
              className='mt-4 p-2 border rounded-md w-full'
              placeholder='Saisissez votre texte ici...'
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleClick} className='mt-4 bg-blue-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72'>
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
