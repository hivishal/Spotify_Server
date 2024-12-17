import React from "react";
import './Below.css'
export default function Song(){
    return(
        <div className="songs_tab">
            <h1>here comes the logic</h1>
            <div className="liked"><h1>load your songs here the liked ones</h1></div>
            <div className="recommended">Recommend here</div>
            <div className="queue">view your queue</div>
        </div>
    )
}