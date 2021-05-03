<template>
    <div class="card">
        <!-- search input -->
        <channel-input type="text" placeholder="Add Channel" v-model="channelInput" @keyup.enter="addChannel"/>
        <!-- end search input -->

        <!-- sortable list -->
        <sortable-list v-model="channels" @detectChange="detectChange" :search="channelInput">
        
            <div data-cy="channel-list" class="channel-list" slot-scope="{items: channels}">

                <!-- sortable item -->
                <sortable-item v-for="channel in channels" :key="channel.id">
                    <channel-list-item 
                        @deleteChannel="deleteChannel" 
                        :channel="channel" 
                        :name="channel.name" 
                        :iconType="channel.iconType" 
                        :icon="channel.icon"
                    />
                </sortable-item>
                <!-- end sortable item -->

            </div>
        </sortable-list>
       <!-- end sortable list -->

        <!-- buttons -->
        <Buttons v-show="changeDetected" @apply="save" @cancel="cancel"/>
        <!-- end buttons -->

    </div>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
import Buttons from '@/components/Buttons'
import SortableItem from '@/components/SortableItem'
import SortableList from '@/components/SortableList'
import ChannelListItem from '@/components/ChannelListItem'
import ChannelInput from '@/components/ChannelInput'
import channels from '@/db'

const STORAGE_KEY = "trengo-channels"

export default {
    components: { 
      BaseIcon,
      Buttons,
      SortableItem,
      SortableList,
      ChannelListItem,
      ChannelInput
    },

    data() {
        return {
            channelInput:"",
            channels: [],
            changeDetected: false
        }
    },

    mounted() {
        // get channels from localstorage if it exists
        // else get channels from local db
        // returns an array
        this.channels = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(channels));
    },

    methods: {
        // generates a random icon
        // returns a string
        generateIcon() {
            const icons = ["address-card","bookmark","calendar","comments","file","hand-pointer","id-card","image","newspaper","user"]
            const newNum = Math.floor(Math.random() * 6)
            return icons[newNum]
        },

        // adds a new item to the channel array
        // returns void
        addChannel() {
          
            if(this.channelInput.length > 0 && this.channelInput.trim() !== "") {
            
                this.channels.push({
                    id: Date.now(),
                    name: this.channelInput,
                    iconType: 'regular',
                    icon: this.generateIcon()
                })
                this.channelInput = ""
                this.detectChange()        
                 
            }
            
        },
   
        // removes an item from the channels array
        // returns void
        deleteChannel(channel) {
            this.channels.splice(this.channels.indexOf(channel), 1);
            this.detectChange()
        },
        
        // tracks changes made on the DOM
        // returns void
        detectChange() {
            this.changeDetected = true
        },

        // reverts all changes made on the channels array
        // returns void
        cancel() {
            this.channels = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(channels))
            this.changeDetected = false
        },

        // saves all changes made to channels array on localstorage
        // alerts the user that changes have been made on localstorage
        // returns void
        save() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.channels))
            this.changeDetected = false
            alert('Channel has been saved to localStorage')
        }

    }
}
</script>