<template>
    <div class="channel-search">
        <base-icon class="channel-search__icon" width="1rem" height="1rem" fill="#b8c2cc" name="search" />
        <input class="channel-search__input" @keyup.enter="enter" @input="input" type="text" placeholder="Add Channel">
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String
        }
    },
    methods: {
        input(event) {
            this.$emit('input', event.target.value)
        },

        enter() {
            this.$emit('enter')
        }
    }
}
</script>