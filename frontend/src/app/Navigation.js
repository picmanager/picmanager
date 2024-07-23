import {usePathname} from "next/navigation";
import {
    ArchiveBoxIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    MapIcon,
    PhotoIcon,
    ShareIcon, TrashIcon
} from "@heroicons/react/24/outline";
import NavLink from '@/components/NavLink'

const Navigation = () => {
    return (
        <section
            id="sidebar"
            tabIndex="-1"
            className="immich-scrollbar group relative z-10 flex w-18 flex-col gap-1 overflow-y-auto
                            bg-immich-bg pt-8 transition-all duration-200 hover:sm:w-64 hover:sm:border-r hover:sm:pr-6
                            hover:sm:shadow-2xl md:w-64 md:pr-6 hover:md:border-none hover:md:shadow-none"
        >
            <nav aria-label="Primary">
                <NavLink
                    href="/photos"
                    active={usePathname() === '/home'}
                >
                    <PhotoIcon className="size-6"/>
                    <span className="text-sm font-medium">Photos</span>
                </NavLink>

                <NavLink
                    href="/explore"
                    active={usePathname() === '/explore'}
                >
                    <MagnifyingGlassIcon className="size-6"/>
                    <span className="text-sm font-medium">Explore</span>
                </NavLink>

                <NavLink
                    href="/explore"
                    active={usePathname() === '/map'}
                >
                    <MapIcon className="size-6"/>
                    <span className="text-sm font-medium">Map</span>
                </NavLink>

                <NavLink
                    href="/sharing"
                    active={usePathname() === '/sharing'}
                >
                    <ShareIcon className="size-6"/>
                    <span className="text-sm font-medium">Share</span>
                </NavLink>

                <div className="text-xs transition-all duration-200">
                    <p className="hidden p-6 group-hover:sm:block md:block">LIBRARY</p>
                    <hr className="mx-4 mb-[31px] mt-8 block group-hover:sm:hidden md:hidden"/>
                </div>

                <NavLink
                    href="/favorites"
                    active={usePathname() === '/favorites'}
                >
                    <HeartIcon className="size-6"/>
                    <span className="text-sm font-medium">Favorites</span>
                </NavLink>

                <NavLink
                    href="/albums"
                    active={usePathname() === '/albums'}
                >
                    <DocumentTextIcon className="size-6"/>
                    <span className="text-sm font-medium">Albums</span>
                </NavLink>

                <NavLink
                    href="/utilities"
                    active={usePathname() === '/utilities'}
                >
                    <BriefcaseIcon className="size-6"/>
                    <span className="text-sm font-medium">Utilities</span>
                </NavLink>

                <NavLink
                    href="/archive"
                    active={usePathname() === '/archive'}
                >
                    <ArchiveBoxIcon className="size-6"/>
                    <span className="text-sm font-medium">Archive</span>
                </NavLink>

                <NavLink
                    href="/trash"
                    active={usePathname() === '/trash'}
                >
                    <TrashIcon className="size-6"/>
                    <span className="text-sm font-medium">Trash</span>
                </NavLink>
            </nav>
            <div className="mt-auto">
                <div
                    className="hidden md:block storage-status p-4 bg-gray-100 ml-4 rounded-lg text-sm"
                    title="106.358 GiB of 475.353 GiB used"
                >
                    <div className="hidden group-hover:sm:block md:block">
                        <p className="font-medium text-immich-dark-gray">
                            Storage space
                        </p>
                        <p className="text-gray-500">
                            106.4 GiB of 475.4 GiB used
                        </p>
                        <div className="mt-4 h-[7px] w-full rounded-full bg-gray-200">
                            <div
                                className="h-[7px] rounded-full bg-immich-primary"
                            >

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className="hidden md:block license-status pl-4 text-sm">
                    <button
                        type="button"
                        className="py-3 px-2 flex justify-between place-items-center place-content-center
                                        border border-gray-300 mt-2 rounded-lg shadow-sm"
                    >
                        <div className="flex place-items-center place-content-center gap-1">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                className="text-immich-dark-gray/75"
                                role="img"
                            >
                                <path
                                    d="M9 10A3.04 3.04 0 0 1 12 7A3.04 3.04 0 0 1 15 10A3.04 3.04 0 0 1 12
                                                    13A3.04 3.04 0 0 1 9 10M12 19L16 20V16.92A7.54 7.54 0 0 1 12 18A7.54
                                                    7.54 0 0 1 8 16.92V20M12 4A5.78 5.78 0 0 0 7.76 5.74A5.78 5.78 0 0
                                                    0 6 10A5.78 5.78 0 0 0 7.76 14.23A5.78 5.78 0 0 0 12 16A5.78 5.78 0
                                                    0 0 16.24 14.23A5.78 5.78 0 0 0 18 10A5.78 5.78 0 0 0 16.24
                                                    5.74A5.78 5.78 0 0 0 12 4M20 10A8.04 8.04 0 0 1 19.43 12.8A7.84 7.84
                                                    0 0 1 18 15.28V23L12 21L6 23V15.28A7.9 7.9 0 0 1 4 10A7.68 7.68 0 0
                                                    1 6.33 4.36A7.73 7.73 0 0 1 12 2A7.73 7.73 0 0 1 17.67 4.36A7.68 7.
                                                    68 0 0 1 20 10Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <p className="text-immich-dark-gray/75">Unlicensed</p>
                        </div>
                        <div className="text-immich-primary flex place-items-center gap-[2px] font-medium">
                            Buy
                            <span role="contentinfo">
                                            <svg
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 24 24"
                                                className=" "
                                                role="img"
                                            >
                                                <path
                                                    d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4
                                                        12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0
                                                        0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0
                                                        12,2M11,17H13V11H11V17Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="mb-6">
                <div
                    className="text-sm hidden group-hover:sm:flex md:flex pl-5 pr-1 place-items-center
                                    place-content-center justify-between"
                >
                    <div className="flex gap-2 place-items-center place-content-center">
                        <div className="w-[7px] h-[7px] bg-green-500 rounded-full"></div>
                        <p className="">Server Online</p>
                    </div>
                    <div className="flex justify-between justify-items-center">
                        <button type="button" className="">v1.109.2</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navigation