<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

defineProps<{
  modelValue: string;
  options: string[];
  class?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const classes = computed(() => cn(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
));
</script>

<template>
  <select
    :value="modelValue"
    :class="cn(classes, $props.class)"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
