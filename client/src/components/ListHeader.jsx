import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("signing out");
  };

  return (
    <div className="list-header">
      <h3> {listName} </h3>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          Add New
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
