import React from "react";
import { Button } from "react-bootstrap";
import { BsFillXCircleFill } from "react-icons/bs";
import { dth_print, dtd_print } from "../utils";

function StarRow(props) {
  const star = props.star;
  const provided = props.provided;
  return (
    <>
      {provided ? (
        <tr
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <td>{star.name}</td>
          <td>{star.additional_info}</td>
          <td>{dth_print(star.right_ascension)}</td>
          <td>{dtd_print(star.declination)}</td>
          <td>
            <BsFillXCircleFill
              onClick={(e) => {
                props.onRemove(e, star.index);
              }}
            />
          </td>
        </tr>
      ) : (
        <tr key={star.id}>
          <td>{star.name}</td>
          <td>{star.additional_info}</td>
          <td>{dth_print(star.right_ascension)}</td>
          <td>{dtd_print(star.declination)}</td>
          <td>
            <Button
              variant="primary"
              onClick={(e) => {
                props.onUpload(e, star);
              }}
            >
              Upload
            </Button>
          </td>
          <td>
            <Button
              variant="primary"
              onClick={(e) => {
                props.onEdit(e, star);
              }}
            >
              Edit
            </Button>
          </td>
          <td>
            <BsFillXCircleFill
              onClick={(e) => {
                props.onRemove(e, star.id);
              }}
            />
          </td>
        </tr>
      )}
    </>
  );
}

export default StarRow;
