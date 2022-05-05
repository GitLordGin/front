import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  add_coordinate,
  delete_coordinate,
  edit_coordinate,
  set_movement_type,
  swap_coordinate,
  set_laser,
  set_rpm,
  set_wait,
} from "../redux/reducers/ListComponentSlice";
import RowComponent from "./RowComponent";
import { myBLEWriteList } from "../BLE";

function ListComponent(props) {
  const coord_list = useSelector((state) => state.ListComponent.coordinates);
  const movement_type = useSelector(
    (state) => state.ListComponent.movement_type
  );
  const rpm = useSelector((state) => state.ListComponent.rpm);
  const wait = useSelector((state) => state.ListComponent.wait);
  const laser = useSelector((state) => state.ListComponent.laser);
  const dispatch = useDispatch();

  function handleOnDragEnd(e) {
    if (!e.destination) return;
    dispatch(
      swap_coordinate({
        source: e.source.index,
        destination: e.destination.index,
      })
    );
  }
  function handleAdd(e) {
    dispatch(add_coordinate());
  }
  function handleEdit(e, id) {
    const target = { row: id, col: e.target.name, value: e.target.value };
    dispatch(edit_coordinate(target));
  }
  function handleDelete(e, id) {
    dispatch(delete_coordinate(id));
  }
  //const encoder = new TextEncoder();
  async function handleUpload(e) {
    await myBLEWriteList(coord_list, movement_type, rpm, wait, laser);
  }
  function handle_movement_type(e) {
    dispatch(set_movement_type(e.target.value));
  }
  function handle_rpm(e) {
    dispatch(set_rpm(e.target.value));
  }
  function handle_wait(e) {
    dispatch(set_wait(e.target.value));
  }
  function handle_laser(e) {
    dispatch(set_laser(e.target.value));
  }
  return (
    <div>
      <div className="ListComponent">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="MyList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {coord_list.map((x, index) => {
                  return (
                    <Draggable
                      key={x.id}
                      draggableId={x.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <RowComponent
                            id={x.id}
                            x={x.x}
                            y={x.y}
                            rpm={x.rpm}
                            wait={x.wait}
                            laser={x.laser}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}{" "}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="ListComponent--Buttons">
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={handleUpload}>Upload</Button>
          <div className="ListComponent--Buttons--p">
            <p>Movement_type:</p>
          </div>
          <input
            className={"TMP001"}
            onChange={handle_movement_type}
            type="number"
            value={movement_type}
          />
          <div className="ListComponent--Buttons--p">
            <p>RPM:</p>
          </div>
          <input
            className={"TMP001"}
            onChange={handle_rpm}
            type="number"
            value={rpm}
          />
          <div className="ListComponent--Buttons--p">
            <p>Wait:</p>
          </div>
          <input
            className={"TMP001"}
            onChange={handle_wait}
            type="number"
            value={wait}
          />
          <div className="ListComponent--Buttons--p">
            <p>Laser:</p>
          </div>
          <input
            className={"TMP001"}
            onChange={handle_laser}
            type="number"
            value={laser}
          />
        </div>
      </div>
    </div>
  );
}

export default ListComponent;
