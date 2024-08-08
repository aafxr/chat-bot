import React from 'react';

import './TestApiPage.scss'

export function TestApiPage() {

    function copyToClipboard(text: string) {
        window.navigator.clipboard.writeText(text).catch(console.error)
    }


    function logInitData() {
        const text = JSON.stringify(Telegram.WebApp.initData)
        copyToClipboard(text)
    }


    return (
        <div className='test test-container'>

            <button onClick={logInitData}>print init data</button>
        </div>
    );
}

