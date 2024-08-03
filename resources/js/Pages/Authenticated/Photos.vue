<script setup lang="ts">
import {Head} from '@inertiajs/vue3';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {ref} from "vue";
import MediaUpload from "@/Components/Authenticated/MediaUpload.vue";
import {
    ArrowLeftIcon,
    CalendarDateRangeIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon, HeartIcon,
    InformationCircleIcon, MagnifyingGlassPlusIcon,
    MapPinIcon, PhotoIcon,
    ShareIcon, TrashIcon
} from "@heroicons/vue/24/outline";
import {PencilIcon} from "@heroicons/vue/24/solid";
import useClickOutside from "@/Components/useClickOutside";

defineProps<{
    status: any,
    data: any,
}>()

const componentRef = ref()
const excludeRef = ref()
const isInfoOpen = ref(false);
const isExtraMenuOpen = ref(false);
const isModalOpen = ref(false);
const modalImage = ref('');

function imgUrl(url: any) {
    return new URL(`../../../../storage/app/picmanager/${url}`, import.meta.url).href
}

function showModal(src: any) {
    if (isModalOpen.value === true) {
        isModalOpen.value = false;
        document.body.classList.remove("overflow-hidden");
        modalImage.value = '';
    } else {
        isModalOpen.value = true
        document.body.classList.add("overflow-hidden");
        modalImage.value = src;
    }
}

function showSize(size) {
    if (size >= 1000000) {
        return `${Math.round(((size / 1000000) + Number.EPSILON) * 100) / 100} MiB`
    } else {
        return `${Math.round(((size / 1000) + Number.EPSILON) * 100) / 100} KiB`
    }
}

function showDate(date) {
    const d = new Date(date)
    const weekday = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sut",
    ]
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return `${weekday[d.getDay()]}, ${month[d.getMonth()]} ${d.getDate()}  ${d.getFullYear()}`;
}

function showTime(time) {
    function addZero(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i;
    }

    const t = new Date(time);
    return `${addZero(t.getHours())}:${addZero(t.getMinutes())}`
}

function showInfo() {
    isInfoOpen.value = isInfoOpen.value !== true;
}

