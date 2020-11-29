import '../App.css';
import React, {useState, useEffect, Fragment} from 'react';
import firebase from "../firebase";
import {v4 as uuidv4 } from 'uuid'
import EditContact from './EditContact'
import { storage } from "../firebase"

function SnapshotFirebase() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [myUrl, setMyUrl] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const headerImage = "https://firebasestorage.googleapis.com/v0/b/contacts-crud-7e55d.appspot.com/o/images%2Fcontacts.png?alt=media&token=f1dfc50e-c257-4fae-a67d-b381c22f45ec";
  
  const ref = firebase.firestore().collection("contacts");

  //Uses querySnapshot to grab our data from our firestore database in realtime
  function getContacts() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setContacts(items);
      setLoading(false);
    });
  }

  //WE CAN USE GET REQUEST BUT THIS WILL NOT UPDATE DATA IN REALTIME (WILL NEED TO REFRESH PAGE FOR UPDATED DATA)

  // function getContacts() {
  //   setLoading(true);
  //   ref.get().then((item) => {
  //     const items = item.docs.map((doc) => doc.data());
  //     setContacts(items);
  //     setLoading(false);
  //   })
  // }

  useEffect(() => {
    getContacts();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //ADD FUNCTION
  function addContact(newContact) {
    if (image != null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              newContact = {name: newContact.name, email: newContact.email, phone: newContact.phone, company: newContact.company, id: newContact.id, url: url}
              console.log(url);
              ref
          //.doc()
          .doc(newContact.id)
          .set(newContact)
          .catch((err) => {
              console.log(err);
          });
          console.log(newContact);
          setShowAdd(!showAdd);
            })
          
        }
      )
      document.getElementById("addForm").reset();
    }
      else {
        ref
              //.doc()
              .doc(newContact.id)
              .set(newContact)
              .catch((err) => {
                  console.log(err);
              });
              console.log(newContact);
              document.getElementById("addForm").reset();
      }
  }

  //DELETE FUNCTION
  function deleteContact(contact) {
      ref
        .doc(contact.id)
        .delete()
        .catch((err) => {
            console.log(err);
        });
  }

  return (
    <div>
        <Fragment>
            <div id="image-header">
              <img src={headerImage}></img>
              <h1>Contacts</h1>
            </div>
            <button id="addBtn" onClick={() => setShowAdd(!showAdd)}>Add a Contact</button>
            {showAdd ? 
            <div className="inputBox">
                {/* <button id="addBtn" onClick={handleAdd()}>Add a Contact</button> */}
                <form id="addForm">
                  <input placeholder="Name..." type="text" onChange={(e) => setName(e.target.value)} />
                  <input placeholder="Email..." type="text" onChange={(e) => setEmail(e.target.value)} />
                  <input placeholder="Phone..." type="text" onChange={(e) => setPhone(e.target.value)} />
                  <input placeholder="Company..." type="text" onChange={(e) => setCompany(e.target.value)} />
                  <input type="file" onChange={(e) => handleChange(e)}></input>
                </form>
                <button onClick={() => addContact({ name, email, phone, company, id: uuidv4(), myUrl })}>
                    Submit
                </button>
            </div>
              : null}
            {loading ? <h1>Loading...</h1> : null}
        </Fragment>
        <div id="meta-container">
          <h1 id="name-meta">Name</h1>
          <h1 id="phone-meta">Phone</h1>
          <h1 id="email-meta">Email</h1>
          <h1 id="company-meta">Company</h1>
        </div>
        {contacts.map((contact) => (
            <div id="contact-container">
              <div id="contact" key={contact.id}>
                <img id="contact-picture" src={contact.url}></img>
                <h2 id="contact-name">{contact.name}</h2>
                <h2 id="contact-phone">{contact.phone}</h2>
                <h2 id="contact-email">{contact.email}</h2>
                <h2 id="contact-company">{contact.company}</h2>
                <EditContact contact={contact}/>
                <div>
                  <button id="deleteBtn" onClick={() => deleteContact(contact)}>X</button>
                </div>
              </div>
            </div>
        ))}
    </div>
  );
}

export default SnapshotFirebase;
