import '../App.css';
import React, { useState } from 'react';
import firebase from "../firebase";

function EditContact (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [editSave, setEditSave] = useState('Edit');
    const [show, setShow] = useState(false);

    const ref = firebase.firestore().collection("contacts");

    function showEdit(updatedContact) {
        if (editSave === 'Edit') { 
            setEditSave('Save')
            } else if (editSave === 'Save'){
              ref
              .doc(updatedContact.id)
              .update(updatedContact)
              .catch((err) => {
                  console.log(err);
              });
              setEditSave('Edit')
            }
            setShow(!show);
      }

    function handleCancel() {
      setEditSave('Edit');
      setShow(false);
    }

    return (
        <div>
            <button id="editBtn" onClick={() => showEdit({ name, email, phone, company, id: props.contact.id})}>{editSave}</button>
            {show ? 
                    <div>
                      <button onClick={() => handleCancel()}>Cancel</button>
                      <input defaultValue={props.contact.name} placeholder="Name..." type="text" onChange={(e) => setName(e.target.value)} />
                      <input defaultValue={props.contact.email} placeholder="Email..." type="text" onChange={(e) => setEmail(e.target.value)} />
                      <input defaultValue={props.contact.phone} placeholder="Phone..." type="text" onChange={(e) => setPhone(e.target.value)} />
                      <input defaultValue={props.contact.company} placeholder="Company..." type="text" onChange={(e) => setCompany(e.target.value)} />
                    </div> 
                      : null}
        </div>
    )
}

export default EditContact;