<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {MoonIcon, SunIcon} from "@heroicons/vue/20/solid";

const option = ref(localStorage.getItem('option'));

const setOption = () => {
    if (option.value === 'light') {
        localStorage.setItem('option', 'dark')
        option.value = 'dark'
    } else {
        localStorage.setItem('option', 'light')
        option.value = 'light'
    }
}

const setTheme = () => {
    if (option.value === 'system') {
        window.matchMedia('(prefers-color-scheme: dark)').matches ? toggleDarkClass('dark') : toggleDarkClass('light')
    } else {
        option.value === 'dark' ? toggleDarkClass('dark') : toggleDarkClass('light')
    }
};

const toggleDarkClass = (className: any) => {
    if (className === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

watch(option, setTheme);

onMounted(() => {
    if (!option.value) {
        localStorage.setItem('option', 'light')
        option.value = 'light'
    }

    setTheme();
});

</script>

<template>
    <div class="flex justify-center">
        <div class="relative">
            <button
                class="flex text-md border-2 border-transparent rounded-full focus:outline-none transition"
                @click="setOption"
            >
                <SunIcon
                    v-if="option === 'light'"
                    class="h-6 w-6"
                    aria-hidden="true"
                />
                <MoonIcon
                    v-if="option === 'dark'"
                    class="h-6 w-6"
                    aria-hidden="true"
                />
            </button>
        </div>
    </div>
</template>
