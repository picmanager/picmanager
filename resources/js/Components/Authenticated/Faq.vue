<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

defineProps<{
    faq: any;
}>();


const emit = defineEmits<{
    'toggleAnswer': any;
}>()
const handleClick = (id: any) => emit('toggleAnswer', id)
</script>

<template>
    <div class="grow border-b border-gray-700">
        <div
            class="header flex px-4 py-8 hover:cursor-pointer items-center justify-between
                text-purple-400"
            @click="() => handleClick(faq.id)"
        >
            <div class="space-y-2">
                <h2 class="font-bold">
                    {{ faq.question }}
                </h2>
                <h3 class="text-gray-500 text-sm">
                    {{ faq.description }}
                </h3>
            </div>
            <div class="h-6 w-6">
                <ChevronDownIcon v-if="!faq.isOpen" />
                <ChevronUpIcon v-else />
            </div>
        </div>
        <div
            class="overflow-y-scroll leading-6"
            :class="['max-h-0', {'max-h-full': faq.isOpen}]"
        >
            <div class=" ml-4">
                <component :is="faq.form"/>
            </div>
        </div>
    </div>
</template>
