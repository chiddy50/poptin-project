<template>
    <div id="btn__style__component" 
        class="style__component bg-gray-200">

        <div @click="closeComponent" class="my-5 flex items-center cursor-pointer gap-3">
          <i class='bx bx-arrow-back text-4xl cursor-pointer'></i>
          <span class='text-lg'>Back</span>
        </div>

        <p class="mb-1">Align Box</p>
        <div class="mt-4 grid grid-cols-3 items-center justify-center gap-5">            
            <button @click="alignButton($event, 'left')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Left</span>
                <i class='bx bx-align-left text-2xl'></i>
            </button>
            <button @click="alignButton($event, 'center')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Center</span>
                <i class='bx bx-align-middle text-2xl'></i>
            </button>
            <button @click="alignButton($event, 'right')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Right</span>
                <i class='bx bx-align-right text-2xl'></i>
            </button>
        </div>

        <p class="mb-1">Align Text</p>
        <div class="mt-4 grid grid-cols-3 items-center justify-center gap-5">            
            <button @click="alignText($event, 'left')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Left</span>
                <i class='bx bx-align-left text-2xl'></i>
            </button>
            <button @click="alignText($event, 'center')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Center</span>
                <i class='bx bx-align-middle text-2xl'></i>
            </button>
            <button @click="alignText($event, 'right')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Right</span>
                <i class='bx bx-align-right text-2xl'></i>
            </button>
        </div>

        <!-- TEXT CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
            <div class="text-xs flex flex-col gap-1 mb-1">
                <p class="mr-4">Text</p>
                <div class="flex">
                    <input type="text" v-model="text_content" class="px-2 py-1 rounded-md outline-none w-full col-span-1">
                </div>
            </div>
        </div>

        <!-- FONT-SIZE CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
            <div class="text-xs flex flex-col gap-1 mb-1">
                <p class="mr-4">Font Size</p>
                <div class="flex items-center gap-1">
                    <input type="number" v-model="font_size" @input="handleFontSizeChange" @keyup="handleFontSizeChange" class="px-2 py-1 rounded-md outline-none col-span-1">
                    <p class="ml-1 flex">px</p>
                </div>
            </div>
        </div>
        
        <!-- BACKGROUND CUSTOMIZATION -->
        <div class="mt-4">
          <p class="text-xs">Background Color</p>
          <input type="color" v-model="background" id="" class="w-full">
        </div>

        <!-- COLOR CUSTOMIZATION -->
        <div class="mt-4">
          <p class="text-xs">Color</p>
          <input type="color" v-model="color" id="" class="w-full">
        </div>

        <!-- BORDER COLOR CUSTOMIZATION -->
        <div class="mt-4">
          <p class="text-xs">Border Color</p>
          <input type="color" v-model="border_color" id="" class="w-full">
        </div>

        <!-- BORDER WIDTH CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
            <div class="text-xs flex flex-col gap-1 mb-1">
                <p class="mr-4">Border Width</p>
                <div class="flex items-center gap-1">
                    <input type="number" v-model="border_width" @input="handleBorderWidthChange" @keyup="handleBorderWidthChange" class="px-2 py-1 rounded-md outline-none col-span-1">
                    <p class="ml-1 flex">px</p>
                </div>
            </div>
        </div>

        <!-- PADDING CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
            <div class="text-xs flex flex-col gap-1 mb-1">
                <p class="mr-4">Padding</p>
                <div class="flex items-center gap-1">
                    <input type="number" v-model="padding" @input="handlePaddingChange" @keyup="handlePaddingChange" class="px-2 py-1 rounded-md outline-none col-span-1">
                    <p class="ml-1 flex">px</p>
                </div>
            </div>
        </div>

        <!-- HEIGHT CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
          <div class="text-xs grid grid-cols-4 items-center mb-1">
            <p class=" col-span-1">Height</p>
            <input type="number" v-model="height"  @input="handleHeightChange" @keyup="handleHeightChange" class="px-2 py-1 rounded-md outline-none col-span-1">
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
            <input type="number" v-model="width" @input="handleWidthChange" @keyup="handleWidthChange" class="px-2 py-1 rounded-md outline-none col-span-1">
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
       

        
    </div>
</template>
<script>

import { parseValueWithSign, convertRGBtoHex } from '@/helpers';

