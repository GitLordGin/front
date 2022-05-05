import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { get_constellation, remove_constellation } from "../API";
import { myBLEWriteList } from "../BLE";
import AddConstellation from "./AddConstellation";
import ConstellationRow from "./ConstellationRow";
import EditConstellation from "./EditConstellation";

function ConstellationList() {
  const dispatch = useDispatch();
  const stars = useSelector((state) => state.Stars.stars);
  const constellations = useSelector(
    (state) => state.Constellations.constellations
  );
  const onRemove = async (e, id) => {
    await remove_constellation(dispatch, id);
  };
  const onUpload = async (e, constellation) => {
    const res = await get_constellation(constellation.id);
    const values = res[0].map((x) => {
      return {
        x: x.right_ascension,
        y: x.declination,
        rpm: "5",
        laser: "1",
        wait: "1000",
      };
    });
    const movement_type = 2;
    const rpm = 5;
    const wait = 2000;
    const laser = 0;
    await myBLEWriteList(values, movement_type, rpm, wait, laser);
  };
  const [editConstellation, setEditConstellation] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const onEdit = (e, constellation) => {
    setEditModal(true);
    setEditConstellation(constellation);
  };
  return (
    <div>
      <AddConstellation stars={stars} />
      <EditConstellation
        stars={stars}
        constellation={editConstellation}
        modal={editModal}
        setModal={setEditModal}
      />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {constellations.map((val) => {
            return (
              <ConstellationRow
                key={val.id}
                constellation={val}
                onRemove={onRemove}
                onUpload={onUpload}
                onEdit={onEdit}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ConstellationList;
