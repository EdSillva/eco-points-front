<template>
  <div class="min-h-screen flex flex-col">
    <NavBarComponent />
    <main class="flex-grow">
      <div class="grid grid-cols-2 gap-4 p-4">
        <!-- Container Ação sustentável -->
        <div @click="showModal = true"
          class="flex items-center flex-col bg-[#EDE1C8] hover:bg-[#012C2A] text-[#012C2A] hover:text-[#EDE1C8] p-4 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" class="size-40">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h2 class="text-2xl text-center font-bold">Cadastrar uma nova ação sustentável</h2>
        </div>
      </div>
      <!-- Container Parceiros -->
      <PartnersContainerComponent />
      <!-- Container para as Recompensas disponíveis -->
      <RewardsSroreComponent />
    </main>
    <FooterComponent />
    <!-- Modal do formulário -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-75"></div>
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative rounded-lg">
        <button @click="showModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
        <NewActionForm @submitted="showModal = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import NewActionForm from '../components/NewActionFormComponent.vue'
import FooterComponent from '../components/FooterComponent.vue';
import PartnersContainerComponent from '../components/PartnersContainerComponent.vue';
import RewardsSroreComponent from '../components/RewardsStoreComponent.vue';

const showModal = ref(false)
</script>