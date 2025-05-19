<template>
    <div>
        <label v-if="label" :for="id" class="block text-sm font-medium text-gray-900">
            {{ label }}
        </label>

        <div class="mt-2">
            <div
                class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300
          has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div v-if="icon" class="shrink-0 text-base text-gray-500 select-none sm:text-sm">
                    {{ icon }}
                </div>

                <input v-if="!isSelect" :id="id" :name="name" :type="type"
                    class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    :placeholder="placeholder" v-model="inputValue" required />

                <div v-else class="relative w-full">
                    <select :id="id" :name="name"
                        class="w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                        v-model="inputValue">
                        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
                    </select>

                    <ChevronDownIcon
                        class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-gray-500"
                        aria-hidden="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

const props = defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    icon?: string
    type?: string
    options?: string[] // se isso existir, vira select
    name?: string
    id?: string
    required?: boolean | false
}>()

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})

const isSelect = computed(() => props.options && props.options.length > 0)
</script>
