<template>
  <div class="main overflow-x-hidden">
    <div class="grid grid-cols-6">
      <div  
      class=" col-span-1 bg-gray-200 min-h-screen px-3">

        <h2 class="text-gray-500 text-2xl py-4 border-b border-gray-400 font-bold">Poptin Editor</h2>
        
        <!-- HEIGHT CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
          <div class="text-xs grid grid-cols-4 items-center mb-1">
            <p class=" col-span-1">Height</p>
            <input type="number" v-model="height" @keyup="handleHeightChange" class="px-2 py-1 rounded-md col-span-1">
            <div class="ml-2 flex col-span-2 gap-3">
              <div class="flex items-center justify-center">
                <label>%</label>
                <input type="radio" v-model="height_val" name="height_val" value="%">
              </div>
              <div class="flex items-center">
                <span>px</span>
                <input type="radio" v-model="height_val" name="height_val"  value="px">
              </div>
            </div>
          </div>
          <input v-if="height_val === '%'" type="range" id="height" v-model="height" @input="handleHeightChange" min="0" max="100">
        </div>

        <!-- WIDTH CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
          <div class="text-xs grid grid-cols-4 items-center mb-1">
            <p class=" col-span-1">Width</p>
            <input type="number" v-model="width" @keyup="handleWidthChange" class="px-2 py-1 rounded-md col-span-1">
            <div class="ml-2 flex col-span-2 gap-3">
              <div class="flex items-center justify-center">
                <label>%</label>
                <input type="radio" v-model="width_val" name="width_val" value="%">
              </div>
              <div class="flex items-center">
                <label class="flex items-center">px</label>
                <input type="radio" v-model="width_val" name="width_val" value="px">
              </div>
            </div>
          </div>
          <input type="range" id="width" v-if="width_val === '%'" v-model="width" @input="handleWidthChange" min="0" max="100">
        </div>

        <!-- BORDER-RADIUS CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
          <p class="text-xs">Border Radius - {{ border_radius }}%</p>
          <input type="range" id="border_radius" v-model="border_radius" @input="handleBorderRadiusChange" min="0" max="100">
        </div>

        <div class="mt-4">
          <p class="text-xs">Background</p>
          <input type="color" v-model="background" id="" class="w-full">
        </div>

        <div class="flex flex-wrap gap-3 my-5">
          <button draggable="true" class="outline-none rounded-xl py-2 px-4 text-xs bg-black text-white">
            Add Star
          </button>
          <button draggable="true" class="outline-none rounded-xl py-2 px-4 text-xs bg-black text-white">
            Add Text
          </button>
          <button draggable="true" class="outline-none rounded-xl py-2 px-4 text-xs bg-black text-white">
            Add Button
          </button>
          <button draggable="true" class="outline-none rounded-xl py-2 px-4 text-xs bg-black text-white">
            Add Image
          </button>
        </div>

        <div class="py-5 border-gray-300 border-t flex flex-col gap-3">
          <button draggable="true" class="outline-none rounded-xl py-2 px-4 text-xs bg-green-500 text-white">
            Save
          </button>
          <button draggable="true" class="outline-none rounded-xl py-2 px-4 text-xs bg-blue-500 text-white">
            Preview
          </button>
        </div>
        

      </div>
      
      <div
      id="canvas__container" 
      class="col-span-5 min-h-screen p-4 relative">
        
      <div @dragover="dragOver" @drop="drop" 
      id="drop__area" 
      style="top:0;left:0;position:absolute; border-bottom-right-radius: 30%;display: none;" 
      class="bg-red-200 pl-2 pr-5 py-5">
        <i class='bx bx-trash text-6xl'></i>
        <p class="text-xs">Drag here to remove</p>
      </div>
      <!-- @mousedown="dragMouseDown"  -->
      <div 
        id="canvas_box" class="canvas_box mx-auto p-4" 
          style="width: 500px; height: 500px; border-radius: 50%; background:  #ff6464;position: absolute;
          top: 50%; left: 50%; transform: translate(-50%, -50%);">
          <div class="h-full w-full border-2 border-white relative" style="border-radius: 50%;">
            
            <div draggable @mouseleave="unhightlight" @mouseover="hightlight" @dragstart="dragStart" class="flex cursor-grab justify-center mt-5">
              <i class='bx bxs-star text-4xl text-red-800' style=""></i>
              <i class='bx bxs-star text-4xl text-red-800' style=""></i>
              <i class='bx bxs-star text-4xl text-red-800' style=""></i>
            </div>

            <div draggable @mouseleave="unhightlight" @mouseover="hightlight" @dragstart="dragStart" class="mt-10 cursor-grab mx-auto w-4/6">
              <h2 class="text-white font-bold text-xl text-center">
                All the text and elements in this popup should be editable and dragable
              </h2>
            </div>
            
            <div draggable @mouseleave="unhightlight" @mouseover="hightlight" @dragstart="dragStart" class="mt-4 cursor-grab mx-auto w-4/6">
              <input type="text" placeholder="Email" class="w-full mt-4 rounded-lg py-2 px-4">
            </div>

            <div draggable @mouseleave="unhightlight" @mouseover="hightlight" @dragstart="dragStart" class="mt-4 cursor-grab mx-auto w-4/6">
              <button class="mt-4 bg-black w-full text-white px-5 py-3 text-xl font-bold rounded-lg">
                  SIGN UP NOW
              </button>
            </div>

            <div draggable @mouseleave="unhightlight" @mouseover="hightlight" @dragstart="dragStart" class="mt-2 cursor-grab mx-auto w-4/6">
              <p class="text-center text-sm text-white">
                No credit card required. No surprises
              </p>
            </div>

          </div>

        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
