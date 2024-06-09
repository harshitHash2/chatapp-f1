import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from "firebase/firestore";
import { db } from '../firebase/FirebaseSetup';
import { Link } from 'react-router-dom';

const AllChats = () => {
    let temp1 = new Set();
    let myobj= {};
    let temp2= new Set();
    const [data, setData] = useState({})


    const searching= async ()=> {

        // Fetching All friends UID
        const q = query(collection(db, "friend", localStorage.getItem('uid'), "with"), where("friendship", "==", "true"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp1.add(doc.id);
        });
        
        // For all UID fetching information
        for (let item of temp1){
            const docRef = doc(db, "users", item);
            const docSnap = await getDoc(docRef);
            myobj[item]= docSnap.data(); 
        
            //Fetching msgID
            let p1= '';
            const q = query(collection(db, "friend", localStorage.getItem('uid'), "with", item, "to"), where("friendship", "==", "true"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                temp2.add(doc.id);
                p1= doc.id
            });

            // Fetching Latest msg
            const q2 = query(collection(db, "messaging", p1, "with"), orderBy("date", "desc"), limit(1));
            const querySnapshot2= await getDocs(q2);
            querySnapshot2.forEach((doc) => {
                myobj[item].messages= doc.data();
            });
            myobj[item].msgId= p1;



        }
        console.log(myobj); 
        setData(myobj);
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        console.log(data);
        console.log(temp1)
    }

    useEffect(() => {
    
        searching();
      }, []);

  return (
    <>

    <div>
        <h1> { Object.keys(data) } </h1>
        
        {Object.entries(data).map(([key, value]) => (
            
            <Link to="/chatting" state={{value1: data[key].msgId, value2: data[key].username, value3: data[key].imageURL}} style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="card text-bg-info mb-3 mx-3" >
            <div className="card-header">Time</div>
            <div className="card-body">
              <h5 className="card-title"> { data[key].username } </h5>
              <p className="card-text">{ data[key].messages.text }</p>
            </div>
          </div>
          </Link>
          
          
        ))}


    </div>
    

    </>
  )
}

export default AllChats