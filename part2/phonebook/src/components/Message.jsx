import React from "react";

const Message = ({ message, setMessage }) => {
    return message ? (
        <div
            className={
                message.positive ? "success" : "error"
            }
            onClick={() => {
                setMessage("");
            }}
        >
            {message.text}
        </div>
    ) : null;
};

export default Message;
