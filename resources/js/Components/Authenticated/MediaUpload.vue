<script setup lang="ts">
import {useForm} from "@inertiajs/vue3";
import axios from "axios";

defineProps<{
    showPhoto?: boolean,
    showBanner?: boolean,
}>();

const form = useForm({
    image: File,
    ctime: <Number>0,
});

const submit = async () => {
    await axios.post('http://localhost:8000/upload', {
        image: form.image,
        ctime: form.ctime,
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

async function onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        for (const file of target.files) {
            (form.image as any) = file;
            form.ctime = file.lastModified;
            await submit();
        }
        window.location.href = "/photos"
    }
}
</script>

<template>

    <!-- Show Upload Dialog Box -->
    <input
        @change="onFileChanged($event)"
        id="file"
        type="file"
        multiple
        ref="file"
        class="hidden"
        required
    />

    <!-- Show Upload Image Banner When No Photos Are Present -->
    <div
        v-show="showPhoto"
        class="w-1/2 m-auto flex flex-col items-center place-items-center rounded-3xl bg-gray-50 p-5 border
            hover:cursor-pointer"
        @click="($refs.file as any).click()"
    >
        <img
            src="/assets/upload.png"
            alt=""
            width="672"
            draggable="false"
        >
        <p>CLICK TO UPLOAD YOUR FIRST PHOTO</p>
    </div>

    <!-- Show Upload Button On Header -->
    <div v-show="showBanner">
        <button
            @click="($refs.file as any).click()"
            type="button"
            title=""
            class="inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed p-2
                disabled:opacity-60 enabled:hover:text-gray-700 font-medium rounded-lg"
        >
            <span class="flex gap-2">
                <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" class=" " role="img">
                    <path
                        d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 2L6.46 7.46L7.88
                            8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z"
                        fill="currentColor"
                    />
                </svg>
                <span class="hidden md:block">Upload</span>
            </span>
        </button>
    </div>
</template>
