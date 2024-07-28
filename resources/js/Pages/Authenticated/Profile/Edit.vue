<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import AppSettings from "@/Pages/Authenticated/Profile/Partials/AppSettings.vue";
import { Head } from '@inertiajs/vue3';

import { ref } from 'vue';
import Faq from '../../../Components/Authenticated/Faq.vue';
const data = [
    {
        "id": 1,
        "question": "App Settings",
        "description": "Manage the app settings",
        "form": AppSettings,
        "isOpen": false
    },
    {
        "id": 2,
        "question": "Account",
        "description": "Manage your account",
        "form": "AccountSettings",
        "isOpen": false
    },
    {
        "id": 3,
        "question": "Authorized Devices",
        "description": "Manage your logged-in devices",
        "isOpen": false
    },
    {
        "id": 4,
        "question": "Download",
        "description": "Manage settings related to asset download",
        "isOpen": false
    },
    {
        "id": 5,
        "question": "Memories",
        "description": "Manage what you see in your memories",
        "isOpen": false
    },
    {
        "id": 6,
        "question": "Notifications",
        "description": "Manage notifications",
        "isOpen": false
    },
    {
        "id": 7,
        "question": "Password",
        "description": "Change your password",
        "form": "DeleteUserForm",
        "isOpen": false
    },
    {
        "id": 8,
        "question": "Partner Sharing",
        "description": "Manage sharing with partners",
        "isOpen": false
    },
]

const faqs = ref(data)
const toggleAnswer = (id: any) => {
    faqs.value = faqs.value.map(faq => faq.isOpen && faq.id !== id ? {...faq, isOpen: false} : faq)
    faqs.value = faqs.value.map(faq => faq.id === id ? {...faq, isOpen: !faq.isOpen} : faq)
}

defineProps<{
    mustVerifyEmail?: boolean;
    status?: string;
}>();

</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
        <div class="py-12">

            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
<!--                <div class="p-4 sm:p-8 shadow sm:rounded-lg">-->
                    <div class="">
                        <Faq
                            v-for="faq in faqs"
                            :key="faq.id"
                            :faq="faq"
                            @toggle-answer="toggleAnswer"
                        />
                    </div>
<!--                </div>-->
<!--                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">-->
<!--                    <UpdateProfileInformationForm-->
<!--                        :must-verify-email="mustVerifyEmail"-->
<!--                        :status="status"-->
<!--                        class="max-w-xl"-->
<!--                    />-->
<!--                </div>-->

<!--                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">-->
<!--                    <UpdatePasswordForm class="max-w-xl" />-->
<!--                </div>-->

<!--                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">-->
<!--                    <DeleteUserForm class="max-w-xl" />-->
<!--                </div>-->
            </div>
        </div>
    </AuthenticatedLayout>
</template>

