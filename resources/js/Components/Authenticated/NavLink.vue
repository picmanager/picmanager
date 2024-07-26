<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps<{
    href: string;
    active?: boolean;
}>();

const classes = computed(() =>
    props.active
        ? 'flex h-14 w-full place-items-center justify-between gap-4 rounded-r-full py-3 hover:cursor-pointer hover:bg-gray-200/50 hover:text-blue-500 grou-hover:sm:px-5 md:px-5 hover:underline text-blue-500 bg-gray-200'
        : 'flex h-14 w-full place-items-center justify-between gap-4 rounded-r-full py-3 hover:cursor-pointer hover:bg-gray-200/50 hover:text-blue-500 grou-hover:sm:px-5 md:px-5 hover:underline text-black'
            // ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
        // : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
);
</script>

<template>
    <Link :href="href" :class="classes">
        <div class="flex w-full place-items-center gap-4 overflow-hidden truncate">
            <slot />
        </div>
    </Link>
</template>
