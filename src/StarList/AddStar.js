import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { add_new_star } from "../API";
import StarMap from "../StarMap";
import { dth_print, dtd_print } from "../utils";

function AddStar(props) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const openModal = (e) => {
    setModal(true);
  };
  const closeModal = (e) => {
    setModal(false);
  };
  const saveModal = async (e) => {
    await add_new_star(dispatch, name, details, rightAscension, declination);
    setModal(false);
  };

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [rightAscension, setRightAscension] = useState(0);
  const [declination, setDeclination] = useState(90);
  const editName = (e) => {
    setName(e.target.value);
  };
  const editDetails = (e) => {
    setDetails(e.target.value);
  };
  const editCoords = (e) => {
    setRightAscension(e.right_ascension);
    setDeclination(e.declination);
  };
  return (
    <>
      <Button variant="primary" onClick={openModal}>
        Add star
      </Button>
      <Modal dialogClassName="ConstellationList--Modal" show={modal}>
        <Modal.Header>
          <Modal.Title>New star</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-outline">
            <label className="form-label">Name</label>
            <input
              onChange={editName}
              value={name}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-outline">
            <label className="form-label">Details</label>
            <textarea
              onChange={editDetails}
              value={details}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-outline">
            <label className="form-label">Right ascension</label>
            <label className="form-control">{dth_print(rightAscension)}</label>
          </div>
          <div className="form-outline">
            <label className="form-label">Declination</label>
            <label className="form-control">{dtd_print(declination)}</label>
          </div>
          <StarMap
            onClick={editCoords}
            stars={[
              {
                right_ascension: rightAscension,
                declination: declination,
                id: 0,
              },
            ]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={saveModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddStar;
