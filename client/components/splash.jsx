import React, { useEffect } from 'react';
import '../css/Splash.css';

function Splash({setSplash}) {
    useEffect(() => {
        setTimeout(() => {
            setSplash(false);
        }, 4000);
    }, []);

    return (
        <div className="splash">
            <div className='container'>
                <span>L</span>
                <span>i</span>
                <span>s</span>
                <span>t</span>
                <span>i</span>
                <span>f</span>
                <span>y</span>
            </div>
        </div>
    );
}

export default Splash;