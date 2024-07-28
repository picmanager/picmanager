<script setup lang="ts">
import InputToggle from "@/Components/Authenticated/InputToggle.vue";

const language = '';
const locale = '';
const original_photos = '';
const video_hover = '';
const loop_video = '';
const delete_warning = '';

</script>

<template>
    <section class="mt-6 space-y-8 flex flex-col justify-around">
        <InputToggle
            title="Language"
            label="Select your preferred language."
            v-model="language"
        />

        <InputToggle
            title="Default Locale"
            label="Format dates and numbers based on your browser locale."
            v-model="locale"
        />

        <InputToggle
            title="Display Original Photos"
            label="Prefer to display the original photo rather than thumbnails."
            v-model="original_photos"
        />

        <InputToggle
            title="Play Video on Hover"
            label="Play video when mouse is hovering over item."
            v-model="video_hover"
        />

        <InputToggle
            title="Loop Videos"
            label="Enable automatically looping over videos."
            v-model="loop_video"
        />

        <InputToggle
            title="Permanent Deletion Warning"
            label="Show a warning when permanently deleting assets"
            v-model="delete_warning"
        />
    </section>
</template>
