import React, { useState } from 'react'
import { db } from '../firebase/FirebaseSetup';
import { collection, addDoc } from 'firebase/firestore';

const ChatText = ({username, imageURL, msgID}) => {
    // const {username, imageURL}= this.props;
    let [text, setText] = useState('');


    const handleSubmit= async ()=>{
        console.log(text);
        // console.log(username);

        const friendCollectionRef = collection(
            db,
            "messaging",
            msgID,
            "with"
          );

          await addDoc(friendCollectionRef, {
            text: text,
          createdAt: Date(),
          userId: localStorage.getItem('uid'),
          username: username,
          imageURL: imageURL,
          isRead: false,
          date: Date(),
          });

          setText('');


    }


    const handleChange= (e)=> {
        setText(e.target.value);
        

    }

  return (
    <>
    <div className="container " style={{display: 'inline-flex'}}>
        <div
          className="card my-4 flex-grow-1"
          style={{ borderRadius: "70px", height: "3rem" }}
        >
          <div
            className="container"
            style={{ height: "3rem", paddingTop: "8px" }}
          >
            <i className="bi bi-search mg-3"></i>
            <input
                // name='text'
                value={text}
              type="text"
              className="pp1 mx-3"
              onChange={handleChange}
              id="exampleFormControlInput1"
              placeholder="Search..."
              style={{ border: "none", outline: "none", width: "300px" }}
            />
          </div>
        </div>
        <span>
        <button type="button" className="btn btn-info" onClick={handleSubmit}>Info</button>

        </span>
        
      </div>
        
        
        
        
              
            
      
        
    </>
  )
}

export default ChatText