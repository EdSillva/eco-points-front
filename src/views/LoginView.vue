<template>
  <Header>
    <!-- Logo -->
    <div class="flex items-center justify-center pt-24">
      <img src="../assets/logo-eco-points.png" alt="Logo" class="h-24 w-auto" />
    </div>
  </Header>
  <div class="flex min-h-full h-full flex-col justify-center py-12 px-12">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
      <h1 class="text-2xl font-bold text-center">Bem-vindo a EcoPoints!</h1>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm border-2 border-black rounded-lg shadow-lg p-6 space-y-4">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <InputComponent v-model="email" id="email" name="email" label="Email" type="email"
          placeholder="Digite seu email" autocomplete="email" />

        <InputComponent v-model="password" id="password" name="password" label="Senha" type="password"
          placeholder="Digite sua senha" autocomplete="current-password" required />

        <div class="text-sm mt-2">
          <button type="button" class="font-semibold hover:text-indigo-500">
            Esqueceu sua senha?
          </button>
        </div>

        <ButtonComponent type="submit" :fullWidth="true">
          Entrar
        </ButtonComponent>
      </form>

      <ButtonComponent type="button" :fullWidth="true" variant="secondary" @click="handleRegister">
        Cadastre-se
      </ButtonComponent>
    </div>
  </div>

  <ToastComponent v-if="showToast" :key="toastKey" :type="toastType" :title="toastTitle" :message="toastMessage"
    @close="showToast = false" />

  <div v-if="loading" class="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20">
    <Spinner />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import ToastComponent from '../components/ToastComponent.vue'
import Spinner from '../components/LoadingComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const route = useRoute()
const router = useRouter()
const email = ref<string>('')
const password = ref<string>('')
const auth = getAuth()
const showToast = ref(false)
const toastType = ref<'success' | 'error'>('success')
const toastTitle = ref('')
const toastMessage = ref('')
const loading = ref(false)
const toastKey = ref(0)

const handleRegister = async () => {
  router.push({ name: 'Register' })
}

onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email as string
  }
})

const login = async () => {
  loading.value = true
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    await user.getIdToken()

    localStorage.setItem('lastLogin', Date.now().toString())

    router.push({ name: 'Home' })
  } catch (error) {
    showToastMessage('error', 'Erro ao fazer login.', 'Verifique suas credenciais.')
  } finally {
    loading.value = false
  }
}

function showToastMessage(type: 'success' | 'error', title: string, message: string) {
  showToast.value = false
  toastKey.value++ // força recriação

  // Adiciona um pequeno delay para garantir que o v-if remova o componente
  setTimeout(() => {
    toastType.value = type
    toastMessage.value = message
    toastTitle.value = type === 'success' ? title : title
    showToast.value = true
  }, 50)
}

const handleSubmit = (event: Event) => {
  event.preventDefault()
  login()
}
</script>