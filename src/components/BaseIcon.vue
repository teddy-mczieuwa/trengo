<template>
    <svg :width="width" :height="height" :fill="fill">
        <use v-bind="{'xlink:href':'/'+iconType+'.svg#'+name}" />
    </svg>
</template>

<script>
export default {
    props: {
        name: String,
        iconType: {
            type: String,
            default: 'solid'
        },
        width: {
            type: [String,Number],
            default: '1rem'
        },
        height: {
            type: [String,Number],
            default: '1rem'
        },
        fill: {
            type: String,
        }
    }
}
</script>
