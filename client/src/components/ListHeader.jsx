import React from 'react'

const ListHeader = ({ listName }) => {

    const signOut = () => {
        console.log('signing out')
    }

  return (
    <div className="list-header">
      <h3> {listName} </h3>
      <div className="button-container">
        <button className="create">Add New</button>
        <button className="signout" onClick={signOut}>SIGN OUT</button>
      </div>
    </div>
  );
};

export default ListHeader