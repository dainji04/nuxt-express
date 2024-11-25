<template>
    <div class="signup-container" style="margin-top: 50px">
        <h1>Sign Up</h1>
        <form
            @submit="handleSubmit"
            method="POST"
            action="localhost:8888/users/create"
        >
            <div class="form-group">
                <label for="username">Username:</label>
                <input v-model="form.user" type="text" id="username" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    v-model="form.password"
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'custom',
});
const form = reactive({
    user: '',
    email: '',
    password: '',
    role: 'user',
    createdAt: '',
    updatedAt: '',
    avatar: '',
});

const handleSubmit = async () => {
    try {
        const response = await fetch('http://localhost:8888/users/create', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            alert('User created successfully');
        } else {
            throw new Error('Failed to create user');
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

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
