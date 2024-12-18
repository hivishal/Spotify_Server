import React, { useEffect } from "react";
import './Below.css'
export default function Song(){



return(
        <div className="songs_tab">
            <div className="uppertab">
                <button><div className="liked sizze"><h3>heart</h3></div></button>
                <button><div className="recommended sizze"><h3>Reccomendation</h3></div></button>
                <button><div className="liked sizze"><h3>queue</h3></div></button>
            </div>
        </div>
    )
}