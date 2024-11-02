import React from "react";
const client = process.env.REACT_APP_CLIENT_ID;
const Auth=`https://accounts.spotify.com/authorize?response_type=code&${client}&redirect_uri=http://localhost:3001/login&client_id=e84cd162f0ee4683b36de1b6ea4ddb4f&scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20app-remote-control%20streaming%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20user-follow-modify%20user-follow-read%20user-read-playback-position%20user-top-read%20user-read-recently-played%20user-library-modify%20user-library-read%20user-read-email%20user-read-private`;


export default function Login() {
    return (
        <div>
            <button className="click">
                <a href={Auth}>Login</a>
            </button>
        </div>
    );
} 