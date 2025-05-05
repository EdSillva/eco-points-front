<template>
    <div class="flex min-h-full h-full flex-col justify-center px-12 py-12 lg:px-12">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
            <h1 class="text-2xl font-bold text-center">Registrar uma conta!</h1>
        </div>

        <div
            class="sm:mx-auto sm:w-full sm:max-w-sm border-2 border-black rounded-lg shadow-lg border-radius-12 p-6 space-y-4">
            <form @submit.prevent="handleRegister" class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-medium">Email</label>
                    <input id="email" v-model="email" type="email" required
                        class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600" />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium">Senha</label>
                    <input id="password" v-model="password" type="password" required
                        class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600" />
                </div>

                <button type="submit"
                    class="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500">
                    Criar Conta
                </button>
            </form>
            <div>
                <button type="button" @click="back"
                    class="flex w-full justify-center rounded-md bg-purple-300 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black-600">
                    Voltar
                </button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const auth = getAuth()

const back = () => {
    router.push({ name: 'Login' })
}

const handleRegister = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        router.push({ name: 'Login', query: { email: email.value } })
    } catch (error) {
        console.error('Erro no cadastro:', error)
    }
}
</script>