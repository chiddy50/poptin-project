
<template>
    <div>
      <div ref="mydiv" class="draggable" :style="{ top: topPosition, left: leftPosition }">
        <div ref="mydivheader" class="draggable-header" @mousedown="dragMouseDown">
            <i class='bx bxs-star text-3xl'></i>
        </div>
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
  }
  
  .draggable-header {
    cursor: move;
    z-index: 10;
  }
  </style>
  