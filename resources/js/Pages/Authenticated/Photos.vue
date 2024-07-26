<script setup lang="ts">
import {Head, useForm} from '@inertiajs/vue3';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

defineProps<{
    status: any,
    photos?: any,
}>();

const form = useForm({
    file: File,
});

const submit = () => {
    form.post(route('media.store'));
};

function onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        form.file = target.files[0];
    }
    submit();
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Photos"/>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>
        <div v-if="!photos.length" class="m-auto">

            <input
                @change="onFileChanged($event)"
                id="file"
                type="file"
                class="hidden"
                ref="file"
                required
            />
            <div
                class="w-1/2 m-auto flex flex-col items-center place-items-center rounded-3xl bg-gray-50 p-5 border hover:cursor-pointer"
                @click="($refs as any).file.click()"
            >
                <img
                    src="/assets/upload.png"
                    alt=""
                    width="672"
                    draggable="false"
                >
                <p>CLICK TO UPLOAD YOUR FIRST PHOTO</p>
            </div>
        </div>
        <div
            v-else
            class="w-1/2 m-auto flex flex-col items-center place-items-center rounded-3xl bg-gray-50 p-5 border hover:cursor-pointer"
        >
            <img v-for="photo in photos" :src="photo.img_url" alt="">
        </div>

    </AuthenticatedLayout>
</template>
