<script setup lang="ts">
import {ref} from 'vue';
import Header from "@/Layouts/Partials/Authenticated/Header.vue";
import Navigation from "@/Layouts/Partials/Authenticated/Navigation.vue";

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div class="flex flex-col bg-gray-100 min-h-screen">
        <Header/>
        <div class="flex">
            <Navigation />
            <slot />
        </div>
<!--        <div class="min-h-screen bg-gray-100">-->

<!--            <nav class="bg-white border-b border-gray-100">-->
<!--            </nav>-->
<!--            &lt;!&ndash; Page Content &ndash;&gt;-->
<!--            <main>-->
<!--                <slot/>-->
<!--            </main>-->
<!--        </div>-->
    </div>
</template>
