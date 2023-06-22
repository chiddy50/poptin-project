<template>
    <div id="style__component" 
        class="style__component bg-gray-200">

        <div class="flex justify-end pt-4">
            <i @click="closeStyleComponent" class="bx bx-x cursor-pointer text-4xl"></i>
        </div>

        <div class="mt-4 grid grid-cols-3 items-center justify-center gap-5">
            
            <button @click="alignBox($event, 'left')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Left</span>
                <i class='bx bx-align-left text-2xl'></i>
            </button>
            <button @click="alignBox($event, 'center')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Center</span>
                <i class='bx bx-align-middle text-2xl'></i>
            </button>
            <button @click="alignBox($event, 'right')" class="align__control border border-gray-300 bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span class="text-xs">Right</span>
                <i class='bx bx-align-right text-2xl'></i>
            </button>
        </div>
        
        <!-- SPACING CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
          <div class="text-xs flex items-center mb-1">
            <p class="mr-4">Spacing</p>
            <input type="number" v-model="gap" @input="handleGapChange" @keyup="handleGapChange" class="px-2 py-1 rounded-md outline-none col-span-1">
            <p class="ml-2 flex">px</p>
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

        <PaddingComponent 
        :element_to_update="element_to_update"
        />
        <!-- @trigger-show-dropdown="showDropdown" -->

        <!-- PADDING CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
          <div class="text-xs grid grid-cols-4 items-center mb-1">
            <p class=" col-span-1">All Padding</p>
            <input type="number" v-model="padding" @input="handlePaddingChange" @keyup="handlePaddingChange" class="px-2 py-1 rounded-md outline-none col-span-1">
            <div class="ml-2 flex col-span-2 gap-3">
              <div class="flex items-center justify-center">
                <label>%</label>
                <input type="radio" v-model="padding_val" name="padding_val" value="%">
              </div>
              <div class="flex items-center">
                <label class="flex items-center">px</label>
                <input type="radio" v-model="padding_val" name="padding_val" value="px">
              </div>
            </div>
          </div>
          <input type="range" id="width" v-if="padding_val === '%'" v-model="padding" @input="handlePaddingChange" min="0" max="100">
        </div>

        <!-- MARGIN CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
          <div class="text-xs grid grid-cols-4 items-center mb-1">
            <p class=" col-span-1">All Margin</p>
            <input type="number" v-model="margin" @input="handleMarginChange" @keyup="handleMarginChange" class="px-2 py-1 rounded-md outline-none col-span-1">
            <div class="ml-2 flex col-span-2 gap-3">
              <div class="flex items-center justify-center">
                <label>%</label>
                <input type="radio" v-model="margin_val" name="margin_val" value="%">
              </div>
              <div class="flex items-center">
                <label class="flex items-center">px</label>
                <input type="radio" v-model="margin_val" name="margin_val" value="px">
              </div>
            </div>
          </div>
          <input type="range" id="width" v-if="margin_val === '%'" v-model="margin" @input="handleMarginChange" min="0" max="100">
        </div>

        

        <!-- BORDER-RADIUS CUSTOMIZATION -->
        <div class="my-4 flex flex-col">
          <p class="text-xs">Border Radius - {{ border_radius }}%</p>
          <input type="range" id="border_radius" v-model="border_radius" @input="handleBorderRadiusChange" min="0" max="100">
        </div>

        <div class="mt-4">
          <p class="text-xs">Background Color</p>
          <input type="color" v-model="background" id="" class="w-full">
        </div>
        
    </div>
</template>
<script>

import PaddingComponent from './PaddingComponent.vue'

import { ref, watch, reactive } from 'vue';

import { parseValueWithSign } from '@/helpers';

