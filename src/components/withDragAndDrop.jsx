import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React from "react";
function withDragAndDrop(Component, droppableId) {
  return class withDragAndDrop extends React.Component {
    render() {
      return (
        <DragDropContext>
          <Droppable droppableId={droppableId}>
            {(provided) => {
              <div></div>;
            }}
          </Droppable>
        </DragDropContext>
      );
    }
  };
}

export default withDragAndDrop;
