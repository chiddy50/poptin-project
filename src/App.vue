<template>
    
  <div class="main overflow-x-hidden">
    <div class="flex">
      
      <CanvasComponent 
      @trigger-highlight="hightlightElement" 
      @trigger-open-columns-modal="setRowToAddColumn"
      @trigger-hide-modals="hideColumnModal"

      :dragged_element="dragged_element"
      :dragged_type="dragged_type"
      @trigger-element-to-update="setElementToUpdate"
      @trigger-button-to-update="setButtonToUpdate"
      @trigger-show-column-modal="showSideModal"
      />

      <Tools @trigger-text-drag="buildTextToDrag"/>

    </div>

    
      <i @click="toggleMenu"
      class='bx bx-menu cursor-pointer bg-blue-500 text-white text-4xl p-2 items-center justify-center absolute menu__control'></i>

    
  </div>

  <StyleComponent :element_to_update="element_to_update"/>
  <CustomizeButtonModal 
  :button_to_update="button_to_update"
  @trigger-hide-modals="hideColumnModal"
  
  /> 
  <ColumnsModal @draggable-column="setDraggableColumn" />

  <UpdateColumn 
  :column_to_update="column_to_update" 
  :row_to_update="row_to_update" 
  :dragOverColumn="dragOverColumn" 
  :dropInColumn="dropInColumn"
  @trigger-change-row-to-update="changeRowToUpdate"
  @trigger-element-to-update="setElementToUpdate"
  @trigger-show-modal="showSideModal"
  />
</template>

<script>
import { ref, watch, reactive } from 'vue';
import ColumnsModal from './components/ColumnsModal.vue'
import UpdateColumn from './components/UpdateColumn.vue'
import CanvasComponent from './components/CanvasComponent.vue'
import Tools from './components/Tools.vue'
import StyleComponent from './components/StyleComponent.vue'
import CustomizeButtonModal from './components/CustomizeButtonModal.vue'

export default {
  name: 'App',
  components: {
    ColumnsModal,
    CanvasComponent,
    UpdateColumn,
    Tools,
    StyleComponent,
    CustomizeButtonModal
  },

  setup() {
   
    const draggable = ref(null);
    const dragged_element = ref(null);
    const dragged_type = ref(null);
    const column_to_update = ref(null);
    const element_to_update = ref(null);
    const row_to_update = ref(null);
    const button_to_update = ref(null);
    
    const canvasContainer = reactive([{}]);

    const toggleMenu = () => {      
      const tools = document.getElementById('tools')
      const cssObj = window.getComputedStyle(tools, null);

      if (cssObj.display === 'none') {
        console.log(cssObj.display);
        tools.style.display = 'grid';
      }else{
        tools.style.display = 'none';
      }
    }
    const setDraggableColumn = (val) => {
      dragged_element.value = val
    }

    const hightlightElement = (e) => {
      if (!e.target.matches('.parent__row')) {
        return
      }

      for (const element of document.querySelectorAll('.add__element')) {
        element.style.display = 'none';
      }

      const addElementControls = e.target.querySelectorAll('.add__element'); // Search for a child with a specific class
      for (const element of addElementControls) {
        element.style.display = 'flex';
      }
    }

    const removeHighlight = (e) => {
      if (!e.target.matches('.parent__row')) {
        return
      }

      for (const element of document.querySelectorAll('.add__element')) {
        element.style.display = 'none';
      }
    }

    const buildTextToDrag = (e) => {

    }

    const setRowToAddColumn = (event) => { 
      row_to_update.value = event.target.getAttribute('data-id')
      showSideModal('updateColumsModalContent')
    }

    const dragStart = (event) => {
      draggable.value = event.target.parentElement
      // Store the initial position of the dragged element
      event.dataTransfer.setData('text/plain', JSON.stringify({ x: event.clientX, y: event.clientY }));
    };

    const dragOverColumn = (e) => {
      event.preventDefault(); 
    }

    const dropInColumn = (e) => {
      if (!e.target.matches('.single__column')) {        
        return;
      }
    }

    const buildColumnElement = (number_of_columns, parentElement) => {
      
      // const grid_container = document.createElement('div');
      parentElement.style.display = 'grid';
      parentElement.style.gridTemplateColumns = `repeat(${number_of_columns}, 1fr)`;
      
      for (let i = 0; i < number_of_columns; i++) {
        const grid_column = document.createElement('div');
        grid_column.style.height = '100px';
        grid_column.style.border = '1px solid #ddd';        
        grid_column.className = 'single__column';
        grid_column.id = generateRandomId();
        grid_column.addEventListener('dragover', dragOverColumn)
        grid_column.addEventListener('drop', dropInColumn)
        
        parentElement.appendChild(grid_column);
      }

    }

    const generateRandomId = () => {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const length = 8;
      let randomId = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters[randomIndex];
      }
      return randomId;
    }
    

    const showSideModal = (id) => {      
      hideColumnModal()
      console.log('Open modal for '+id);
      console.log(document.getElementById(id));
      document.getElementById(id).style.width = "30%";
      document.getElementById(id).classList.add('px-5')
    };

    const hideColumnModal = () => {
      let modals = document.getElementsByClassName("style__component")
      if (modals.length > 0) {
        for (const modal of modals) {
          modal.style.width = "0%";
          modal.classList.remove('px-5');      
        }
      }
    }

    const setElementToUpdate = (id) => {
      const element = document.querySelector(`[data-id="${id}"][data-parent="true"]`);
      element_to_update.value = id;
      showSideModal('style__component')
    }

    const setButtonToUpdate = (id) => {
      const button = document.querySelector(`[data-id="${id}"][data-parent="true"]`);
      button_to_update.value = id;
      showSideModal('btn__style__component')
    }


    const changeRowToUpdate = (event) => {

    }
    

    return {
      
      canvasContainer,
      draggable,
      dragged_element,
      dragged_type,
      column_to_update,
      element_to_update,
      button_to_update,
      row_to_update,
      hideColumnModal,

      changeRowToUpdate,

      hightlightElement,
      removeHighlight,
      dragStart,
      showSideModal,

      setElementToUpdate,
      setButtonToUpdate,

      dragOverColumn,
      dropInColumn,
      buildTextToDrag,
      toggleMenu,

      setDraggableColumn,
      generateRandomId,
      setRowToAddColumn
    };
  },
  

  mounted() {

    window.onclick = function(event) { 
      // if (!event.target.matches('.parent__row') && !event.target.matches('.add__element')) {
      //   const addElementControls = document.querySelectorAll('.add__element'); // Search for a child with a specific class
      //   for (const element of addElementControls) {
      //     element.style.display = 'none';
      //   }
      // }
    }
  },
};
</script>

<style >

</style>
