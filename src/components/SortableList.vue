<script>
import { Sortable } from "@shopify/draggable"

function move(items, oldIndex, newIndex) {
  const itemRemovedArray = [
    ...items.slice(0, oldIndex),
    ...items.slice(oldIndex + 1, items.length)
  ]

  return [
    ...itemRemovedArray.slice(0, newIndex),
    items[oldIndex],
    ...itemRemovedArray.slice(newIndex, itemRemovedArray.length)
  ]
}

export default {
    props: {
        value: {
            required: true
        },
        search: {
            type: String
        },
        itemClass: {
            default: "sortable-list-item"
        },
        handleClass: {
            default: "sortable-list-handle"
        }
    },
    provide() {
        return {
            sortableListItemClass: this.itemClass,
            sortableListHandleClass: this.handleClass
        }
    },

    computed: {
        
        filteredValues() {
            return this.value.filter(value => {
                return value.name.toLowerCase().startsWith(this.search.toLowerCase())
            })
        }
    },

    
    mounted() {
      
        new Sortable(this.$el, {
            draggable: `.${this.itemClass}`,
            handle: `.${this.handleClass}`,
            mirror: { constrainDimensions: true }
        }).on("sortable:stop", ({ oldIndex, newIndex }) => {
            this.$emit("input", move(this.value, oldIndex, newIndex))
            this.$emit('detectChange')
        })
    },
    
    render() {
        return this.$scopedSlots.default({
            items: this.filteredValues
        })
    }
}
</script>

