<script setup lang="ts">
import Dropdown from "@/Components/Authenticated/Dropdown.vue";
import MediaUpload from "@/Components/Authenticated/MediaUpload.vue";
import ThemeSwitch from "@/Layouts/Partials/Authenticated/ThemeSwitch.vue";
import { Cog8ToothIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/vue/24/outline";
import { PencilIcon } from "@heroicons/vue/24/solid";
import {Link} from "@inertiajs/vue3";

</script>

<template>
    <header class="h-20 w-full border-b border-gray-300 grid grid-cols-3 items-center">

        <!-- Logo Section -->
        <div class="text-center">
            <img alt="Logo" src="/assets/logo.jpeg" class="w-2/3 h-16"/>
        </div>
        <!-- End Log Section -->

        <!-- Search Section -->
        <div class="w-full relative">
            <form draggable="false" autoComplete="off" class="select-text text-sm" action="/search">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                        title="Search"
                        type="submit"
                        class="flex place-content-center place-items-center rounded-full bg-transparent
                            hover:bg-[#d3d3d3] p-3 transition-all"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            class=" "
                            role="img"
                            aria-label="Search"
                        >
                            <path
                                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59
                                    14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41
                                    11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7
                                    5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
                <label for="main-search-bar" class="sr-only">Search your photos</label>
                <input
                    type="text"
                    name="q"
                    id="main-search-bar"
                    class="w-full h-full px-14 py-4 rounded-3xl border border-transparent bg-gray-200"
                    placeholder="Search your photos"
                    required
                    pattern="^(?!m:$).*$"
                />
                <div class="absolute inset-y-0 right-2 flex items-center pl-6 transition-all">
                    <button
                        title="Show search options"
                        type="button"
                        class="flex place-content-center place-items-center rounded-full bg-transparent
                            hover:bg-[#d3d3d3] p-3 transition-all"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            class=" "
                            role="img"
                            aria-label="Show search options"
                        >
                            <path
                                d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
        <!-- End Search Section -->

        <div class="flex place-items-center justify-end gap-4 max-sm:w-full">

            <!-- Theme Switch -->
            <ThemeSwitch :showBanner="true"/>
            <!-- End Theme Switch -->

            <!-- Upload Button -->
            <MediaUpload :showPhoto="false" :showBanner="true"/>
            <!-- End Upload Button -->

            <!-- User Settings Dropdown -->
            <div class="hidden sm:flex sm:items-center sm:ms-6">
                <div class="ms-3 relative">
                    <Dropdown align="right" width="48">
                        <template #trigger>
                            <span class="inline-flex rounded-md">
                                <button
                                    type="button"
                                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm
                                        leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700
                                        focus:outline-none transition ease-in-out duration-150"
                                >
                                    <span
                                        class="w-12 h-12 bg-amber-600 border-2 transition-colors overflow-hidden
                                        shadow-md rounded-full"
                                    >
                                        <span
                                            class="flex h-full w-full select-none items-center justify-center
                                            font-medium text-lg"
                                        >
                                            {{ Array.from($page.props.auth.user.name)[0] }}
                                        </span>
                                    </span>
                                </button>
                            </span>
                        </template>

                        <template #content>
                            <div
                                class="absolute right-10 top-0 z-[100] w-[360px] rounded-3xl bg-gray-200
                                    shadow-lg"
                            >
                                <div
                                    class="mx-4 mt-4 flex flex-col items-center justify-center gap-4 rounded-3xl
                                        bg-white p-4"
                                >
                                    <div class="relative">
                                        <figure
                                            class="w-16 h-16 bg-gray-600 overflow-hidden shadow-md rounded-full"
                                        >
                                            <span
                                                class="flex h-full w-full select-none items-center justify-center
                                                    font-medium text-xl"
                                            >
                                                V
                                            </span>
                                        </figure>
                                        <div
                                            class="absolute z-10 bottom-0 right-0 rounded-full w-6 h-6"
                                        >
                                            <button
                                                type="button"
                                                class="flex place-content-center place-items-center rounded-full
                                                    text-white p-2 transition-all border bg-blue-600"
                                            >
                                                <PencilIcon class="size-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p
                                            class="text-center text-lg font-medium "
                                        >
                                            {{ $page.props.auth.user.name }}
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            {{ $page.props.auth.user.email }}
                                        </p>
                                    </div>
                                    <Link :href="route('profile.edit')">
                                        <div class="flex w-full place-items-center gap-4 overflow-hidden truncate">
                                            <button
                                                type="button"
                                                class="inline-flex items-center justify-center transition-colors px-4 py-2
                                                disabled:cursor-not-allowed disabled:opacity-60 text-sm border
                                                font-medium rounded-3xl"
                                            >
                                                <span class="flex place-content-center place-items-center gap-2 px-2">
                                                    <Cog8ToothIcon class="size-6" />
                                                    Account Settings
                                                </span>
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                                <div class="mb-4 flex flex-col">
                                    <Link :href="route('logout')" method="post">

                                    <button
                                        type="button"
                                        class="flex w-full place-content-center place-items-center gap-2 py-3
                                            font-medium text-gray-500"
                                    >
                                        <ArrowRightStartOnRectangleIcon class="size-6" />
                                        Sign Out
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
            </div>
            <!-- End User Settings Dropdown -->

        </div>
    </header>
</template>
