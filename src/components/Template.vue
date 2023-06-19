<template >
    <div id="template-container">
        <div @mousedown="dragMouseDown" id="template"
        class="template mx-auto p-4" style="width: 300px; height: 300px; background:  #ff6464;position: absolute;
            top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <div class="h-full w-full border-2 border-white relative">
                <div>
                    <i class='bx bxs-star text-4xl cursor-move' style=""></i>
                    <i class='bx bxs-star text-4xl cursor-move' style=""></i>
                    <i class='bx bxs-star text-4xl cursor-move' style=""></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, reactive } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next'

export default {
    components: {
      draggable: VueDraggableNext,
    },
    data() {
      return {
        enabled: true,
        list: [
          { name: 'John', id: 1 },
          { name: 'Joao', id: 2 },
          { name: 'Jean', id: 3 },
          { name: 'Gerard', id: 4 },
        ],
        dragging: false,
      }
    },
    methods: {
      log(event) {
        console.log(event)
      },
    },
    setup(){
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
            const template_container = document.getElementById('template');

            e = e || window.event;
            e.preventDefault();
            pos1.value = pos3.value - e.clientX;
            pos2.value = pos4.value - e.clientY;
            pos3.value = e.clientX;
            pos4.value = e.clientY;
            leftPosition.value = template_container.offsetLeft - pos1.value + 'px';
            topPosition.value = template_container.offsetTop - pos2.value + 'px';

            template_container.style.position = 'absolute';
            template_container.style.top = topPosition.value;
            template_container.style.left = leftPosition.value;
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };

        return {
            dragMouseDown,
            elementDrag,
            closeDragElement,
        }
    },

    mounted() {
        let template = document.getElementById('template-container')
        // template.innerHTML = JSON.parse(localStorage.getItem('template'))
        // localStorage.setItem('template', JSON.stringify(template.innerHTML))
    },
}
</script>
<style >
    
</style>