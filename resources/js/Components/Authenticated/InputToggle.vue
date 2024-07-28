<script setup lang="ts">
import {ref} from "vue";

defineProps<{
    value?: string;
    title?: string;
    label?: string;
}>();

const model = defineModel<string>({ required: true });

const input = ref<HTMLInputElement | null>(null);
</script>
<template>
    <div>
        <header class="font-semibold text-violet-400">
            {{ title }}
        </header>
        <label class="flex justify-between cursor-pointer">
            <span v-if="label">{{ label }}</span>
            <input
                type="checkbox"
                class="sr-only peer"
                v-model="model"
                ref="input"
            >
            <span
                class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:w-5
                    after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:h-5
                    after:rounded-full after:transition-all peer-checked:bg-blue-600"
            ></span>
        </label>
    </div>
</template>
