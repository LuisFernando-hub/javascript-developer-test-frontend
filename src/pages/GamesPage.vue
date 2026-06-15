<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Search } from 'lucide-vue-next';
import { getGames, type Game } from '@/lib/api';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import Input from '@/components/ui/input/Input.vue';
import router from '@/router';

const games = ref<Game[]>([]);
const search = ref('');
const loading = ref(true);
const error = ref('');
let searchTimeout: number | undefined;

const totalLabel = computed(() => `${games.value.length} found`);

async function loadGames() {
  loading.value = true;
  error.value = '';

  try {
    games.value = await getGames(search.value);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error loading games';
  } finally {
    loading.value = false;
  }
}

function normalizeImage(url?: string) {
  if (!url) {
    return '';
  }

  return url.startsWith('//') ? `https:${url}` : url;
}

watch(search, () => {
  window.clearTimeout(searchTimeout);
  searchTimeout = window.setTimeout(loadGames, 300);
});

function openGame(url?: string) {
  if (url) {
    window.location.href = url;
  }
}

onMounted(loadGames);
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">Catalog</p>
        <h1 class="mt-1 text-2xl font-semibold tracking-normal">Games</h1>
      </div>

      <div class="flex w-full gap-2 lg:max-w-md">
        <div class="relative flex-1">
          <Search class="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input v-model="search" class="pl-9" placeholder="Buscar por título" />
        </div>
        <Button variant="outline" @click="loadGames">To update</Button>
      </div>
    </div>

    <Card>
      <CardHeader class="flex-row items-center justify-between">
        <div>
          <CardTitle>Game list</CardTitle>
          <CardDescription>{{ totalLabel }}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div v-if="loading" class="text-sm text-muted-foreground">Loading games...</div>
        <div v-else-if="error" class="text-sm text-destructive">{{ error }}</div>
        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <article
            v-for="game in games"
            :key="game.id"
            class="overflow-hidden rounded-lg border bg-background"
            @click="openGame(game.startUrl)"
          >
            <img
              v-if="normalizeImage(game.thumb?.url)"
              :src="normalizeImage(game.thumb?.url)"
              :alt="game.title"
              class="aspect-square w-full object-cover"
            />
            <div v-else class="flex aspect-square items-center justify-center bg-muted text-sm text-muted-foreground">
              No image
            </div>

            <div class="space-y-1 p-3">
              <h2 class="line-clamp-2 min-h-10 text-sm font-semibold">{{ game.title }}</h2>
              <p class="text-xs text-muted-foreground">{{ game.provider ?? 'Provider unavailable' }}</p>
            </div>
          </article>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
