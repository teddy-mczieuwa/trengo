<template>
    <div class="channel-search">
        <base-icon class="channel-search__icon" width="1rem" height="1rem" fill="#b8c2cc" name="search" />
        <input 
            data-cy="channel-search" 
            class="channel-search__input" 
            v-bind="$attrs"
            @input="$emit('update', $event.target.value)" 
            v-on="$listeners"
            :value="value"
        />
    </div>
</template>

<script>

export default {
    inheritAttrs: false,
    model: {
        event: 'update'
    },
    props: {
        value: {
            type: String,
            required: true
        }
    }
}
</script>