useClickOutside(
    componentRef,
    () => {
        isExtraMenuOpen.value = false
    },
    excludeRef
)

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

                <div class="flex flex-row flex-wrap w-full gap-1.5">
                    <div v-for="(photo, index) in item.photos.name" @click="showModal(photo)">
                        <img
                            :key="index"
                            :src="imgUrl(photo.name)"
                            class="h-56"
                            :class="{'w-80': item.photos.orientation === 'landscape', 'w-40': item.photos.orientation === 'portrait'}"
                            alt=""
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- Image Modal -->
        <section
            v-if="isModalOpen"
            class="fixed left-0 top-0 z-10 grid h-screen w-screen grid-cols-4 grid-rows-[64px_1fr] overflow-hidden bg-black"
        >
            <div class="z-50 col-span-4 col-start-1 row-span-1 row-start-1">
                <div class="z-30 flex h-16 place-items-center justify-between px-3">
                    <button
                        @click="isModalOpen = false"
                        title="Go back"
                        type="button"
                        class="p-3 bg-transparent hover:bg-gray-700 rounded-full"
                    >
                        <ArrowLeftIcon class="size-5 text-white"/>
                    </button>
                    <div class="flex w-[calc(100%-3rem)] justify-end gap-2 overflow-hidden">
                        <button
                            title="Share"
                            type="button"
                            class="p-3 bg-transparent hover:bg-gray-700 rounded-full"
                        >
                            <ShareIcon class="size-6 text-white"/>
                        </button>
                        <button
                            title="Zoom Image"
                            type="button"
                            class="p-3 bg-transparent hover:bg-gray-700 rounded-full"
                        >
                            <MagnifyingGlassPlusIcon class="size-6 text-white"/>
                        </button>
                        <button
                            @click="showInfo"
                            title="Info"
                            type="button"
                            class="p-3 bg-transparent hover:bg-gray-700 rounded-full"
                        >
                            <InformationCircleIcon class="size-6 text-white"/>
                        </button>
                        <button
                            title="Favorite"
                            type="button"
                            class="p-3 bg-transparent hover:bg-gray-700 rounded-full"
                        >
                            <HeartIcon class="size-6 text-white"/>
                        </button>
                        <button
                            title="Delete"
                            type="button"
                            class="p-3 bg-transparent hover:bg-gray-700 rounded-full"
                        >
                            <TrashIcon class="size-6 text-white"/>
                        </button>
                        <div class="relative inline-block">
                            <div>
                                <button
                                    ref="excludeRef"
                                    @click="isExtraMenuOpen = true"
                                    title="More"
                                    type="button"
                                    class="p-3 bg-transparent hover:bg-gray-700 rounded-full"
                                >
                                    <EllipsisVerticalIcon class="size-6 text-white"/>
                                </button>
                            </div>
                        </div>

                        <div
                            v-if="isExtraMenuOpen"
                            ref="componentRef"
                            class="absolute mt-5 top-0 z-50 min-w-[200px] w-max max-w-[300px] overflow-hidden rounded-lg bg-white"
                        >
                            <ul class="flex flex-col transition-all duration-[250ms] ease-in-out">
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                    cursor-pointer flex gap-2 items-center"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" role="img" aria-hidden="true">
                                        <path
                                            d="M2,3H10A2,2 0 0,1 12,1A2,2 0 0,1
                                            14,3H22V5H21V16H15.25L17,22H15L13.25,16H10.75L9,22H7L8.75,16H3V5H2V3M5,5V14H19V5H5M11.85,11.85C11.76,11.94
                                            11.64,12 11.5,12A0.5,0.5 0 0,1 11,11.5V7.5A0.5,0.5 0 0,1 11.5,7C11.64,7
                                            11.76,7.06 11.85,7.15L13.25,8.54C13.57,8.86 13.89,9.18 13.89,9.5C13.89,9.82
                                            13.57,10.14 13.25,10.46L11.85,11.85Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Slideshow</div>
                                </li>
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                    cursor-pointer flex gap-2 items-center"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M20 18H4V8H20M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2
                                                        2 0 0 0 22 18V8A2 2 0 0 0 20 6M14 9H16V13H19L15 17L11 13H14Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Download</div>
                                </li>
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                        cursor-pointer flex gap-2 items-center"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        class=" "
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M6,19L9,15.14L11.14,17.72L14.14,13.86L18,19H6M6,4H11V12L8.5,10.5L6,12M18,2H6A2,2
                                                        0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Add to album</div>
                                </li>
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                    cursor-pointer flex gap-2 items-center"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        class=" "
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96
                                                        12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69
                                                        17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15
                                                        5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9
                                                        3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16
                                                        18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91
                                                        18 21.91S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18
                                                        16.08M18 4C18.55 4 19 4.45 19 5S18.55 6 18 6 17 5.55 17 5 17.45
                                                        4 18 4M6 13C5.45 13 5 12.55 5 12S5.45 11 6 11 7 11.45 7 12 6.55
                                                        13 6 13M18 20C17.45 20 17 19.55 17 19S17.45 18 18 18 19 18.45 19
                                                        19 18.55 20 18 20Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Add to shared album</div>
                                </li>
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                        cursor-pointer flex gap-2 items-center"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        class=" "
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10
                                                        0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5
                                                        16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20
                                                        8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5
                                                        12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82
                                                        4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82
                                                        19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44
                                                        10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6
                                                        12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0
                                                        0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Set as profile picture</div>
                                </li>
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                        cursor-pointer flex gap-2 items-center"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        class=" "
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M5 5V7H19V5M10.5
                                                        11V14H8L12 18L16 14H13.5V11"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Archive</div>
                                </li>
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                        cursor-pointer flex gap-2 items-center"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        class=" "
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Replace with upload</div>
                                </li>
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                        cursor-pointer flex gap-2 items-center"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        class=" "
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18
                                                        9.64V12.03C18.17 12 18.33 12 18.5 12C19 12 19.5 12.07 20
                                                        12.18V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12
                                                        21C12.17 21 12.33 21 12.5 21C12.24 20.37 12.09 19.7 12.03 19L12
                                                        19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.17 16
                                                        12.34 16 12.5 16C12.85 15.18 13.34 14.46 13.95 13.86C13.32 13.95
                                                        12.67 14 12 14C9.58 14 7.3 13.4 6 12.45M12 5C15.87 5 18 6.5 18
                                                        7S15.87 9 12 9 6 7.5 6 7 8.13 5 12 5M18 18.5L19.77 16.73C19.32
                                                        16.28 18.69 16 18 16C16.62 16 15.5 17.12 15.5 18.5S16.62 21 18
                                                        21C18.82 21 19.54 20.61 20 20H21.71C21.12 21.47 19.68 22.5 18
                                                        22.5C15.79 22.5 14 20.71 14 18.5S15.79 14.5 18 14.5C19.11 14.5
                                                        20.11 14.95 20.83 15.67L22 14.5V18.5H18Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Refresh metadata</div>
                                </li>
                                <li
                                    class="w-full p-4 text-left text-sm font-medium hover:bg-gray-500 hover:text-white
                                        cursor-pointer flex gap-2 items-center"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        class=" "
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M14.68 13.25C13.45 14.15 12.54 15.47 12.18 17H6.5L9.25
                                                        13.47L11.21 15.83L13.96 12.29L14.68 13.25M5 19V5H19V12.03C19.7
                                                        12.09 20.38 12.24 21 12.5V5C21 3.9 20.11 3 19 3H5C3.9 3 3 3.9 3
                                                        5V19C3 20.11 3.9 21 5 21H12.5C12.24 20.38 12.09 19.7 12.03
                                                        19H5M22 18.5V14.5L20.83 15.67C20.11 14.95 19.11 14.5 18
                                                        14.5C15.79 14.5 14 16.29 14 18.5S15.79 22.5 18 22.5C19.68 22.5
                                                        21.12 21.47 21.71 20H20C19.54 20.61 18.82 21 18 21C16.62 21 15.5
                                                        19.88 15.5 18.5S16.62 16 18 16C18.69 16 19.32 16.28 19.77
                                                        16.73L18 18.5H22Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div>Refresh thumbnails</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div class="z-30 my-auto column-span-1 col-start-1 row-span-full row-start-1 justify-self-start">
                <button
                    type="button"
                    class="my-auto mx-4 rounded-full p-3 text-gray-500 hover:bg-gray-500 hover:text-white"
                    aria-label="View previous asset"
                >
                    <ChevronLeftIcon class="size-6 fill-current"/>
                </button>
            </div>
            <div class="z-20 relative col-start-1 col-span-4 row-start-1 row-span-full overflow-hidden">
                <img
                    :src="imgUrl(modalImage.name)"
                    alt="Image taken on 5 May 2024"
                    class="h-full w-full object-contain"
                    draggable="false"
                >
            </div>
            <div class="z-30 my-auto col-span-1 col-start-4 row-span-full row-start-1 justify-self-end">
                <button
                    type="button"
                    class="my-auto mx-4 rounded-full p-3 text-gray-500 transition hover:bg-gray-500 hover:text-white"
                    aria-label="View next asset"
                >
                    <ChevronRightIcon class="size-6 fill-current"/>
                </button>
            </div>
            <div
                v-if="isInfoOpen"
                class="z-20 row-start-1 row-span-4 w-[360px] overflow-y-auto transition-all bg-white"
            >
                <section class="relative p-2">
                    <div class="flex place-items-center gap-2">
                        <button
                            @click="showInfo"
                            title="Close"
                            type="button"
                            class="flex place-content-center place-items-center rounded-full bg-transparent
                                hover:bg-[#d3d3d3] d p-3 transition-all"

                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" class=" " role="img" aria-label="Close">
                                <path
                                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <p class="text-lg">
                            Info
                        </p>
                    </div>
                    <section class="px-4 mt-10">
                        <textarea
                            class="resize-none max-h-[500px] w-full text-black border-b border-gray-400 border-0
                                focus:border-gray-400 focus:ring-0"
                            placeholder="Add a description"
                            style="height: 51px;"
                        ></textarea>
                    </section>
                    <div class="px-4 py-4">
                        <div class="flex h-10 w-full items-center justify-between text-sm">
                            <h2>DETAILS</h2>
                        </div>
                        <div
                            class="flex w-full text-left justify-between place-items-start gap-4 py-4"
                            title="Edit date"
                        >
                            <div class="flex gap-4">
                                <div>
                                    <CalendarDateRangeIcon class="size-6"/>
                                </div>
                                <div>
                                    <p>{{ showDate(modalImage.original_date) }}</p>
                                    <div class="flex gap-2 text-sm">
                                        <p>{{ showTime(modalImage.original_date) }} GMT+02:00</p>
                                    </div>
                                </div>
                            </div>
                            <div class="p-1">
                                <PencilIcon class="size-4 "/>

                            </div>
                        </div>
                        <div class="flex gap-4 py-4">
                            <div>
                                <PhotoIcon class="size-6"/>
                            </div>
                            <div>
                                <p class="break-all flex place-items-center gap-2">
                                    {{ modalImage.file_name }}
                                </p>
                                <div class="flex gap-2 text-sm">
                                    <p>{{ Math.round((modalImage.megapixel * 100) / 100) }}MP</p>
                                    <p>{{ modalImage.width }} x {{ modalImage.height }}</p>
                                    <p>{{ showSize(modalImage.size) }}</p></div>
                            </div>
                        </div>
                        <div
                            v-if="modalImage.make_model !== null || modalImage.aperture !== null || modalImage.exposure_time !== null || modalImage.focal_length !== null || modalImage.iso !== null"
                            class="flex gap-4 py-4"
                        >
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" class=" " role="img">
                                    <path
                                        d="M13.73,15L9.83,21.76C10.53,21.91 11.25,22 12,22C14.4,22 16.6,21.15
                                            18.32,19.75L14.66,13.4M2.46,15C3.38,17.92 5.61,20.26
                                            8.45,21.34L12.12,15M8.54,12L4.64,5.25C3,7 2,9.39 2,12C2,12.68
                                            2.07,13.35 2.2,14H9.69M21.8,10H14.31L14.6,10.5L19.36,18.75C21,16.97 22,14.6
                                            22,12C22,11.31 21.93,10.64 21.8,10M21.54,9C20.62,6.07 18.39,3.74
                                            15.55,2.66L11.88,9M9.4,10.5L14.17,2.24C13.47,2.09 12.75,2
                                            12,2C9.6,2 7.4,2.84 5.68,4.25L9.34,10.6L9.4,10.5Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p>{{ modalImage.make_model }}</p>
                                <div class="flex gap-2 text-sm">
                                    <p>{{ modalImage.aperture }}</p>
                                    <p>{{ modalImage.exposure_time }}</p>
                                    <p>{{ modalImage.focal_length }}</p>
                                    <p v-if="modalImage.iso !== null">ISO{{ modalImage.iso }}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex w-full text-left justify-between place-items-start gap-4 py-4 rounded-lg"
                        >
                            <div class="flex gap-4">
                                <div>
                                    <MapPinIcon class="size-6"/>
                                </div>
                                <p>Add a location</p>
                            </div>
                            <div class="focus:outline-none p-1">
                                <PencilIcon class="size-4 "/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        <!-- End Image Modal -->

    </AuthenticatedLayout>
</template>
