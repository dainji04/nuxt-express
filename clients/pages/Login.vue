<script setup>
import axios from 'axios';

definePageMeta({
    layout: 'custom',
});

const formData = reactive({
    email: '',
    password: '',
});

const handleSubmit = async () => {
    try {
        const response = await axios.post(
            'http://localhost:8888/users/login',
            formData
        );
        console.log('Response:', response.data);

        localStorage.setItem('Authtoken', response.data.token);
    } catch (error) {
        console.error('Error:', error);
    }

    // useRouter().replace('/');
};
</script>

<template>
    <div class="signup-container" style="margin-top: 50px">
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="email" v-model="formData.email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="formData.password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>
.signup-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
