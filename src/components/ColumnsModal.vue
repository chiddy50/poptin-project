<template>
    
    <!-- The Modal -->
    <!-- <div id="columsModal" class="modal"> -->

        <!-- Modal content -->

      <div id="columsModalContent" 
        class="columnmodal__content style__component bg-gray-200">

        <div @click="hideModal" class="my-5 flex items-center cursor-pointer gap-3">
          <i class='bx bx-arrow-back text-4xl cursor-pointer'></i>
          <span class='text-lg'>Back</span>
        </div>

        <h1 class="mb-3">
          Number of Columns
        </h1>

        <p class="mb-2 text-xs text-red-500">
          Drag column to page
        </p>

        <div class="grid grid-cols-3 grid-rows-4 gap-3">
          <p @dragstart="dragStart" :draggable="true" :data-id="1" class="column__sizes text-2xl p-3 cursor-move bg-gray-100 flex items-center justify-center border rounded-md border-gray-300 relative">
            1
            <!-- <i @dragstart="dragStart" draggable class='bx bx-move move text-white cursor-grab rounded-full w-5 h-5 flex justify-center items-center bg-red-600 text-sm' style=""></i> -->
          </p>
          <p @dragstart="dragStart" :draggable="true" :data-id="2" class="column__sizes text-2xl p-3 cursor-move bg-gray-100 flex items-center justify-center border rounded-md border-gray-300 relative">
            2
            <!-- <i @dragstart="dragStart" draggable class='bx bx-move move text-white cursor-grab rounded-full w-5 h-5 flex justify-center items-center bg-red-600 text-sm' style=""></i> -->
          </p>
          <p @dragstart="dragStart" :draggable="true" :data-id="3" class="column__sizes text-2xl p-3 cursor-move bg-gray-100 flex items-center justify-center border rounded-md border-gray-300 relative">
            3
            <!-- <i @dragstart="dragStart" draggable class='bx bx-move move text-white cursor-grab rounded-full w-5 h-5 flex justify-center items-center bg-red-600 text-sm' style=""></i> -->
          </p>
          <p @dragstart="dragStart" :draggable="true" :data-id="4" class="column__sizes text-2xl p-3 cursor-move bg-gray-100 flex items-center justify-center border rounded-md border-gray-300 relative">
            4
            <!-- <i @dragstart="dragStart" draggable class='bx bx-move move text-white cursor-grab rounded-full w-5 h-5 flex justify-center items-center bg-red-600 text-sm' style=""></i> -->
          </p>
        </div>
        

      </div>

    <!-- </div> -->

    
</template>
<script>
import { ref } from 'vue';

export default {
    // emits: ['draggable-column'],

    setup(props, context) {

      const draggable_column = ref(null);

      const hideModal = () => {
        document.getElementById("columsModalContent").style.width = "0%";
        document.getElementById("columsModalContent").classList.remove('px-5')      
      }

      const dragStart = (event) => {
        draggable_column.value = event.target
        context.emit('draggable-column', event.target)

        // Store the initial position of the dragged element
        event.dataTransfer.setData('text/plain', JSON.stringify({ x: event.clientX, y: event.clientY }));
        // event.dataTransfer.setData("text", ev.target.id);
      };

      const dragOver = (event) => {
        event.preventDefault(); 
      };
        
      const drop = (event) => {

      };

      return {
        draggable_column,
        
        hideModal,
        dragStart,
        dragOver,
        drop,

      }
    }
}
</script>
<style scoped>
    /* The Modal (background) */
.modal {
  display: none; 
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.1); /* Black w/ opacity */
}

/* Modal Content */
.columnmodal__content {
  /* height: 100%;
  width: 30%;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  overflow-x: hidden;
  transition: 0.5s; */


  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  overflow-x: hidden;
  transition: 0.5s;
}

i.move{
  position: absolute;
  top: -8px; 
  right: -8px;
}

.column__sizes:hover {
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
}


</style>