export default {
    components: {
        PaddingComponent
    },
    props: {
        element_to_update: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            border_radius: 0,
            height: 0,
            width: 0,
            gap: 0,
            padding: 0,
            padding_val: 'px',
            margin: 0,
            margin_val: 'px',
            width_val: 'px',
            height_val: 'px',
            background: '#ffffff',
            // element_to_update: null
        }
    },
    methods: {
        setStyles(element) {
            // SET WIDTH
            let parse_width = this.parseValueWithSign(element.style.width)
            this.width = parse_width ? parse_width.value : '0'
            this.width_val = parse_width ? parse_width.sign : 'px'

            // SET HEIGHT
            let parse_height = this.parseValueWithSign(element.style.height)
            this.height = parse_height ? parse_height.value : '0'
            this.height_val = parse_height ? parse_height.sign : 'px'

            // SET GAP
            let parse_gap = this.parseValueWithSign(element.style.gap)
            this.gap = parse_gap ? parse_gap.value : '0'

            // SET PADDING
            this.padding = element.style.padding ? element.style.padding : this.padding

            
            // SET BORDER RADIUS
            let parse_borderRadius = null;
            if (element.style.borderRadius) {
                parse_borderRadius = this.parseValueWithSign(element.style.borderRadius)
            }

            this.border_radius = parse_borderRadius ? parse_borderRadius.value : '0'

            // SET BACKGROUND-COLOR
            this.background = element.style.backgroundColor ? element.style.backgroundColor : this.background

        },

        alignBox(e, position){           
            const element = document.querySelector(`[data-id="${this.element_to_update}"][data-parent="true"]`);
            const parentElement = element.parentElement;
            // const cssObj = window.getComputedStyle(parentElement, null);
            parentElement.style.justifyContent = position
        },

        parseValueWithSign(str){
            const regex = /^(\d+)(%|px)$/;
            const match = regex.exec(str);

            if (match) {
                const value = parseInt(match[1]);
                const sign = match[2];
                return { value, sign };
            }

            return null; // Return null if the string doesn't match the expected format
        },
        
        handleHeightChange(){
            const element = document.querySelector(`[data-id="${this.element_to_update}"][data-parent="true"]`);
            if (this.height_val === '%' && this.height > 100) {
                this.height = 100
            }
            element.style.height = this.height + (this.height_val === '%' ? '%' : 'px');
        },

        handleGapChange(){
            const element = document.querySelector(`[data-id="${this.element_to_update}"][data-parent="true"]`);
            element.style.gap = this.gap + 'px';
        },
    
        handleWidthChange() {
            const element = document.querySelector(`[data-id="${this.element_to_update}"][data-parent="true"]`);
            if (this.width_val === '%' && this.width > 100) {
                this.width = 100
            }
            element.style.width = this.width + (this.width_val === '%' ? '%' : 'px');
        },

        handlePaddingChange() {
            const element = document.querySelector(`[data-id="${this.element_to_update}"][data-parent="true"]`);
            if (this.padding_val === '%' && this.padding > 100) {
                this.padding = 100
            }
            element.style.padding = this.padding + (this.padding_val === '%' ? '%' : 'px');
        },

        handleMarginChange() {
            const element = document.querySelector(`[data-id="${this.element_to_update}"][data-parent="true"]`);
            if (this.margin_val === '%' && this.margin > 100) {
                this.margin = 100
            }
            element.style.margin = this.margin + (this.margin_val === '%' ? '%' : 'px');
        },
        
        handleBorderRadiusChange() {
            const element = document.querySelector(`[data-id="${this.element_to_update}"][data-parent="true"]`);
            element.style.borderRadius = this.border_radius +'%';
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

        watchPadding(value, initialPadding){
            if (value === '%' && initialPadding > 100) {
                this.padding = 100;
                this.handlePaddingChange()
            }
        },

        watchMargin(value, initialMargin){
            if (value === '%' && initialMargin > 100) {
                this.margin = 100;
                this.handleMarginChange()
            }
        },

        closeStyleComponent() {
            document.getElementById("style__component").style.width = "0%";
            document.getElementById("style__component").classList.remove('px-5') 
        },

        showDropdown(e){
            let content = e.target.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        }
    },
    watch: {
        element_to_update(newValue, oldValue){
            const element = document.querySelector(`[data-id="${newValue}"][data-parent="true"]`);
            this.setStyles(element)
        },

        width(newValue, oldValue){
            this.watchWidth(this.width_val, newValue)   
        },

        height(newValue, oldValue){
            this.watchHeight(this.height_val, newValue)   
        },

        padding(newValue, oldValue){
            this.watchPadding(this.padding_val, newValue)   
        },

        margin(newValue, oldValue){
            this.watchMargin(this.margin_val, newValue)   
        },

        width_val(newValue, oldValue){
            this.watchWidth(newValue, this.width)
        },

        height_val(newValue, oldValue){
            this.watchHeight(newValue, this.height)
        },

        padding_val(newValue, oldValue){
            this.watchPadding(newValue, this.padding)
        },

        margin_val(newValue, oldValue){
            this.watchMargin(newValue, this.margin)
        },

        background(newValue, oldValue){
            const element = document.querySelector(`[data-id="${this.element_to_update}"][data-parent="true"]`);
            element.style.background = newValue
        },
    },
}
</script>
<style>
    

    
</style>