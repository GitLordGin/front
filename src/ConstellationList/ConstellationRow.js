import React from "react";
import { Button } from "react-bootstrap";
import { BsFillXCircleFill } from "react-icons/bs";

function ConstellationRow(props) {
  const constellation = props.constellation;
  return (
    <tr key={constellation.id}>
      <td>{constellation.name}</td>
      <td>{constellation.additional_info}</td>
      <td>
        <Button
          variant="primary"
          onClick={(e) => {
            props.onUpload(e, constellation);
          }}
        >
          Upload
        </Button>
      </td>
      <td>
        <Button
          variant="primary"
          onClick={(e) => {
            props.onEdit(e, constellation);
          }}
        >
          Edit
        </Button>
      </td>
      <td>
        <BsFillXCircleFill
          onClick={(e) => {
            props.onRemove(e, constellation.id);
          }}
        />
      </td>
    </tr>
  );
}

export default ConstellationRow;
