<template>
    <div class="flex min-h-full h-full flex-col justify-center px-12 py-12 lg:px-12">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
        <h1 class="text-2xl font-bold text-center">Bem-vindo a EcoPoints!</h1>
      </div>
  
      <div class="sm:mx-auto sm:w-full sm:max-w-sm border-2 border-black rounded-lg shadow-lg border-radius-12 p-6 space-y-4">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <div class="mt-2">
              <label for="email" class="block text-sm/6 font-medium">Email</label>
              <input v-model="email" type="email" name="email" id="email" autocomplete="email" required
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>
  
          <div>
            <div class="mt-2">
              <label for="password" class="block text-sm/6 font-medium">Senha</label>
              <input v-model="password" type="password" name="password" id="password" autocomplete="current-password"
                required
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
            <div class="text-sm mt-2">
              <button href="#" class="font-semibold hover:text-indigo-500 taxed">
                Esqueceu sua senha?
              </button>
            </div>
          </div>
  
          <div>
            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Entrar
              </button>
            </div>
          </div>
        </form>
  
        <div>
          <div>
            <button type="button" @click="handleRegister"
              class="flex w-full justify-center rounded-md bg-purple-300 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black-600">
              Cadastre-se
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  
  const route = useRoute()
  const router = useRouter()
  const email = ref<string>('')
  const password = ref<string>('')
  const auth = getAuth()
  
  const handleRegister = async () => {
    router.push({ name: 'Register' })
  }
  
  onMounted(() => {
    if (route.query.email) {
      email.value = route.query.email as string
    }
  })
  
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user
      console.log('Login bem-sucedido:', user)
      router.push({ name: 'Home' })
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }
  
  const handleSubmit = (event: Event) => {
    event.preventDefault()
    login()
  }
  </script>