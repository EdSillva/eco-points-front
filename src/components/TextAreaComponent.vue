<template>
    <div>
        <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
            {{ label }}
        </label>
        <textarea :id="id" :placeholder="placeholder" :required="required" :value="modelValue" @input="updateValue"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"></textarea>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    id: {
        type: String,
        default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
    },
    required: Boolean,
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
    const target = event.target as HTMLTextAreaElement
    emit('update:modelValue', target.value)
}
</script>
