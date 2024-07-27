<script setup lang="ts">
import {Head} from '@inertiajs/vue3';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import MediaUpload from "@/Components/Authenticated/MediaUpload.vue";

defineProps<{
    status: any,
    photos?: any,
}>();

function imgUrl(url: any) {
   return new URL(`../../../../storage/app/picmanager/${url}`, import.meta.url).href
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Photos"/>

        <!-- Show Upload Files Banner When No Photos Are Present -->
        <div v-if="!photos.length" class="m-auto">
            <MediaUpload :showPhoto="true" :showBanner="false"  />
        </div>

        <!-- Show Images  -->
        <div
            class="w-1/2 m-auto flex flex-col items-center place-items-center rounded-3xl bg-gray-50 p-5 border hover:cursor-pointer">
            <img v-for="photo in photos" :key="photo.id" :src="imgUrl(photo.name)" alt="">
        </div>
    </AuthenticatedLayout>
</template>
