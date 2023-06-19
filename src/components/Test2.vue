<template>
    <div>
      <div class="drag-container">
        <div class="draggable" :style="{ left: position.x + 'px', top: position.y + 'px' }" draggable @dragstart="dragStart">
          Drag Me!
        </div>
      </div>
      <div class="drop-container" @dragover="dragOver" @drop="drop">
        Drop Here!
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  
  export default {
    setup() {
      const position = reactive({ x: 0, y: 0 });
  
      const dragStart = (event) => {
        // Store the initial position of the dragged element
        event.dataTransfer.setData('text/plain', JSON.stringify({ x: event.clientX, y: event.clientY }));
      };
  
      const dragOver = (event) => {
        // Prevent default behavior to enable dropping
        event.preventDefault();
      };
  
      const drop = (event) => {
        // Get the stored position from the dataTransfer object
        const storedPosition = JSON.parse(event.dataTransfer.getData('text/plain'));
  
        // Calculate the offset between the initial and current positions
        const offsetX = event.clientX - storedPosition.x;
        const offsetY = event.clientY - storedPosition.y;
  
        // Update the position of the dragged element
        position.x += offsetX;
        position.y += offsetY;
      };
  
      return {
        position,
        dragStart,
        dragOver,
        drop
      };
    }
  };
  </script>
  
  <style>
  .drag-container {
    width: 200px;
    height: 200px;
    background-color: #f1f1f1;
    position: relative;
  }
  
  .draggable {
    width: 100px;
    height: 100px;
    background-color: #2196F3;
    color: #fff;
    position: absolute;
    cursor: move;
  }
  
  .drop-container {
    width: 200px;
    height: 200px;
    background-color: #ccc;
    margin-top: 20px;
    text-align: center;
    line-height: 200px;
  }
  </style>
  