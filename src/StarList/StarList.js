import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { remove_old_star } from "../API";
import { myBLEGoToXY } from "../BLE";
import { equatorial_to_horizontal } from "../utils";
import AddStar from "./AddStar";
import EditStar from "./EditStar";
import StarRow from "./StarRow";

function StarList() {
  const dispatch = useDispatch();
  const stars = useSelector((state) => state.Stars.stars);
  const onRemove = async (e, id) => {
    const res = await remove_old_star(dispatch, id);
    if (res !== null) {
      const message =
        "Star can't be removed it is used at these constalations:\n";
      alert(message + res.map((x) => x.name + "\n"));
    }
  };
  const onUpload = async (e, star) => {
    const res = equatorial_to_horizontal(
      star.right_ascension,
      star.declination,
      23.96,
      54.9
    );
    console.log(res);
    //FIXME
    await myBLEGoToXY(5, 0, 1, star.right_ascension, star.declination);
  };
  const [editStar, setEditStar] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const onEdit = (e, star) => {
    setEditModal(true);
    setEditStar(star);
  };
  return (
    <div>
      <AddStar />
      <EditStar star={editStar} modal={editModal} setModal={setEditModal} />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Right ascension</th>
            <th>Declination</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stars.map((val) => {
            return (
              <StarRow
                key={val.id}
                star={val}
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

export default StarList;
