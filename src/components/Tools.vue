<template>
    <div id="tools" class="bg-gray-100 p-5">
        
        <div @dragstart="startRowDrag" :draggable="true" id="add_row" class="custom__elements rounded-md cursor-move border border-gray-300 bg-white p-4 flex flex-col gap-1 items-center justify-center relative">
            <i class='bx bx-objects-horizontal-left text-4xl'></i>
            <p class="text-md">ROW</p>
        </div>

        <div @dragstart="startTextDrag" :draggable="true" id="add_text" class="custom__elements rounded-md cursor-move border border-gray-300 bg-white p-4 flex flex-col gap-1 items-center justify-center relative">
          <h1 class='font-bold text-4xl'>Ae</h1>
          <p class="text-md">TEXT</p>
        </div>

        <div @dragstart="startBoxDrag" :draggable="true" id="add_box" class="custom__elements rounded-md cursor-move border border-gray-300 bg-white p-4 flex flex-col gap-1 items-center justify-center relative">
            <i class='bx bx-square-rounded text-4xl'></i>
            <p class="text-md">BOX</p>
        </div>

        <div @dragstart="startButtonDrag" :draggable="true" class="custom__elements rounded-md cursor-move border border-gray-300 bg-white p-4 flex flex-col gap-1 items-center justify-center relative">
          <i class='bx bx-plus-circle text-4xl'></i>
          <p class="text-md">BUTTON</p>
        </div>

        <div @dragstart="startStarDrag" :draggable="true" id="add_star" class="custom__elements rounded-md cursor-move border border-gray-300 bg-white p-4 flex flex-col gap-1 items-center justify-center relative">
          <i class='bx bxs-star text-4xl'></i>
          <p class="text-md">STAR</p>
        </div>

        <div id="add_input" @dragstart="startInputDrag" :draggable="true" class="custom__elements rounded-md cursor-move border border-gray-300 bg-white p-4 flex flex-col gap-1 items-center justify-center relative">
          <i class='bx bx-battery text-4xl'></i>
          <p class="text-md">INPUT</p>
        </div>

    </div>
</template>
<script>
export default {
    setup(props, context) {
        const emitShowColumnModal = (id) => {
            context.emit('trigger-show-column-modal', id)
        }

        const startTextDrag = (event) => {
            event.dataTransfer.setData('text/plain', 'text');
        }

        const startRowDrag = (event) => {
            event.dataTransfer.setData('text/plain', 'row');
        }

        const startBoxDrag = (event) => {
            event.dataTransfer.setData('text/plain', 'box');
        }

        const startInputDrag = (event) => {
            event.dataTransfer.setData('text/plain', 'input');
        }

        const startStarDrag = (event) => {
            event.dataTransfer.setData('text/plain', 'star');

        }

        const startButtonDrag = (event) => {
            // event.dataTransfer.setData('text/plain', JSON.stringify({ x: event.clientX, y: event.clientY }));
            event.dataTransfer.setData('text/plain', 'button');
        }

        return {
            emitShowColumnModal,
            startTextDrag,
            startRowDrag,
            startInputDrag,
            startBoxDrag,
            startStarDrag,
            startButtonDrag
        }
    }
}
</script>
<style>
    
</style>