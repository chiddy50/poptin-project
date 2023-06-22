<template>
    
    <div id="updateColumsModalContent" 
        class="columnmodal__content style__component bg-gray-200">

        <div @click="hideModal('updateColumsModalContent')" class="my-5 flex items-center cursor-pointer gap-3">
          <i class='bx bx-arrow-back text-4xl cursor-pointer'></i>
          <span class='text-lg'>Back</span>
        </div>

        <h1 class="mb-3">
          Edit Number of Columns
        </h1>

        <p class="mb-2 text-xs text-red-500">
          Click to update columns
        </p>

        <div class="grid grid-cols-3 grid-rows-4 gap-3">
          <button @click="setColumnCount(1)" class="custom__shadow text-2xl p-3 cursor-pointer bg-gray-100 flex items-center justify-center border rounded-md border-gray-300 relative">
            1
            <!-- <i @dragstart="dragStart" draggable class='bx bx-move move text-white cursor-grab rounded-full w-5 h-5 flex justify-center items-center bg-red-600 text-sm' style=""></i> -->
          </button>
          <button @click="setColumnCount(2)" class="custom__shadow text-2xl p-3 cursor-pointer bg-gray-100 flex items-center justify-center border rounded-md border-gray-300 relative">
            2
            <!-- <i @dragstart="dragStart" draggable class='bx bx-move move text-white cursor-grab rounded-full w-5 h-5 flex justify-center items-center bg-red-600 text-sm' style=""></i> -->
          </button>
          <button @click="setColumnCount(3)" class="custom__shadow text-2xl p-3 cursor-pointer bg-gray-100 flex items-center justify-center border rounded-md border-gray-300 relative">
            3
            <!-- <i @dragstart="dragStart" draggable class='bx bx-move move text-white cursor-grab rounded-full w-5 h-5 flex justify-center items-center bg-red-600 text-sm' style=""></i> -->
          </button>
          <button @click="setColumnCount(4)" class="custom__shadow text-2xl p-3 cursor-pointer bg-gray-100 flex items-center justify-center border rounded-md border-gray-300 relative">
            4
            <!-- <i @dragstart="dragStart" draggable class='bx bx-move move text-white cursor-grab rounded-full w-5 h-5 flex justify-center items-center bg-red-600 text-sm' style=""></i> -->
          </button>
        </div>
        

    </div>
    
</template>
<script>
import { ref, watch } from 'vue';
import { generateRandomId, toggleHightlight, deleteRow, deleteColumn } from '@/helpers';

