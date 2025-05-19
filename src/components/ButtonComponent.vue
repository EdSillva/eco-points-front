<template>
    <button :type="type" :class="[
        'relative inline-flex items-center justify-center px-4 py-2 rounded-2xl font-semibold transition',
        fullWidth ? 'w-full' : '',
        isDisabled ? 'bg-gray-400 cursor-not-allowed' : variantClasses,
    ]" :disabled="isDisabled" @click="handleClick">
        <span v-if="!loading">
            <slot />
        </span>
        <span v-else>
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
        </span>
    </button>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps<{
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger'
    fullWidth?: boolean
}>()

const type = props.type ?? 'button'

const isDisabled = computed(() => props.disabled || props.loading)

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'bg-gray-600 text-white hover:bg-gray-700'
        case 'danger':
            return 'bg-red-600 text-white hover:bg-red-700'
        default:
            return 'bg-[#8BB376] text-white hover:bg-[#012C2A]'
    }
})

const handleClick = (e: MouseEvent) => {
    if (!isDisabled.value) emit('click', e)
}
</script>
