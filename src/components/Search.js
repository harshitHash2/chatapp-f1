import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import {SearchModel, addToSetUnique } from '../models/sp'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/FirebaseSetup';

const Search = () => {
    var sresults = new Set();
    const hyp = new Set();
    // const [load, setLoad]= useState([]);

    const handleChange= (e) => {
        // console.log(e.target.value.length)
        // if(e.target.value.length === 0){
           
        //     sresults= new Set();
        //     setLoad([]);
            
        //     return;
        // }

        sresults=new Set();

        for (let num of hyp) {
            if ( num.toLowerCase().includes( e.target.value.toLowerCase()) ) {
              // Add the item to the search results list
              console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
              
                sresults.add(num);
                // setState(() {
                //   _searchresults.add(item);
                // });
                
             
            }
        }
        // setLoad(Array.from(sresults.values()));
        console.log(sresults.values())
        console.log(sresults.size);


        // for (const num of hyp) {
        //     if (num.toLowerCase().includes( e.target.value.toLowerCase())) {
        //         console.log('polo')
        //         // console.log('poloto')
        //     }
            
        // }

    }

    const fetchData = async () => {
        
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          hyp.add(doc.data()["username"]);
          
        //   console.log(hyp);
        //   console.log(doc.id, " => ", doc.data());
        });
    };
    
    useEffect(() => {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        
        
    
        fetchData();
      }, []);

  return (
    <>
        {/* <SearchBar/> */}
        <div className="container " >
        <div className="card my-4" style={{ borderRadius: "70px",height: '3rem'}}>
            <div className='container' style={{height: '3rem', paddingTop: '8px'}}>
        <i className="bi bi-search mg-3"></i>
        <input type="text" className="pp1 mx-3" onChange={handleChange} id="exampleFormControlInput1" placeholder="Search..." style={{border: 'none', outline: 'none', width: '300px'}}/>
        </div>

        </div>
        </div>
        {/* {load.map((value) => (
        <h1> {value} </h1>
      ))} */}
        <SearchResult results={sresults}/>
    </>
  )
}

export default Search