<template>
    
    <!-- The Modal -->
    <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
        </div>

    </div>

    <!-- <div id="columsModal" 
        class="sidenav bg-gray-200">

        <h2 class="text-gray-500 text-2xl py-4 border-b border-gray-400 font-bold">Poptin Editor</h2>

        <div class="py-5 border-gray-300 border-t flex flex-col gap-3">
          <button draggable="true" class="outline-none rounded-xl py-2 px-4 text-xs bg-green-500 text-white">
            Save
          </button>
          <button draggable="true" class="outline-none rounded-xl py-2 px-4 text-xs bg-blue-500 text-white">
            Preview
          </button>
        </div>
        

      </div> -->
</template>
<script>
export default {
    
}
</script>
<style>
    /* The Modal (background) */
.modal {
  /* display: none;  */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>