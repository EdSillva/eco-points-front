<template>
    <div class="flex min-h-full h-full flex-col justify-center px-12 py-12 lg:px-12">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
            <h1 class="text-2xl font-bold text-center">Registrar uma conta!</h1>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-sm border-2 border-black rounded-lg shadow-lg p-6 space-y-4">
            <form @submit.prevent="handleRegister" class="space-y-6">

                <InputComponent v-model="fullName" label="Nome Completo" placeholder="Digite seu nome completo"
                    id="fullName" name="fullName" icon="👤" />

                <InputComponent v-model="birthDate" label="Data de Nascimento" type="date" id="birthDate"
                    name="birthDate" icon="📅" />

                <InputComponent v-model="gender" label="Gênero"
                    :options="['Masculino', 'Feminino', 'Outro', 'Prefiro não dizer']" id="gender" name="gender"
                    icon="⚧️" />

                <InputComponent v-model="phone" label="Telefone" placeholder="(99) 99999-9999" id="phone" name="phone"
                    icon="📞" v-mask="'(##) #####-####'" />

                <InputComponent v-model="email" label="Email" placeholder="Digite seu email" type="email" id="email"
                    name="email" icon="📧" />

                <InputComponent v-model="password" label="Senha" type="password" placeholder="Digite sua senha"
                    id="password" name="password" icon="🔒" />

                <InputComponent v-model="confirmPassword" label="Confirmação de Senha" type="password"
                    placeholder="Confirme sua senha" id="confirmPassword" name="confirmPassword" icon="🔒" />

                <ButtonComponent type="submit" variant="primary" fullWidth>
                    Criar Conta
                </ButtonComponent>
            </form>

            <div>
                <ButtonComponent type="button" variant="secondary" fullWidth @click="back">
                    Voltar
                </ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../service/firebase'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const router = useRouter()
const auth = getAuth()

const fullName = ref('')
const birthDate = ref('')
const gender = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const back = () => {
    router.push({ name: 'Login' })
}

const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
        alert('As senhas não coincidem.')
        return
    }

    const payload = {
        fullName: fullName.value,
        birthDate: birthDate.value,
        gender: gender.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user

        await setDoc(doc(firestore, 'users', user.uid), payload)

        router.push({ name: 'Login', query: { email: email.value } })
    } catch (error) {
        console.error('Erro no cadastro:', error)
        alert('Erro ao criar conta. Verifique os dados e tente novamente.')
    }
}
</script>