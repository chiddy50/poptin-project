<template>
    <div class="draggable-item" draggable="true" @dragstart="handleDragStart" @dragend="handleDragEnd">
      <span>{{ item.label }}</span>
      <button @click="deleteItem">Delete</button>
    </div>
  </template>
  
  <script>
  import { defineEmits, defineProps } from 'vue';
  
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    emits: ['delete'],
    methods: {
      handleDragStart(e) {
        e.dataTransfer.setData('itemId', this.item.id);
      },
      handleDragEnd() {
        // Additional logic after dragging ends (if needed)
      },
      deleteItem() {
        this.$emit('delete');
      }
    }
  };
  </script>
  
  <style scoped>
  .draggable-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  </style>
  