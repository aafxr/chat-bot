import React from 'react';

import './TestApiPage.scss'

export function TestApiPage() {
    function logInitData(){
        console.log(Telegram.WebApp.initData)
    }
    return (
        <div className='test test-container'>
            <button onClick={logInitData}>print init data</button>
        </div>
    );
}

