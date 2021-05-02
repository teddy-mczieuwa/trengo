<template>
    <div class="card">
        <!-- search  -->
        <add-channel-input v-model="channelInput" @enter="addChannel"/>
        <!-- end search -->

        <!-- sortable list -->
        <sortable-list v-model="channels" :search="channelInput">
            <div class="channel-list" slot-scope="{items: channels}">
            <!-- sortable item -->
            
            <sortable-item v-for="channel in channels" :key="channel.id">
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
                            <base-icon  width="1rem" height="1rem" :iconType="channel.iconType" :name="channel.icon" />
                        </span>
                        <div class="channel-list-name">{{channel.name}}</div>
                    </div>

                    <div class="channel-list-action" @click="deleteChannel(channel)">
                        <span>Remove</span>
                    </div>
                </div>
            </sortable-item>
            
            <!-- end sortable item -->
            </div>
        </sortable-list>
        
       <!-- end sortable list -->

        <!-- buttons -->
        <div class="card__cta">
            <div class="flex justify-end">
                <button class="card__cta--cancel focus:outline-none btn" @click="cancel">Cancel</button>
                <button class="card__cta--apply focus:outline-none btn" @click="save">Apply</button>
            </div>
        </div>
        <!-- end buttons -->

    </div>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
import SortableItem from '@/components/SortableItem'
import SortableHandle from '@/components/SortableHandle'
import SortableList from '@/components/SortableList'
import AddChannelInput from '@/components/AddChannelInput'

const channels = [
    {
        id: 5,
        name: "Whatsapp Business Iceland",
        iconType:"brands",
        icon: "whatsapp"
    },
    {
        id: 4,
        name: "(test) development California",
        iconType:"regular",
        icon: "envelope"
    },
    {
        id: 3,
        name: "Whatsapp business",
        iconType:"brands",
        icon: "whatsapp"
    },
    {
        id: 2,
        name: "Call center",
        iconType:'solid',
        icon: "phone-alt"
    },
    {
        id: 1,
        name: "Team@trengo.com",
        iconType:'solid',
        icon: "phone-alt"
    }  
]

const STORAGE_KEY = "trengo-channels"

export default {
    components: { 
      BaseIcon,
      SortableItem,
      SortableHandle,
      SortableList,
      AddChannelInput
    },

    data() {
        return {
            channelInput:'',
            channels: []
        }
    },

    mounted() {
        
        this.channels = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(channels));
    },

    methods: {
        generateIcon() {
            const icons = ["address-card","bookmark","calendar","comments","file","hand-pointer","id-card","image","newspaper","user"]
            const newNum = Math.floor(Math.random() * 6)
            return icons[newNum]
        },

        addChannel() {
            this.channels.push({
                id: Date.now(),
                name: this.channelInput,
                iconType: 'regular',
                icon: this.generateIcon()
            })
            this.channelInput = ''
            console.log(this.channelInput)
        },
        deleteChannel(channel) {
            this.channels.splice(this.channels.indexOf(channel), 1);
        },

        cancel() {
            this.channels = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(channels))
        },

        save() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.channels))
        }

    }
}
</script>