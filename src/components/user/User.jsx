import React from 'react';

//---- Style
import "./User.css"

export default class User extends React.Component {
    render() {
        return (
            <div id="user">
                <center>
                    <figure id="image-user">
                        <img id="image-user" src="https://ik.imagekit.io/9t3dbkxrtl/default-image.jpg"
                            alt="Image of User Ramon" />
                    </figure>
                    <h1>Ramon Paolo Maran</h1>
                </center>
            </div>
        )
    }
}