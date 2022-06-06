import React from 'react';
import '../../styles/login.css';

export default function Login() {
    return (
        <div className="main">
            <div className="box">
                <div className="text-3xl font-bold underline">Instagram</div>
                <div>
                    <form className="form">
                        <input type="text" />
                        <input type="password" />
                    </form>
                </div>
            </div>

        </div>
    )
}
