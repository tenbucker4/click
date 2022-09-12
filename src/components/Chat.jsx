import React, { useEffect, useState } from 'react';
import { db, auth, storage } from "../firebase";
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from './User';
import MessageInput from './MessageInput';
import Message from './Message';
import "../styles/Chat.css"

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [message, setMessage] = useState("");
  const [img, setImg] = useState()
  const [messages, setMessages] = useState([]);

  const currentUser = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");

    // creates query filtering out current user
    const userQuery = query(usersRef, where("uid", "not-in", [currentUser]));
    // execute query
    const find = onSnapshot(userQuery, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => find();
  }, []);

  const selectChat = (user) => {
    // Displays conversation box with selected user
    setChat(user);

    // Defines id of interaction between current user and selected user
    const messageRecipient = user.uid
    const id = currentUser > messageRecipient ? `${currentUser + messageRecipient}` : `${messageRecipient + currentUser}`

    // Query for collection of all messages sent between users, sorts them by creation date
    const messagesRef = collection(db, "messages", id, "chat");
    const messageQuery = query(messagesRef, orderBy("createdAt", "asc"));

    onSnapshot(messageQuery, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })
      setMessages(msgs)
    })
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageRecipient = chat.uid;

    // Creates a combined ID to represent chat between two unique users
    const id = currentUser > messageRecipient ? `${currentUser + messageRecipient}` : `${messageRecipient + currentUser}`

    let imgUrl;
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()} = ${img.name}`);
      const pic = await uploadBytes(imgRef, img);
      const downloadUrl = await getDownloadURL(ref(storage, pic.ref.fullPath));
      imgUrl = downloadUrl
    }

    // Need to define first collection (messages) as before, but also need to define a
    //  subcollection ("chat") because we can't use addDoc to a document itself (id)
    await addDoc(collection(db, "messages", id, "chat"), {
      message,
      from: currentUser,
      to: messageRecipient,
      createdAt: Timestamp.fromDate(new Date()),
      image: imgUrl || ""
    });
    
    // Instead of creating a new doc with a new ID every time a message is sent, we create a new collection with the 
    // most recent message sent between two users, using the ID that links the two
    await setDoc(doc(db, "lastMsg", id), {
      message,
      from: currentUser,
      to: messageRecipient,
      createdAt: Timestamp.fromDate(new Date()),
      image: imgUrl || "",
      unread: true,
    })

    setMessage("");
  }

  return (
    <div className="chat-page">
      <div className="conversations">
        {users.map((user) => (
          <User key={user.uid} user={user} selectChat={selectChat} currentUser={currentUser} chat={chat}/>
        ))}
      </div>
      <div className="chat-box">
        {chat ? (
          <>
            <div className="convo-header">Your conversation with <span style={{ color: "#0084ff" }}>{chat.name}</span></div>
            <div className="message-log">
              {messages.length ? messages.map((msg, index) => <Message key={index} msg={msg} currentUser={currentUser}/>) : 
              <p className="convo-start">This is the start of your conversation with <span style={{ color: "#0084ff" }}>{chat.name}</span>. Say hello! </p>}
            </div>
            <MessageInput sendMessage={sendMessage} message={message} setMessage={setMessage} setImg={setImg}/>
          </>
          ) : <div className="chat-intro">Welcome! <br></br>Select a user from the list to begin a conversation.</div>}
      </div>
    </div>
  )
}

export default Chat