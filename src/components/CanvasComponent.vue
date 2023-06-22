<template>
    <div id="canvas__container" 
    class="
    col-span-8 
    min-h-screen 
    bg-gray-400 
    p-10 
    relative
    ">

        <div @dragover="dragoverCanvas" 
            @drop="emitCanvasDrop" 
            id="canvas" 
            class="relative canvas" 
            style="width: 100%; background-color: #fff; height: 100%;" 
            :data-id="'canvas'" 
            :data-parent="true" 
        >

        </div>

    </div>
</template>
<script>
import { ref, watch, reactive, onMounted } from 'vue';
import {
    generateRandomId, toggleHightlight,
    deleteRow, deleteColumn, deleteElement, deleteStar,
    dragInputToBoxElement, dragoverCanvas, 
    dragStarToBox, dragOverColumn, dropInColumn,
    dragButtonToBox, dragTextToBox, toggleTextEdit
} from '@/helpers';

export default {
    props:['dragged_element', 'dragged_type'],

    setup(props, context) {

        const emitCanvasDrop = (event) => {
            event.preventDefault();

            let transferredData = event.dataTransfer.getData('text/plain');
            
            // Dont add a box element to empty canvas
            if (transferredData === 'box' && event.target.matches('.canvas__empty')){
                return
            }

            // DROP INPUT ELEMENT
            if(transferredData === 'input'){
                if (!event.target.matches('.single__column') && !event.target.matches('.box__element')) {
                    return;    
                }

                const input = buildInputToDrag()
                if (event.target.matches('.single__column')) {
                    event.target.append(input)                    
                }
                if (event.target.matches('.box__element')) {
                    dragInputToBoxElement(event.target, input)                  
                }
            }            

            let target = null
            if (event.target.matches('.canvas__empty')) { 
                event.target.remove();
                target = document.getElementById('canvas')
            }else{
                target = event.target
            }

            // DROP COLUMN
            if (transferredData === 'column') { 

                if (target.matches('.canvas')) {
                    let number_of_columns = props.dragged_element.getAttribute('data-id')
                    buildColumnElement(number_of_columns, target)       
                }

                if (target.matches('.single__column')) {
                    // let number_of_columns = props.dragged_element.getAttribute('data-id')
                    // buildColumnElement(number_of_columns, target)       
                }

                if (target.matches('.single__row')) {
                    let number_of_columns = props.dragged_element.getAttribute('data-id')
                    buildColumnElement(number_of_columns, target)       
                }
            }

            // DROP ROW
            if (transferredData === 'row') { 
                addRowToCanvas()
                context.emit('trigger-hide-modals')
            }

            // DROP BOX ELEMENT
            if (transferredData === 'box') {
                if (event.target.matches('.single__row')) {
                                        
                    if (event.target.querySelector('.box__element')) {
                        return
                    }

                    addBoxToCanvas(target)
                }
                if (event.target.matches('.box__element')) {
                    if (event.target.querySelector('.box__element')) {
                        return
                    }
                    addBoxToCanvas(target)
                }                
            }

            // DROP STAR ELEMENT
            if (transferredData === 'star') {
                const star = buildStarToDrag()

                if (event.target.matches('.box__element')) {
                    dragStarToBox(event.target, star)
                }    
            }

            // DROP BUTTON ELEMENT
            if (transferredData === 'button') {
                const button = buildButtonToDrag()
                if (event.target.matches('.box__element')) {
                    dragButtonToBox(event.target, button)                
                }
            }

            if (transferredData === 'text') {
                const text = buildTextToDrag()
                if (event.target.matches('.box__element') || event.target.matches('.single__column') || event.target.matches('.single__row')) {
                    dragTextToBox(event.target, text)                
                }
            }

        }

        const buildTextToDrag = () => { 
            
            // TEXT 
            const text = document.createElement('p');
            text.className = 'text__element dashed__border relative'
            text.style.fontSize = '19px'
            text.style.color = '#000000'
            text.style.width = '50%' 
            text.setAttribute('data-parent', true);
            text.setAttribute('data-text', true);
            text.setAttribute('contenteditable', false);
            
            // TEXT NODE
            const text_node = document.createTextNode('Enter text here')
            
            let { action__box, newID } = buildControls('top-right', 'text', null);
            text.id = newID;
            text.setAttribute('data-id', newID);
            
            text.append(action__box);                        
            text.append(text_node)      
            
            return text
        }
        
        const buildButtonToDrag = () => {
            const button = document.createElement('button');
            button.className = 'button__element dashed__border relative'
            button.style.background = '#000000'
            button.style.borderColor = '#ffffff'
            button.style.color = '#ffffff'
            button.style.padding = '14px'
            button.style.borderRadius = '10px'
            button.style.height = '50px'
            button.style.width = '50%'
            button.style.fontSize = '12px'


            let { action__box, newID } = buildControls('top-right', 'button', null);
            button.id = newID;
            button.setAttribute('data-parent', true);
            button.setAttribute('data-id', newID);
            button.append(action__box);

            const button_text = document.createTextNode('Default text')
            button.append(button_text)
            return button 
        }

        const buildStarToDrag = () => {
            const star_container = document.createElement('div');
            star_container.className = 'star__element dashed__border relative';
            star_container.style.display = 'flex' 
            star_container.style.justifyContent = 'flex' 
            star_container.style.alignItems = 'center' 

            let { action__box, newID } = buildControls('top-right', 'star', null);
            star_container.id = newID;
            star_container.setAttribute('data-parent', true);
            star_container.setAttribute('data-id', newID);
            star_container.append(action__box);

            const star = document.createElement('i');
            star.className = 'bx bxs-star text-4xl'
            star_container.append(star)

            return star_container
        }

        const buildInputToDrag = () => {
            const input_container = document.createElement('div');
            input_container.style.border = '1px solid #ccc' 
            input_container.style.width = '100%' 
            input_container.style.height = '50px'

            let { action__box, newID } = buildControls('bottom-center', 'input', null);
            input_container.id = newID;
            input_container.setAttribute('data-parent', true);
            input_container.setAttribute('data-id', newID);
            input_container.append(action__box);

            const input = document.createElement('input');
            input.setAttribute('type', 'text');``
            input.style.paddingTop = '5px' 
            input.style.paddingBottom = '5px' 
            input.style.paddingLeft = '10px' 
            input.style.paddingRight = '10px' 
            input.style.outline = 'none' 
            input.style.border = 'none' 
            input.style.width = '100%' 
            input.style.height = '100%' 
            input.setAttribute('data-id', newID);

            input_container.append(input)
            return input_container 
        }

        const buildColumnElement = (number_of_columns, parentElement) => {
            
            // BUILD ROW
            if (parentElement.matches('.canvas')) {
                const grid_row = document.createElement('div')
                grid_row.style.display = 'grid';
                grid_row.className = 'single__row dropable';
                grid_row.style.gridTemplateColumns = `repeat(${number_of_columns}, 1fr)`;
                grid_row.style.height = 'max-content';
                grid_row.style.marginLeft = 'auto';
                grid_row.style.marginRight = 'auto';
                grid_row.style.position = 'relative';
                grid_row.id = generateRandomId();
                grid_row.setAttribute('data-parent', true);

                // ADD CONTROLS
                let { action__box, newID } = buildControls('bottom-center', 'row', null);
                grid_row.setAttribute('data-id', newID);
                grid_row.append(action__box);
            }else{
                parentElement.style.display = 'grid';
                parentElement.style.gridTemplateColumns = `repeat(${number_of_columns}, 1fr)`;
                parentElement.className = 'single__row dropable';
            }

            
            // BUILD COLUMNS
            for (let i = 0; i < number_of_columns; i++) {
                const grid_column = document.createElement('div');
                grid_column.style.height = '100%';
                // grid_column.style.border = '1px solid #ddd';    
                grid_column.style.justifyContent = 'center';    
                grid_column.style.alignItems = 'center';    
                grid_column.className = 'single__column relative dropable flex dashed__border';
                grid_column.id = generateRandomId();
                grid_column.setAttribute('data-parent', true);
                grid_column.setAttribute('data-grid', number_of_columns);
                
                grid_column.addEventListener('dragover', dragOverColumn)
                grid_column.addEventListener('drop', dropInColumn)

                let { action__box, newID } = buildControls('top-left', 'column', null);
                grid_column.setAttribute('data-id', newID);
                grid_column.append(action__box);
                
                if (parentElement.matches('.canvas')) {
                    grid_row.appendChild(grid_column);
                }else{
                    parentElement.appendChild(grid_column);
                }
            }

            if (parentElement.matches('.canvas')) {
                parentElement.appendChild(grid_row); // APPEND TO CANVAS
            }
            context.emit('trigger-hide-modals')
        }

        const buildRowElement = (event) => {
            const class_to_delete = event.target.getAttribute('data-delete');
            document.querySelector(`.${class_to_delete}`).remove();
            
            const row_element = document.createElement('div');
            row_element.className = 'dashed__border'
            row_element.style.height = '100px';
            row_element.style.width = '100%';
            row_element.style.position = 'relative';
            row_element.setAttribute('data-parent', true);
            
            const {action__box, newID} = buildControls('top-left', 'row', null);
            row_element.setAttribute('data-id', newID);
            row_element.append(action__box);

            document.getElementById('canvas').append(row_element);
        }

        const emitHighlight = (event) => {
            context.emit('trigger-highlight', event)
        }

        const toggleHightlight = (e) => {
            const dataId = e.target.getAttribute('data-id');
            document.querySelector(`[data-id="${dataId}"][data-parent="true"]`).classList.toggle('dashed__border');
        }

        const buildPlaceholders = () => {
            // const placeholder = document.createElement('div');
            // placeholder.className = 'canvas__empty';
            const id = generateRandomId()
            const placeholder = document.createElement('div');
            placeholder.className = 'canvas__empty single__row dropable';
            placeholder.style.marginLeft = 'auto';
            placeholder.style.marginRight = 'auto';
            placeholder.style.height = '100px';
            placeholder.style.position = 'relative';
            placeholder.id = id;
            placeholder.setAttribute('data-parent', true);
            placeholder.setAttribute('data-id', id);


            const add_row_btn = document.createElement('button');
            add_row_btn.className = 'px-4 p-1 rounded bg-blue-400 text-white add_row_btn';
            add_row_btn.setAttribute('data-delete', 'canvas__empty');
            add_row_btn.id = id
            add_row_btn.setAttribute('data-id', id);

            const add_row_btn_text_content = document.createTextNode('Add Row')
            add_row_btn.append(add_row_btn_text_content)

            add_row_btn.addEventListener('click', (event) => {
                addRowToCanvas()              
            })

            placeholder.append(add_row_btn)            

            const {action__box} = buildControls('top-right', 'canvas', 'canvas');

            document.getElementById('canvas').append(placeholder);
            document.getElementById('canvas').append(action__box);
        }

        const addRowToCanvas = () => {
            if (document.querySelector('.canvas__empty')) {
                document.querySelector('.canvas__empty').remove();                
            }

            // BUILD ROW
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.className = 'single__row dropable dashed__border';
            row.style.width = '100%';
            row.style.height = '100px';
            row.style.marginLeft = 'auto';
            row.style.marginRight = 'auto';
            row.style.position = 'relative';
            row.id = generateRandomId();
            row.setAttribute('data-parent', true);
            let { action__box, newID } = buildControls('bottom-center', 'row', null);
            row.setAttribute('data-id', newID);
            row.append(action__box);

            document.getElementById('canvas').append(row)
        }

        const addBoxToCanvas = (target) => {
            if (document.querySelector('.canvas__empty')) {
                return
            }

            const box = document.createElement('div')
            box.className = 'box__element relative dashed__border';
            box.style.paddingTop = '10px' 
            box.style.paddingBottom = '10px' 
            box.style.paddingLeft = '10px' 
            box.style.paddingRight = '10px'
            box.style.width = '100%';
            box.style.height = '100%';

            box.setAttribute('data-parent', true);

            // ADD CONTROLS
            let { action__box, newID } = buildControls('top-left', 'column', null);
            box.setAttribute('data-id', newID);
            box.append(action__box);
            
            target.style.padding = '10px';
            target.style.justifyContent = 'normal'
            if (target.matches('.box__element')) {
                // target.style.height = 'max-content';
                target.style.display = 'flex';
            }

            target.append(box)
        }

        const buildControls = (position, type, id = null) => {
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
            select_btn.addEventListener('click', toggleHightlight)

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
                
                if (type === 'button' || type == 'text') {
                    context.emit('trigger-button-to-update', dataId)
                }
                
                if (type === 'row' || type === 'column' || type === 'input' || type === 'star') {
                    context.emit('trigger-element-to-update', dataId)                      
                }

            })

            // EDIT BUTTON ICON
            const edit_icon = document.createElement('i');
            edit_icon.className = 'bx bxs-edit-alt text-white';
            edit_icon.setAttribute('data-id', newID);
            
            edit_btn.append(edit_icon) // add icon to btn

            if (type === 'row' || type === 'column' || type === 'input' || type === 'star'|| type === 'text'  || type === 'button') {
                
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
                if (type === 'input' || type === 'button' || type === 'star' || type === 'text') {                    
                    delete_btn.addEventListener('click', deleteElement)
                }
                
                action__box.append(delete_btn)
            }

            if (type === 'row') {

                // ADD BUTTON
                const add_btn = document.createElement('button');
                add_btn.className = 'add';
                add_btn.setAttribute('title', 'Add/Remove Column');
                add_btn.setAttribute('data-id', newID);
                // ADD BUTTON ICON
                const add_icon = document.createElement('i');
                add_icon.className = 'bx bx-plus text-white';
                add_icon.setAttribute('data-id', newID);
                
                add_btn.append(add_icon) // add icon to btn
                add_btn.addEventListener('click', () => {
                    context.emit('trigger-show-column-modal', 'columsModalContent')
                })
                
                action__box.append(add_btn)
            }
            
            action__box.append(select_btn)
            action__box.append(edit_btn)

            return {action__box, newID};
        }

        onMounted(() => {
            const canvas = document.getElementById('canvas');
            if (canvas.children.length < 1) {
                buildPlaceholders()
            }
        });


        return {
            emitCanvasDrop,
            dragoverCanvas,

            emitHighlight,

            toggleHightlight,
            buildPlaceholders,
            buildRowElement,
            buildControls,
            // showStyleComponent,

            buildColumnElement,
            addRowToCanvas,
            addBoxToCanvas
        }

    },


}
</script>
<style>
   
</style>