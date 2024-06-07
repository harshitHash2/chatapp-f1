import React from 'react'

const SearchUser = () => {
  return (
    <>
         <div className="container " style={{ width: "150px",}}>
        <div className="card my-4" style={{ borderRadius: "100%", height: '150px', width: '150px' }}>
            <img style={{ borderRadius: "100%", height: '150px', width: '150px' }} src='https://firebasestorage.googleapis.com/v0/b/chat-app-fe05e.appspot.com/o/user_images%2FIofK6LAXffUUWJRcrSz0OkNQwKF2.jpg?alt=media&token=08497d7e-dbbc-408b-aa2a-b3e79ffe79f9' ></img>

        </div>
        </div>
        <div className='container' style={{width: '150rem', textAlign: 'center'}}>
        <button type="button" className="btn btn-warning mx-1">Add Friend</button>
        <button type="button" className="btn btn-warning mx-1">Message</button>
        <h2> THis is name</h2>
        <h2> THis is name</h2>
        <h2> THis is name</h2>
        </div>
    </>
  )
}

export default SearchUser