export default {
    props: {
        button_to_update: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            background: '#ffffff',
            border_color: '#ffffff',
            color: '#ffffff',
            padding: 0,
            padding_val: 'px',
            border_radius: 0,
            border_width: 0,
            height: 0,
            width: 0,
            height_val: 'px',
            width_val: 'px',            
            font_size: 13,            
            text_content: 'Default text',            
        }
    },
    // mounted() {
    //     document.getElementById("btn__style__component").style.width = "30%";
    //     document.getElementById("btn__style__component").classList.add('px-5')
    // },
    methods: {
        setStyles(element) {
            // SET BACKGROUND-COLOR
            const parse_background = convertRGBtoHex(element.style.backgroundColor)
            this.background = parse_background ? parse_background : '#ffffff'

            // SET BORDER-COLOR
            const parse_border_color = convertRGBtoHex(element.style.borderColor)
            this.border_color = parse_border_color ? parse_border_color : '#ffffff'

            // SET COLOR
            const parse_color = convertRGBtoHex(element.style.color)
            this.color = parse_color ? parse_color : '#ffffff'
            
            // SET PADDING
            let parse_padding = parseValueWithSign(element.style.padding)
            this.padding = parse_padding ? parse_padding.value : '0'

            // SET BORDER RADIUS
            let parse_border_radius = parseValueWithSign(element.style.borderRadius)
            this.border_radius = parse_border_radius ? parse_border_radius : this.border_radius
            
            // SET BORDER-WIDTH
            this.border_width = element.style.borderWidth ? element.style.borderWidth : this.border_width
            
            // SET FONT-SIZE
            let parse_font_size = parseValueWithSign(element.style.fontSize)
            this.font_size = parse_font_size ? parse_font_size.value : '0'

            // SET TEXT CONTENT
            this.text_content = element.textContent ? element.textContent : this.text_content

            // SET WIDTH
            let parse_width = parseValueWithSign(element.style.width)
            this.width = parse_width ? parse_width.value : '0'
            this.width_val = parse_width ? parse_width.sign : 'px'

            // SET HEIGHT
            let parse_height = parseValueWithSign(element.style.height)
            this.height = parse_height ? parse_height.value : '0'
            this.height_val = parse_height ? parse_height.sign : 'px'

        },
        closeComponent(){
            this.$emit('trigger-hide-modals')
        },

        handleBorderRadiusChange() {
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.style.borderRadius = this.border_radius +'px';
        },

        handleFontSizeChange(){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.style.fontSize = this.font_size +'px';
        },

        handlePaddingChange() {
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            if (this.padding_val === '%' && this.padding > 100) {
                this.padding = 100
            }
            element.style.padding = this.padding + (this.padding_val === '%' ? '%' : 'px');
        },
        handleBorderWidthChange(){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.style.borderWidth = this.border_width + 'px';
        },
        handleHeightChange(){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            if (this.height_val === '%' && this.height > 100) {
                this.height = 100
            }
            element.style.height = this.height + (this.height_val === '%' ? '%' : 'px');
        },
        handleWidthChange() {
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            if (this.width_val === '%' && this.width > 100) {
                this.width = 100
            }
            element.style.width = this.width + (this.width_val === '%' ? '%' : 'px');
        },
        watchPadding(value, initialPadding){
            if (value === '%' && initialPadding > 100) {
                this.padding = 100;
                this.handlePaddingChange()
            }
        },
        watchWidth(value, initialWidth){
            if (value === '%' && initialWidth > 100) {
                this.width = 100;
                this.handleWidthChange()
            }
        },
    
        watchHeight(value, initialHeight) {
            if (value === '%' && initialHeight > 100) {
                this.height = 100;
                this.handleHeightChange()
            }
        },
        alignButton(e, position){           
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            const parentElement = element.parentElement;
            parentElement.style.justifyContent = position
        },
        alignText(e, position){           
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            const parentElement = element.parentElement;
            parentElement.style.textAlign = position
        },

        showDropdown(e){
            var content = e.target.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        }
    },
    watch: {
        button_to_update(newValue, oldValue){
            const element = document.querySelector(`[data-id="${newValue}"][data-parent="true"]`);

            // SET BACKGROUND-COLOR
            this.background = element.style.backgroundColor ? element.style.backgroundColor : this.background

            this.setStyles(element)
        },

        text_content(value){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.textContent = value
        },

        width(newValue, oldValue){
            this.watchWidth(this.width_val, newValue)   
        },

        height(newValue, oldValue){
            this.watchHeight(this.height_val, newValue)   
        },

        width_val(newValue, oldValue){
            this.watchWidth(newValue, this.width)
        },

        height_val(newValue, oldValue){
            this.watchHeight(newValue, this.height)
        },

        padding(newValue, oldValue){
            this.watchPadding(this.padding_val, newValue)   
        },
        padding(newValue, oldValue){
            this.watchPadding(this.padding_val, newValue)   
        },
        padding_val(newValue, oldValue){
            this.watchPadding(newValue, this.padding)
        },
        font_size(newValue){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.style.fontSize = newValue+'px';
        },
        border_color(newValue){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.style.borderColoe = newValue
        },
        color(newValue){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.style.color = newValue
        },
        border_width(newValue){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.style.borderWidth = newValue+'px'
        },
        

        background(newValue, oldValue){
            const element = document.querySelector(`[data-id="${this.button_to_update}"][data-parent="true"]`);
            element.style.background = newValue
        }

    },
}
</script>
<style scoped>

    
</style>