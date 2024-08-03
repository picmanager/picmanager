import {onBeforeUpdate, onMounted} from "vue";

export default function useClickOutside(
    component,
    callback,
    excludeComponent
) {
    if (!component) {
        throw new Error('A target component has to be provided.')
    }

    if (!callback) {
        throw new Error('A callback has to be provided.')
    }

    const listener = (event) => {
        if (
            event.target === component.value ||
            event.composedPath().includes(component.value) ||
            event.target === excludeComponent.value ||
            event.composedPath().includes(excludeComponent.value)
        ) {
            return
        }
        if (typeof callback === 'function') {
            callback()
        }
    }

    onMounted(() => {
        window.addEventListener('click', listener)
    })

    onBeforeUpdate(() => {
        window.removeEventListener('click', listener)
    })
}
