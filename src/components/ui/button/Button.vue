<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<{
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'icon';
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}>(), {
  variant: 'default',
  size: 'default',
  type: 'button'
});

const classes = computed(() => cn(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    'bg-primary text-primary-foreground hover:bg-primary/90': props.variant === 'default',
    'bg-secondary text-secondary-foreground hover:bg-secondary/80': props.variant === 'secondary',
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground': props.variant === 'outline',
    'hover:bg-accent hover:text-accent-foreground': props.variant === 'ghost',
    'bg-destructive text-destructive-foreground hover:bg-destructive/90': props.variant === 'destructive',
    'h-10 px-4 py-2': props.size === 'default',
    'h-9 rounded-md px-3': props.size === 'sm',
    'h-10 w-10': props.size === 'icon'
  },
  props.class
));
</script>

<template>
  <button :type="type" :class="classes">
    <slot />
  </button>
</template>
