// src/app/Token.jsx
import React, { useState } from 'react';

const clientId = '74c6588f615543fc9b91c3cfdf61d043';
const clientSecret = '2f14e6d794ac47e6b50391a48be287b5';

function Token() {
 const [accessToken, setAccessToken] = useState('');
 const [searchTerm, setSearchTerm] = useState('');
 const [tracks, setTracks] = useState([]);

 const getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
   },
   body: 'grant_type=client_credentials',
  });

  const data = await result.json();
  setAccessToken(data.access_token);
 };

 const searchTracks = async () => {
  if (!accessToken) {
   alert('Please get token first');
   return;
  }

  const res = await fetch(
   `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    searchTerm
   )}&type=track&limit=5`,
   {
    headers: {
     Authorization: 'Bearer ' + accessToken,
    },
   }
  );

  const data = await res.json();
  setTracks(data.tracks.items);
 };

 return (
  <div style={{ padding: 20, marginTop: 210 }}>
   <button onClick={getToken}>Get Spotify Token</button>

   <div style={{ marginTop: 20 }}>
    <input
     type="text"
     placeholder="Search song or artist"
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
     style={{ padding: 8, width: 300, marginRight: 10 }}
    />
    <button onClick={searchTracks}>Search</button>
   </div>

   <div>
    {tracks.map((track) => (
     <div key={track.id} style={{ marginTop: 20 }}>
      <img src={track.album.images[1]?.url} alt={track.name} width="100" />
      <h3>{track.name}</h3>
      <p>{track.artists.map((a) => a.name).join(', ')}</p>

      {track.preview_url ? (
       <audio controls src={track.preview_url}></audio>
      ) : (
       <p style={{ fontStyle: 'italic', color: 'gray' }}>No preview available</p>
      )}
     </div>
    ))}
   </div>
  </div>
 );
}

export default Token;
