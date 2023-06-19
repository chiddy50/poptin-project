
<template>
    <div>
      <h1>Draggable DIV Element</h1>
      <p>Click and hold the mouse button down while moving the DIV element</p>
  
      <div ref="mydiv" class="draggable" :style="{ top: topPosition, left: leftPosition }">
        <div ref="mydivheader" class="draggable-header" @mousedown="dragMouseDown">Click here to move</div>
        <p>Move</p>
        <p>this</p>
        <p>DIV</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const mydiv = ref(null);
      const mydivheader = ref(null);
      const topPosition = ref(0);
      const leftPosition = ref(0);
      let pos1 = 0;
      let pos2 = 0;
      let pos3 = 0;
      let pos4 = 0;
  
      const dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      };
  
      const elementDrag = (e) => {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        leftPosition.value = mydiv.value.offsetLeft - pos1 + 'px';
        topPosition.value = mydiv.value.offsetTop - pos2 + 'px';
      };
  
      const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
  
      return {
        mydiv,
        mydivheader,
        topPosition,
        leftPosition,
        dragMouseDown,
        elementDrag,
        closeDragElement
      };
    }
  };
  </script>
  
  <style scoped>
  .draggable {
    position: absolute;
    z-index: 9;
    background-color: #f1f1f1;
    text-align: center;
    border: 1px solid #d3d3d3;
  }
  
  .draggable-header {
    padding: 10px;
    cursor: move;
    z-index: 10;
    background-color: #2196F3;
    color: #fff;
  }
  </style>
  