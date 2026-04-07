import React from "react";

function Token() {
 return (
  <div style={{ padding: 20, marginTop: 210, maxWidth: 720 }}>
   <h2 style={{ marginBottom: 12 }}>Spotify demo disabled</h2>
   <p style={{ lineHeight: 1.6 }}>
    This component no longer requests Spotify tokens in the browser. If you want
    to restore this feature, move token generation to a server-side route and
    keep credentials in environment variables.
   </p>
  </div>
 );
}

export default Token;
