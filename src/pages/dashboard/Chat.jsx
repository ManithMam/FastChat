import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

const Chat = ({ chatId }) => {
  const { user, getChatMessages, onChatMessagesChanges, sendMessage } =
    UserAuth();

  const [messages, setMessages] = useState({}); 

  useEffect(() => {
    getChatMessages(chatId).then((messages) => {
      setMessages(messages);
    });

    if (chatId) {
      onChatMessagesChanges(chatId, (messages) => {
        setMessages(messages);
      });
    }
  }, [chatId]);

  return (
    <div className="my-5 w-full flex flex-row justify-center">
      <h1 className="text-xl font-bold">Chat {chatId}</h1>
      <div className="w-full flex flex-col justify-center items-center">
        {Object.keys(messages).map((messageId) => {
            return (
                <div key={messageId}>
                <div>{messages[messageId].message}</div>
                <div>{messages[messageId].sender}</div>
                </div>
            );
        })
        }
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(chatId, event.target[0].value);
            event.target[0].value = "";
          }}
        >
          <input type="text" placeholder="Message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
