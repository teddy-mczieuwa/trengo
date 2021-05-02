<template>
    <div class="channel-list-item">
        <div class="channel-list-info">

            <!-- sortable handle -->
            <sortable-handle>
                <span class="channel-list-handle">
                    <base-icon name="grip-vertical" fill="#b8c2cc"/>  
                </span>
            </sortable-handle>                   
            <!-- end sortable handle -->

            <span class="channel-icon-tile">
                <base-icon  width="1rem" height="1rem" :iconType="iconType" :name="icon" />
            </span>
            <div class="channel-list-name">{{name}}</div>
        </div>

        <div class="channel-list-action" @click="deleteChannel(channel)">
            <span>Remove</span>
        </div>
    </div>
</template>

<script>
import SortableHandle from '@/components/SortableHandle'

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        channel: {
            type: Object,
            required: true
        },
        iconType: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    },
    components: {
        SortableHandle
    },
    methods: {
        deleteChannel(value) {
            this.$emit('deleteChannel', value)
        }
    }
}
</script>