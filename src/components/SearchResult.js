import React from 'react'

const SearchResult = ({results}) => {
    // const {results} = this.props;
    const itemsArray = Array.from(results);

  return (
    <>
    <h1>THis is </h1>
    <h2> {itemsArray[0]} </h2>
    <ul>
      {itemsArray.map((item, index) => (
        <li key={index}> <h1>{item}</h1></li>
      ))}
    </ul>
    </>
  )
}

export default SearchResult