<template>
    <div class="p-4 space-y-4">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Profil Admin</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">Ubah informasi profil admin yang akan tampil di
                    aplikasi</p>
            </div>
        </div>

        <div class="card shadow-sm p-6">
            <form @submit.prevent="saveProfile" class="space-y-4 max-w-xl">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold">
                        {{ initials }}</div>
                    <div>
                        <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {{ profile.name || 'Admin' }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">{{ profile.email || 'admin@example.com' }}
                        </div>
                    </div>
                </div>

                <div>
                    <label class="text-xs text-gray-600 dark:text-gray-300">Nama</label>
                    <input v-model="profile.name" type="text"
                        class="w-full p-2 border rounded border-gray-200 dark:border-gray-800 bg-transparent text-sm text-gray-900 dark:text-gray-100" />
                    <div v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</div>
                </div>

                <div>
                    <label class="text-xs text-gray-600 dark:text-gray-300">Email</label>
                    <input v-model="profile.email" type="email"
                        class="w-full p-2 border rounded border-gray-200 dark:border-gray-800 bg-transparent text-sm text-gray-900 dark:text-gray-100" />
                    <div v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</div>
                </div>

                <div>
                    <label class="text-xs text-gray-600 dark:text-gray-300">Tentang (opsional)</label>
                    <textarea v-model="profile.about" rows="3"
                        class="w-full p-2 border rounded border-gray-200 dark:border-gray-800 bg-transparent text-sm text-gray-900 dark:text-gray-100"></textarea>
                </div>

                <div class="flex items-center gap-2">
                    <button type="submit" class="p-2 px-4 rounded bg-emerald-600 text-white text-sm">Simpan</button>
                    <button type="button" class="p-2 px-4 rounded border text-sm" @click="resetProfile">Batal</button>
                    <div v-if="success" class="ml-4 text-sm text-emerald-600">Profil tersimpan.</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const STORAGE_KEY = 'ecowatch-admin-profile';

const profile = ref({ name: '', email: '', about: '' });
const original = ref(null);
const errors = ref({});
const success = ref(false);

const loadProfile = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            profile.value = JSON.parse(raw);
        } catch (e) {
            profile.value = { name: 'Admin', email: 'admin@example.com', about: '' };
        }
    } else {
        profile.value = { name: 'Admin', email: 'admin@example.com', about: '' };
    }
    original.value = JSON.stringify(profile.value);
};

onMounted(loadProfile);

const initials = computed(() => {
    if (!profile.value || !profile.value.name) return 'AD';
    const parts = profile.value.name.split(' ').filter(Boolean);
    return (parts[0]?.[0] || 'A') + (parts[1]?.[0] || '').toUpperCase();
});

const validate = () => {
    errors.value = {};
    if (!profile.value.name || !profile.value.name.trim()) errors.value.name = 'Nama wajib diisi.';
    if (!profile.value.email || !/\S+@\S+\.\S+/.test(profile.value.email)) errors.value.email = 'Email tidak valid.';
    return Object.keys(errors.value).length === 0;
};

const saveProfile = () => {
    success.value = false;
    if (!validate()) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile.value));
    original.value = JSON.stringify(profile.value);
    success.value = true;
    setTimeout(() => (success.value = false), 2500);
};

const resetProfile = () => {
    if (original.value) {
        try {
            profile.value = JSON.parse(original.value);
        } catch (e) {
            loadProfile();
        }
    } else {
        loadProfile();
    }
    errors.value = {};
    success.value = false;
};
</script>
