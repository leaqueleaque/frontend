import React from 'react';

const Toy = ({ visible, message, positive }) => {

    let toastStyle ={};
    if (positive) toastStyle = {
        backgroundColor: '#4fbf60'
    };
    else toastStyle = {backgroundColor: '#F89406'};

    if (!visible) {
        return null;
    }

    return (
        <div id="toast-container" className="toast-top-right">
            <div className="toast" aria-live="assertive" style={toastStyle} >
                <div className="toast-message">{message}</div>
            </div>
        </div>
    );
};

export default Toy;
