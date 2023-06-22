<template>
    <button type="button" @click="emitShowDropdown" class="collapsible">Padding</button>
    <div class="content">
        <div class="grid grid-cols-2">

            <div class="my-2 flex flex-col">
                <div class="text-xs flex flex-col mb-1">
                    <p class="col-span-1 mb-2 font-bold">Top</p>
                    <div class="grid grid-cols-3 gap-3 items-center">
                        <input type="number" v-model="padding_top" @input="handlePaddingTopChange" @keyup="handlePaddingTopChange" 
                        class="px-2 py-1 rounded-md col-span-2">                                
                        <p class="flex items-center col-span-1">px</p>
                    </div>
                </div>
            </div>
            <div class="my-2 flex flex-col">
                <div class="text-xs flex flex-col mb-1">
                    <p class="col-span-1 mb-2 font-bold">Left</p>
                    <div class="grid grid-cols-3 gap-3 items-center">
                        <input type="number" v-model="padding_left" @input="handlePaddingLeftChange" @keyup="handlePaddingLeftChange" 
                        class="px-2 py-1 rounded-md col-span-2">                                
                        <p class="flex items-center col-span-1">px</p>
                    </div>
                </div>
            </div>
            <div class="my-2 flex flex-col">
                <div class="text-xs flex flex-col mb-1">
                    <p class="col-span-1 mb-2 font-bold">Bottom</p>
                    <div class="grid grid-cols-3 gap-3 items-center">
                        <input type="number" v-model="padding_bottom" @input="handlePaddingBottomChange" @keyup="handlePaddingBottomChange" 
                        class="px-2 py-1 rounded-md col-span-2">                                
                        <p class="flex items-center col-span-1">px</p>
                    </div>
                </div>
            </div>
            <div class="my-2 flex flex-col">
                <div class="text-xs flex flex-col mb-1">
                    <p class="col-span-1 mb-2 font-bold">Right</p>
                    <div class="grid grid-cols-3 gap-3 items-center">
                        <input type="number" v-model="padding_right" @input="handlePaddingRightChange" @keyup="handlePaddingRightChange" 
                        class="px-2 py-1 rounded-md col-span-2">                                
                        <p class="flex items-center col-span-1">px</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { ref, watch, reactive, onMounted } from 'vue';

export default {
    props: {
        element_to_update: {
            type: String,
            required: true,
            // default: 'canvas'
        }
    },
    setup(props, context) {
        const padding_top = ref(0);
        const padding_left = ref(0);
        const padding_right = ref(0);
        const padding_bottom = ref(0);
        
        const handlePaddingTopChange = () => {
            const element = document.querySelector(`[data-id="${props.element_to_update}"][data-parent="true"]`);
            element.style.paddingTop = padding_top.value + 'px';
        }
        const handlePaddingBottomChange = () => {
            const element = document.querySelector(`[data-id="${props.element_to_update}"][data-parent="true"]`);
            element.style.paddingBottom = padding_bottom.value + 'px';
        }
        const handlePaddingLeftChange = () => {
            const element = document.querySelector(`[data-id="${props.element_to_update}"][data-parent="true"]`);
            element.style.paddingLeft = padding_left.value + 'px';
        }
        const handlePaddingRightChange = () => {
            const element = document.querySelector(`[data-id="${props.element_to_update}"][data-parent="true"]`);
            element.style.paddingRight = padding_right.value + 'px';
        }

        const parseValueWithSign = (str) => {
            const regex = /^(\d+)(%|px)$/;
            const match = regex.exec(str);

            if (match) {
                const value = parseInt(match[1]);
                const sign = match[2];
                return { value, sign };
            }

            return null; // Return null if the string doesn't match the expected format
        }

        const setStyles = () => {
            const element = document.querySelector(`[data-id="${props.element_to_update}"][data-parent="true"]`);
    
            let parse_padding_top = parseValueWithSign(element.style.paddingTop)
            padding_top.value = parse_padding_top ? parse_padding_top.value : '0'

            let parse_padding_left = parseValueWithSign(element.style.paddingLeft)
            padding_left.value = parse_padding_left ? parse_padding_left.value : '0'

            let parse_padding_bottom = parseValueWithSign(element.style.paddingBottom)
            padding_bottom.value = parse_padding_bottom ? parse_padding_bottom.value : '0'

            let parse_padding_right = parseValueWithSign(element.style.paddingRight)
            padding_right.value = parse_padding_right ? parse_padding_right.value : '0'
        }

        const emitShowDropdown = (event) => {
            let content = event.target.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
            // context.emit('trigger-show-dropdown', event)
        }

        onMounted(() => {
            if(props.element_to_update){
                setStyles()
            }
        });



        return {
            padding_top,
            padding_left,
            padding_right,
            padding_bottom,

            handlePaddingTopChange,
            handlePaddingBottomChange,
            handlePaddingLeftChange,
            handlePaddingRightChange,
            parseValueWithSign,
            setStyles,

            emitShowDropdown
        }
    }
}
</script>
<style>
    .collapsible {
        @apply bg-gray-400 w-full border-none outline-none cursor-pointer p-2;
        color: white;
        cursor: pointer;
        font-size: 12px;
    }

    .active, .collapsible:hover {
    background-color: #555;
    }

    .content {
        /* padding: 0 18px; */
        display: none;
        overflow: hidden;
    }
</style>