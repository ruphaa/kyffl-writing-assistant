import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { createApi } from 'unsplash-js';

const unsplash = new createApi({
  accessKey: "4jcNGlUEtxkk8nrRuGidj3GAiZah3226jtpLcQMUl6c",
});

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function SearchPhotos({editorState, setContentState}) {
  const [pics, setPics] = useState([])
  const [image, setImage] = useState('')
  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const selectPhoto = (pic) => {
    setContentState(pic.urls?.full)
    setImage(pic.urls?.full)
    closeModal()
  }

  function closeModal(){
    setIsOpen(false);
  }

  const searchPhotos = async (e) => {
    unsplash.search.getPhotos({
      query: e.target.value,
      page: 1,
      perPage: 20
    })
    .then(json => {
      setPics(json.response.results);
    });
  };

  return (
    <>
        <button className="unsplash" id="unsplash" onClick={openModal}>📷</button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Unsplash Photos"
      >
        <div>
          <div className="search-photos">
            <input
                type="text"
                name="query"
                className="input"
                placeholder={`Try "dog" or "apple"`}
                onChange={searchPhotos}
        />
          <button className="close-modal" onClick={closeModal}>x</button>
          </div>
          <div className="photo-grid">
            {pics.length ? (
              pics.map(pic => 
                <div className="card" key={pic.id} onClick={() => selectPhoto(pic)}>
                  <img
                    className="card--image"
                    alt={pic.alt_description}
                    src={pic.urls.regular}
                    width="100%"
                    height="100%"
                  ></img>
                </div>
              )
            ) : (<div>No photos</div>)}
          </div>
        </div>
        </Modal>
    </>
  );
}