import { ref, watch, reactive } from 'vue';
import Template from './components/Template.vue'
import Star from './components/Star.vue'

export default {
  components: {
    Template
  },
  setup() {
    const border_radius = ref(50);
    const height = ref(500);
    const width = ref(500);
    const width_val = ref('px');
    const height_val = ref('px');
    const background = ref('#ff6464');
    const popupItems = reactive([]);
    const position = reactive({ x: 0, y: 0 });
    const draggable = ref(null);

    


    const topPosition = ref(0);
    const leftPosition = ref(0);
    const pos1 = ref(0);
    const pos2 = ref(0);
    const pos3 = ref(0);
    const pos4 = ref(0);
  
    const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos3.value = e.clientX;
      pos4.value = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };
  
    const elementDrag = (e) => {
      const canvas_box = document.getElementById('canvas_box');

      e = e || window.event;
      e.preventDefault();
      pos1.value = pos3.value - e.clientX;
      pos2.value = pos4.value - e.clientY;
      pos3.value = e.clientX;
      pos4.value = e.clientY;
      leftPosition.value = canvas_box.offsetLeft - pos1.value + 'px';
      topPosition.value = canvas_box.offsetTop - pos2.value + 'px';

      canvas_box.style.position = 'absolute';
      canvas_box.style.top = topPosition.value;
      canvas_box.style.left = leftPosition.value;
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };





    const handleHeightChange = () => {
      const canvas_box = document.getElementById('canvas_box');
      if (height_val.value === '%' && height_val.value > 100) {
        height_val.value = 100
      }
      canvas_box.style.height = height.value + (height_val.value === '%' ? '%' : 'px');
    };

    const handleWidthChange = () => {
      const canvas_box = document.getElementById('canvas_box');
      if (width_val.value === '%' && width_val.value > 100) {
        width_val.value = 100
      }
      canvas_box.style.width = width.value + (width_val.value === '%' ? '%' : 'px');
    };

    const handleBorderRadiusChange = () => {
      const canvas_box = document.getElementById('canvas_box');
      canvas_box.style.borderRadius = border_radius.value +'%';
    };

    const createCanvas = () => {
      const canvas__container = document.getElementById('canvas__container');

      // Create canvas-box 
      const canvas_box = document.createElement('div');
      canvas_box.className = 'draggable border border-gray-300';
      canvas_box.style.top = topPosition.value;
      canvas_box.style.left = leftPosition.value;
      canvas_box.style.height = '100%';
      canvas_box.style.width = '100%';
      canvas_box.id = 'canvas_box';      
      
      // Create canvas
      const canvas = document.createElement('div');
      canvas.style.height = '100%';
      canvas.style.width = '100%';
      canvas.id = 'canvas';
            
      canvas.addEventListener('mousedown', dragMouseDown)
      
      canvas_box.appendChild(canvas)
      
      canvas__container.appendChild(canvas_box)

    }

    const hightlight = (e) => {
      let element = !e.target.draggable ? e.target.parentElement : e.target
      element.style.border = '1px dashed';        
    }

    const unhightlight = (e) => {
      e.target.style.border = 'none';
    }

    const watchWidth = (value, initialWidth) => {
      if (value === '%' && initialWidth > 100) {
        width.value = 100;
        handleWidthChange()
      }
    }

    const watchHeight = (value, initialHeight) => {
      if (value === '%' && initialHeight > 100) {
        height.value = 100;
        handleHeightChange()
      }
    }

    const dragStart = (event) => {
      draggable.value = event
      console.log(draggable.value.target);
      document.getElementById('drop__area').style.display = 'block'

      // Store the initial position of the dragged element
      event.dataTransfer.setData('text/plain', JSON.stringify({ x: event.clientX, y: event.clientY }));
    };
    const dragOver = (event) => {
      // Prevent default behavior to enable dropping
      event.preventDefault();

    };
      
    const drop = (event) => {
      console.log(draggable.value.target.id);
      // document.getElementById(draggable.value.id).remove()
      draggable.value.target.remove()
      document.getElementById('drop__area').style.display = 'none'
    };

    watch(width, (newValue, oldValue) => {
      watchWidth(width_val.value, newValue)
    });

    watch(height, (newValue, oldValue) => {
      watchHeight(height_val.value, newValue)
    });

    watch(width_val, (newValue, oldValue) => {
      watchWidth(newValue, width.value)
    });
    
    watch(height_val, (newValue, oldValue) => {
      watchHeight(newValue, height.value)
    });
    
    watch(background, (newValue, oldValue) => {
      document.getElementById('canvas_box').style.background = newValue
    });


    return {
      border_radius,
      width,
      height,
      width_val,
      height_val,
      background,
      draggable,

      handleBorderRadiusChange,
      handleWidthChange,
      handleHeightChange,
      createCanvas,

      dragMouseDown,
      elementDrag,
      closeDragElement,
      dragStart,
      dragOver,
      drop,
      hightlight,
      unhightlight
    };
  },

  mounted() {
    // const canvas__container = document.getElementById("canvas__container");

    // // Iterate through the child nodes of the parent element
    // canvas__container.childNodes.forEach(childNode => {
    //   // Add event listener to each child node
    //   childNode.addEventListener("click", (e) => {
    //     const cssObj = window.getComputedStyle(e.target, null);

    //     console.log(cssObj);

    //   });
    // });
  },
};
</script>

<style scoped>
.draggable {
    position: absolute;
    z-index: 9;
  }

  .template {
    
  }
</style>
