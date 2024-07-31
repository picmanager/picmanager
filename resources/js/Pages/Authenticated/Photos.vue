<script setup lang="ts">
import {Head} from '@inertiajs/vue3';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {ref} from "vue";
import MediaUpload from "@/Components/Authenticated/MediaUpload.vue";

defineProps<{
    status: any,
    data: any,
}>()

const isModalOpen = ref(false);
const modalImage = ref('');

function imgUrl(url: any) {
    return new URL(`../../../../storage/app/picmanager/${url}`, import.meta.url).href
}

function showModal(src: any) {
    isModalOpen.value = true;
    modalImage.value = src;
}

function closeModal() {
    isModalOpen.value = false;
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Photos"/>

        <!-- Show Upload Files Banner When No Photos Are Present -->
        <div v-if="Object.keys(data).length === 0" class="m-auto">
            <MediaUpload :showPhoto="true" :showBanner="false"/>
        </div>

        <!-- Show Images  -->
        <div
            v-if="Object.keys(data).length > 0"
            class="w-full flex flex-col items-center place-items-center rounded-3xl p-5"
        >
            <div
                v-for="item in data"
                class=" w-full h-full"
            >
                <div
                    :key="item.key"
                    class="flex pt-7 pb-5 h-10 place-items-center text-xs font-medium md:text-sm"
                >
                    <span class="w-full">{{ item.date }}</span>
                </div>

<!--                <div class="grid grid-cols-3 md:grid-cols-3 gap-4">-->
                <div class="flex flex-row flex-wrap w-full gap-1.5">
                    <div v-for="photo in item.photos" @click="showModal(imgUrl(photo))">
                        <img
                            :src="imgUrl(photo)"
                            class="w-72 h-56"
                            alt=""
                        >
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="isModalOpen"
            id="modal"
            class="fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center"
        >
            <a
                class="fixed z-90 top-6 right-8 text-white text-5xl font-bold"
                href="javascript:void(0)"
                @click="closeModal"
            >
                X
            </a>
            <img
                id="modal-img"
                class="max-w-[800px] max-h-[600px] object-cover"
                alt="image"
                :src="modalImage"
            >
        </div>
    </AuthenticatedLayout>
</template>