export default {
    props: ['row_to_update', 'column_to_update', 'dragOverColumn', 'dropInColumn'],
    data() {
        return {
            draggable_column: null,
        }
    },
    methods: {
        hideModal(id) {
            document.getElementById(id).style.width = "0%";
            document.getElementById(id).classList.remove('px-5')      
        },
        dragStart(event){
            
            this.draggable_column = event.target
            this.$emit('draggable-column', this.draggable_column)

            // Store the initial position of the dragged element
            event.dataTransfer.setData('text/plain', JSON.stringify({ x: event.clientX, y: event.clientY }));
        },
        dragOver(event){
            event.preventDefault(); 
        },
        drop(event) {
            
        },
        setColumnCount(count) {
            const parent_row = document.getElementById(this.row_to_update);

            let children = parent_row.querySelectorAll('.single__column')
            let add_column_btn = parent_row.querySelector('.add_column_btn')
     
            if (children && children.length) {                                
                for (const element of children) {
                    element.remove()
                }
            }
            if (add_column_btn) {                
                add_column_btn.remove()
            }

            parent_row.style.display = 'grid'
            parent_row.style.gridTemplateColumns = `repeat(${count}, 1fr)`
            parent_row.classList.remove('canvas__empty')

            if (!parent_row.querySelector('action__box')) {                
                let { action__box, newID } = this.buildControls('bottom-center', 'row', null);
                parent_row.append(action__box);
                parent_row.setAttribute('data-id', newID);
            }

            let add_count = 0
            for (let i = 0; i < count; i++) {
                
                const grid_column = document.createElement('div');
                grid_column.style.height = '100px';
                // grid_column.style.border = '1px solid #ddd';        
                grid_column.style.position = 'relative';        
                grid_column.style.display = 'flex';        
                grid_column.style.justifyContent = 'center'        
                grid_column.style.alignItems = 'center'        
                grid_column.className = 'single__column dashed__border dropable';
                grid_column.addEventListener('dragover', this.dragOverColumn)
                grid_column.addEventListener('drop', this.dropInColumn)
                
                let controls = this.buildControls('top-left', 'column', null);
                grid_column.setAttribute('data-id', controls.newID);
                grid_column.setAttribute('data-parent', true);
                grid_column.setAttribute('data-grid', count);
                grid_column.appendChild(controls.action__box);

                parent_row.appendChild(grid_column);
                add_count++
            }
        },    

        buildControls(position, type, id = null) {
            const action__box = document.createElement('div');
            action__box.className = 'action__box';
            if(type === 'row'){
                action__box.style.bottom = '-10px';
                action__box.style.left = 'calc(50% - 50px)';
            }
            if(type === 'canvas'){
                action__box.style.top = '-15px';
                action__box.style.right = '-15px';
            }
            if(type === 'column'){
                action__box.style.left = '0';
                action__box.style.top = '0';
            }            
            if(type === 'input'){
                action__box.style.right = '0';
                action__box.style.top = '0';
            }  
            if(type === 'star' || type === 'button' || type === 'text'){
                action__box.style.right = '-15px';
                action__box.style.top = '-15px';
            }

            let newID = id
            if(!newID){
                newID = generateRandomId()
            }

            
            // SELECT BUTTON
            const select_btn = document.createElement('button');
            select_btn.className = 'select text-white';
            select_btn.setAttribute('title', 'Select');
            select_btn.setAttribute('data-id', newID);
            select_btn.addEventListener('click', this.toggleHightlight)

            // SELECT BUTTON ICON
            const hand_icon = document.createElement('i');
            hand_icon.className = 'bx bxs-hand text-white';
            hand_icon.setAttribute('data-id', newID);

            select_btn.append(hand_icon) // add icon to btn


            // EDIT BUTTON
            const edit_btn = document.createElement('button');
            edit_btn.className = 'update';
            edit_btn.setAttribute('title', 'Edit');
            edit_btn.setAttribute('data-id', newID);

            edit_btn.addEventListener('click', (e) => {
                let event = e.target.matches('.update') ? e.target.parentElement.parentElement : e.target.parentElement.parentElement.parentElement;
                const dataId = event.getAttribute('data-id');

                if (type === 'button') {
                    this.$mit('trigger-button-to-update', dataId)
                }
                
                if (type === 'row' || type === 'column' || type === 'input' || type === 'star') {
                    this.$mit('trigger-element-to-update', dataId)                      
                    this.$emit('trigger-show-modal', 'style__component');
                }

                if (type == 'text') {
                    this.$mit('trigger-text-to-update', dataId)                                      
                } 
            })

            // EDIT BUTTON ICON
            const edit_icon = document.createElement('i');
            edit_icon.className = 'bx bxs-edit-alt text-white';
            edit_icon.setAttribute('data-id', newID);
            
            edit_btn.append(edit_icon) // add icon to btn

            if (type === 'row' || type === 'column' || type === 'input' || type === 'star' || type === 'button' || type === 'text') {
                
                // DELETE BUTTON
                const delete_btn = document.createElement('button');
                delete_btn.className = 'delete';
                delete_btn.setAttribute('title', 'Remove');
                delete_btn.setAttribute('data-id', newID);
    
                // DELETE BUTTON ICON
                const delete_icon = document.createElement('i');
                delete_icon.className = 'bx bx-trash text-white';
                delete_icon.setAttribute('data-id', newID);
                
                delete_btn.append(delete_icon) // add icon to btn  
                if (type === 'column') {                    
                    delete_btn.addEventListener('click', deleteColumn)
                }
                if (type === 'row') {                    
                    delete_btn.addEventListener('click', deleteRow)
                }
                if (type === 'input' || type === 'button' || type === 'star') {                    
                    delete_btn.addEventListener('click', deleteInput)
                }
                
                action__box.append(delete_btn)
            }

            if (type === 'row') {

                // ADD BUTTON
                const add_btn = document.createElement('button');
                add_btn.className = 'add';
                add_btn.setAttribute('title', 'Add column');
                add_btn.setAttribute('data-id', newID);
                // ADD BUTTON ICON
                const add_icon = document.createElement('i');
                add_icon.className = 'bx bx-plus text-white';
                add_icon.setAttribute('data-id', newID);
                
                add_btn.append(add_icon) // add icon to btn
                add_btn.addEventListener('click', () => {
                    this.$emit('trigger-show-column-modal', 'columsModalContent')
                })
                
                action__box.append(add_btn)
            }
            
            action__box.append(select_btn)
            action__box.append(edit_btn)

            return {action__box, newID};

        },

        toggleHightlight (e) {
            let event = e.target.matches('.select') ? e.target.parentElement.parentElement : e.target.parentElement.parentElement.parentElement;
            this.$emit('trigger-change-row-to-update', event)

            const dataId = e.target.getAttribute('data-id');
            const parent = document.querySelector(`[data-id="${dataId}"][data-parent="true"]`)
            parent.classList.toggle('dashed__border');
        }
    },


    mounted(){
    },

    watch: {
        row_to_update(val, old){

        }
    }

}
</script>
<style scoped>

/* Modal Content */
.columnmodal__content {
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


</style>