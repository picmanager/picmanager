<script setup lang="ts">
import Dropdown from "@/Components/Authenticated/Dropdown.vue";
import DropdownLink from "@/Components/Authenticated/DropdownLink.vue";
</script>


<template>
    <header class="h-20 w-full border-b border-gray-300 grid grid-cols-3 items-center">
        <div class="text-center">
            <img alt="Logo" src="/assets/logo.jpeg" class="w-2/3 h-16"/>
        </div>
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
        <section
            class="flex place-items-center justify-end gap-4 max-sm:w-full"
        >
            <a href="/search" id="search-button" class="ml-4 sm:hidden">
                <button
                    title="Go to search"
                    type="button"
                    class="flex place-content-center place-items-center rounded-full bg-transparent
                        hover:bg-[#d3d3d3] p-3 transition-all"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        class=" "
                        role="img"
                        aria-label="Go to search"
                    >
                        <path
                            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59
                                14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41
                                11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12
                                7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </a>
            <button
                title="Toggle theme"
                type="button"
                class="flex place-content-center place-items-center rounded-full bg-transparent
                    hover:bg-[#d3d3d3] p-3 transition-all"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    class=" "
                    role="img"
                    aria-label="Toggle theme"
                >
                    <path
                        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                        fill="currentColor"
                    />
                </svg>
            </button>
            <div>
                <button
                    type="button"
                    title=""
                    class="inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed
                        disabled:opacity-60 enabled:hover:text-gray-700 enabled:hover: p-2 font-medium rounded-lg"
                >
                    <span class="flex gap-2">
                        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" class=" " role="img">
                            <path
                                d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2
                                    17V12M12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span class="hidden md:block">Upload</span>
                    </span>
                </button>
            </div>

            <div class="hidden sm:flex sm:items-center sm:ms-6">
                <!-- Settings Dropdown -->
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
                            <DropdownLink :href="route('profile.edit')"> Profile</DropdownLink>
                            <DropdownLink :href="route('logout')" method="post" as="button">
                                Log Out
                            </DropdownLink>
                        </template>
                    </Dropdown>
                </div>
            </div>
        </section>
    </header>
</template>
