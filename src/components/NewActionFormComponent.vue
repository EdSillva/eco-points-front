<template>
    <div class="relative">
        <!-- Toast -->
        <ToastComponent v-if="toast.visible" :type="toast.type" :title="toast.title" :message="toast.message"
            @close="toast.visible = false" />

        <!-- Formulário -->
        <form @submit.prevent="submitAction" class="flex flex-col space-y-4 align-center">
            <InputComponent v-model="form.title" label="Título" placeholder="Digite o título da ação" required />

            <TextAreaComponent v-model="form.description" label="Descrição" placeholder="Descreva a ação realizada"
                required />

            <InputComponent v-model="form.points" label="Pontos" placeholder="Ex: 10" required />

            <ButtonComponent type="submit" :loading="loading">
                Enviar
            </ButtonComponent>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'

// Componentes reutilizáveis
import ToastComponent from './ToastComponent.vue'
import InputComponent from './InputComponent.vue'
import TextAreaComponent from './TextAreaComponent.vue'
import ButtonComponent from './ButtonComponent.vue'

const loading = ref(false)

const form = ref({
    title: '',
    description: '',
    points: '10',
})

const toast = ref({
    visible: false,
    type: 'success',
    title: '',
    message: '',
})

const showToast = (type: 'success' | 'error', title: string, message: string) => {
    toast.value = {
        visible: true,
        type,
        title,
        message,
    }
}

const resetForm = () => {
    form.value = {
        title: '',
        description: '',
        points: '10',
    }
}

const submitAction = async () => {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
        showToast('error', 'Erro de autenticação', 'Usuário não está logado.')
        return
    }

    const token = await user.getIdToken()
    loading.value = true

    try {
        const response = await fetch('http://localhost:3335/sustainable-actions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...form.value,
                points: Number(form.value.points),
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || 'Erro ao registrar ação')
        }

        showToast('success', 'Ação registrada!', 'Sua ação foi registrada com sucesso.')
        resetForm()
    } catch (err: unknown) {
        showToast('error', 'Erro ao enviar', err instanceof Error ? err.message : String(err))
    } finally {
        loading.value = false
    }
}
</script>
