import React from 'react';

import './TestApiPage.scss'

export function TestApiPage() {

    function copyToClipboard(text: string) {
        window.navigator.clipboard.writeText(text).catch(console.error)
    }


    function logInitData() {
        copyToClipboard(Telegram.WebApp.initData)
    }


    return (
        <div className='test test-container'>

            <button onClick={logInitData}>print init data</button>
        </div>
    );
}

