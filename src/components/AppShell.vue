<script setup lang="ts">
import { CircleDollarSign, Gamepad2, Joystick } from 'lucide-vue-next';

const links = [
  {
    to: '/pages/games',
    label: 'Games',
    icon: Gamepad2
  },
  {
    to: '/pages/slot',
    label: 'Slot',
    icon: Joystick
  },
  {
    to: '/pages/currency',
    label: 'Currency',
    icon: CircleDollarSign
  }
];
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <aside class="fixed inset-y-0 left-0 hidden w-64 border-r bg-card px-4 py-5 md:block">
      <div class="mb-8">
        <p class="text-sm font-medium text-muted-foreground">Skivori</p>
        <h1 class="mt-1 text-xl font-semibold tracking-normal">Game Console</h1>
      </div>

      <nav class="space-y-1">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          active-class="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <component :is="link.icon" class="h-4 w-4" />
          {{ link.label }}
        </RouterLink>
      </nav>
    </aside>

    <div class="md:pl-64">
      <header class="sticky top-0 z-10 border-b bg-background/95 backdrop-blur md:hidden">
        <nav class="grid grid-cols-3 gap-1 p-2">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium text-muted-foreground"
            active-class="bg-primary text-primary-foreground"
          >
            <component :is="link.icon" class="h-4 w-4" />
            {{ link.label }}
          </RouterLink>
        </nav>
      </header>

      <main class="container py-6 md:py-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
