<template>
    <div class="card">
        <!-- search input -->
        <channel-input 
        type="text"
        placeholder="Add Channel" 
        v-model="channelInput" 
        @keyup.enter="addChannel"
        />
        <!-- end search input -->

        <!-- sortable list -->
        <sortable-list 
        v-model="channels" 
        @detectChange="detectChange" 
        :search="channelInput">
        
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
        <div v-show="changeDetected" class="buttons">
            <div class="flex justify-end">
                <button data-cy="btn-cancel" class="buttons--cancel focus:outline-none btn" @click="cancel">Cancel</button>
                <button class="buttons--apply focus:outline-none btn" @click="save">Apply</button>
            </div>
        </div>
        <!-- end buttons -->

    </div>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
import SortableItem from '@/components/SortableItem'
import SortableList from '@/components/SortableList'
import ChannelListItem from '@/components/ChannelListItem'
import ChannelInput from '@/components/ChannelInput'
import channels from '@/db'

const STORAGE_KEY = "trengo-channels"

export default {
    components: { 
      BaseIcon,
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
        
        this.channels = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(channels));
    },

    methods: {
        generateIcon() {
            const icons = ["address-card","bookmark","calendar","comments","file","hand-pointer","id-card","image","newspaper","user"]
            const newNum = Math.floor(Math.random() * 6)
            return icons[newNum]
        },

    
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
   

        deleteChannel(channel) {
            console.log(channel)
            this.channels.splice(this.channels.indexOf(channel), 1);
            this.detectChange()
        },
        detectChange() {
            this.changeDetected = true
        },

        cancel() {
            this.channels = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(channels))
            this.changeDetected = false
        },

        save() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.channels))
            alert('Data has been saved to localStorage')
        }

    }
}
</script>