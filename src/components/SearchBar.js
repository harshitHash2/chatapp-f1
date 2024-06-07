import React from 'react'

const SearchBar = () => {
  return (
    <>
        <div className="container " >
        <div className="card my-4" style={{ borderRadius: "70px",height: '3rem'}}>
            <div className='container' style={{height: '3rem', paddingTop: '8px'}}>
        <i className="bi bi-search mg-3"></i>
        <input type="text" className="pp1 mx-3" id="exampleFormControlInput1" placeholder="Search..." style={{border: 'none', outline: 'none', width: '300px'}}/>
        </div>

        </div>
        </div>
    </>
  )
}

export default SearchBar