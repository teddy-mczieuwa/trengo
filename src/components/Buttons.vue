<template>
    <div class="buttons">
        <div class="flex justify-end">
            <button data-cy="btn-cancel" class="buttons--cancel focus:outline-none btn" @click="$emit('cancel')">Cancel</button>
            <button data-cy="btn-apply" class="buttons--apply focus:outline-none btn" @click="$emit('apply')">Apply</button>
        </div>
    </div>
</template>