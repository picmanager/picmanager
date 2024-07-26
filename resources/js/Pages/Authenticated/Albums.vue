<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

</script>

<template>
    <AuthenticatedLayout>
        <Head title="Albums"></Head>

        <div class="m-auto space-y-4 text-center ">
            <h1 class="font-bold text-2xl">Albums Page</h1>
            <h2 class="font-semibold text-xl">Under Construction</h2>
        </div>
<!--        <div v-for="photo in photos">-->
<!--            <h1>{{ photo.file_name }}</h1>-->
<!--            <img :src="photo.img_url" alt="">-->

<!--        </div>-->

    </AuthenticatedLayout>
</template>
