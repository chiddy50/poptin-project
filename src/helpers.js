export const generateRandomId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    let randomId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters[randomIndex];
    }
    return randomId;
}


export const toggleHightlight = (e) => {
    const dataId = e.target.getAttribute('data-id');
    document.querySelector(`[data-id="${dataId}"][data-parent="true"]`).classList.toggle('dashed__border');
}

export const deleteRow = (e) => {
    let id = e.target.getAttribute('data-id')
    document.querySelector(`[data-id="${id}"][data-parent="true"]`).remove();
}


export const deleteColumn = (e) => {
    let id = e.target.getAttribute('data-id')
    const column = document.querySelector(`[data-id="${id}"][data-parent="true"]`);
    
    let grid_count = column.getAttribute('data-grid');
    let row = column.parentElement

    let new_grid_count = parseInt(grid_count) - 1;
    if (new_grid_count < 1) {
        // row.remove();
        row.style.display = 'flex'
        row.style.gridTemplateColumns = 'none'
        // return;
    }
    
    let children = row.querySelectorAll('.single__column')
    for (const child of children) {
        child.setAttribute('data-grid', new_grid_count);
    }

    row.style.gridTemplateColumns = `repeat(${new_grid_count}, 1fr)`;    
    
    column.remove()
}

export const deleteElement = (e) => {
    let id = e.target.getAttribute('data-id')
    const input__container = document.querySelector(`[data-id="${id}"][data-parent="true"]`);
    input__container.remove()
}

export const toggleTextEdit = (e) => {
    let id = e.target.getAttribute('data-id')
    const text = document.querySelector(`[data-id="${id}"][data-parent="true"]`);

    // let contenteditable = e.target.getAttribute('contenteditable')

    var isEditable = text.getAttribute('contenteditable') === 'false';

    console.log(isEditable);
    if (isEditable) {        
        text.setAttribute('contenteditable', true);
    }else{
        text.setAttribute('contenteditable', false);
    }
}

export const deleteStar = (e) => {
    let id = e.target.getAttribute('data-id')
    const input__container = document.querySelector(`[data-id="${id}"][data-parent="true"]`);
    input__container.remove()
}

export const parseValueWithSign = (str) => {
    const regex = /^(\d+)(%|px)$/;
    const match = regex.exec(str);

    if (match) {
        const value = parseInt(match[1]);
        const sign = match[2];
        return { value, sign };
    }

    return null; // Return null if the string doesn't match the expected format
}

export const dragInputToBoxElement = (target, input) => {
    if (target.style.alignItems === 'center') {
        return
    }
    target.style.display = 'flex'
    target.style.alignItems = 'center'
    target.style.justifyContent = 'center'
    target.append(input)  
}

export const dragStarToBox = (target, star) => {
    target.style.display = 'flex'
    target.style.alignItems = 'center'
    target.style.justifyContent = 'center'
    target.append(star)  
}

export const dragButtonToBox = (target, button) => {
    target.style.display = 'flex'
    target.style.alignItems = 'center'
    target.style.justifyContent = 'center'
    target.append(button)  
}

export const dragTextToBox = (target, text) => {
    target.style.display = 'flex'
    target.style.alignItems = 'center'
    target.style.justifyContent = 'center'
    target.append(text)  
}

export const dragOverColumn = (e) => {
    e.preventDefault(); 
}

export const dropInColumn = (e) => {
    if (!e.target.matches('.single__column')) {        
        return;
    }
}

export const dragoverCanvas = (event) => {
    event.preventDefault()
}
export const convertRGBtoHex = (colorValue) => {
    // Regular expression pattern to match the RGB color value
  var rgbPattern = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;

  // Check if the input matches the RGB color pattern
  var rgbMatch = rgbPattern.exec(colorValue);
  if (rgbMatch) {
    // Extract the color values from the matched groups
    var red = parseInt(rgbMatch[1]);
    var green = parseInt(rgbMatch[2]);
    var blue = parseInt(rgbMatch[3]);

    // Convert the RGB values to hexadecimal format
    var hexValue = '#' +
      red.toString(16).padStart(2, '0') +
      green.toString(16).padStart(2, '0') +
      blue.toString(16).padStart(2, '0');

    return hexValue;
  }

  // Check if the input is already a valid hex color value
  var hexPattern = /^#([0-9A-Fa-f]{3}){1,2}$/;
  if (hexPattern.test(colorValue)) {
    return colorValue;
  }

  // Invalid color value
  return null;
}
  

export const buildControls = (position, type, id = null) => {
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
    edit_btn.addEventListener('click', showStyleComponent)

    // EDIT BUTTON ICON
    const edit_icon = document.createElement('i');
    edit_icon.className = 'bx bxs-edit-alt text-white';
    edit_icon.setAttribute('data-id', newID);
          
    edit_btn.append(edit_icon) // add icon to btn

    if (type === 'row' || type === 'column') {
        
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
        
        action__box.append(add_btn)
    }

    action__box.append(select_btn)
    action__box.append(edit_btn)

    return {action__box, newID};
}