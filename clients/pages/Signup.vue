<template>
    <div class="signup-container" style="margin-top: 50px">
        <h1 style="margin-bottom: 10px">Sign Up</h1>
        <form
            @submit="handleSubmit"
            method="POST"
            action="localhost:8888/users/create"
        >
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input
                        v-model="form.user"
                        @blur="$v.user.$touch()"
                        class="input"
                        type="text"
                        placeholder="Username"
                    />
                    <span class="icon is-small is-left">
                        <i class="fa-solid fa-user"></i>
                    </span>
                </p>
                <span class="has-text-danger" v-if="$v.user.$error">{{ $v.user.$errors[0].$message }}</span>
            </div>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input
                        v-model="form.email"
                        @blur="$v.email.$touch()"
                        class="input"
                        type="email"
                        placeholder="Email"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
                <span class="has-text-danger" v-if="$v.email.$error">{{ $v.email.$errors[0].$message }}</span>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input
                        v-model="form.password"
                        @blur="$v.password.$touch()"
                        class="input"
                        type="password"
                        placeholder="Password"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
                <span class="has-text-danger" v-if="$v.password.$error">{{ $v.password.$errors[0].$message }}</span>
            </div>
            <div class="file is-info has-name">
                <label class="file-label">
                    <input @change="onFileSelected" class="file-input" type="file" name="resume" />
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">Choose Avatar</span>
                    </span>
                    <span class="file-name">{{ form.filename }}</span>
                </label>
            </div>
            <button type="submit" class="button is-primary">Sign in</button>
        </form>
    </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

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
    filename: '',
    selectedFile: ''
});

const rules = computed(() => ({
    user: {
        required: helpers.withMessage('Username is required', required),
        minLength:  helpers.withMessage('length of name better than three character', minLength(3)),
        maxLength: helpers.withMessage('length of name less than 20 character', maxLength(20)),
    },
    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Email is invalid', email),
    },
    password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password must be at least 6 characters', minLength(6)),
    },
}));

const $v = useVuelidate(rules, form);

const onFileSelected = (e) => {
    form.selectedFile = e.target.files[0];
    console.log(form.selectedFile);
    form.filename = e.target.files[0].name;
    
}

const handleSubmit = async () => {
    $v.value.$touch();
    if ($v.value.$invalid) {
        return;
    }
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
    max-width: 550px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
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
