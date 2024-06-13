import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ContactList = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="mb-5 mt-0">Agenda</h1>
      {store.contacts == [] ? (
        <span>Enter your contacts</span>
      ) : (
        store.contacts.map((contact, index) => (
          <div key={index} className="card text-center container">
            <div className="card-body text-start d-flex justify-content-between">
              <div className="d-flex">
                <div className="my-auto me-4">
                  <img
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt="user-pic"
                  />
                </div>

                <div className="use-info">
                  <h5 className="m-0">{contact.name}</h5>

                  <div className="d-flex align-items-center">
                    <i className="fas fa-map-marker-alt pe-2"></i>
                    <p className="m-0">{contact.address}</p>
                  </div>

                  <div className="d-flex align-items-center">
                    <i className="fas fa-phone pe-2"></i>
                    <p className="m-0">{contact.phone}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-envelope pe-2"></i>
                    <p className="m-0">{contact.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-secondary mx-2 edit"
                  onClick={() => navigate(`/edit-contact/${contact.id}`)}
                >
                  <i className="far fa-edit d-flex justify-content-center"></i>
                </button>
                <button
                  className="btn btn-danger mx-2 trash"
                  onClick={() => actions.deleteContact(contact.id)}
                >
                  <i className="fas fa-trash-alt d-flex justify-content-center"></i>
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <div>
        <button className="btn btn-danger mt-4" onClick={actions.deleteUser}>
          Delete your agenda!
        </button>
      </div>
    </div>
  );
};

export default ContactList;
