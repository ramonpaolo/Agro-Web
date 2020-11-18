import React from 'react';

import "./Footer.css"

export default class Footer extends React.Component {
    render() {
        return (
            <div id="footer">
                <center>
                    <p>Contato</p>
                    <p>15 99116-0118</p>
                    <p>ramonpaolomaran12@gmail.com</p>
                </center>
                <figure>
                    <img title="Baixar App" src="https://www.kaspersky.com.br/content/pt-br/images/repository/isc/2020/9910/a-guide-to-qr-codes-and-how-to-scan-qr-codes-2.png"
                        width="60vw" height="60vh" alt="QRCode APK" />
                </figure>
            </div>
        )
    }
}