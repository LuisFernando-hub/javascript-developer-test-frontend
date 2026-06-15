<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BadgeDollarSign, RotateCcw } from 'lucide-vue-next';
import { getSlotBalance, spinSlot, type SlotSpin } from '@/lib/api';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';

const balance = ref(0);
const spin = ref<SlotSpin | null>(null);
const loading = ref(false);
const error = ref('');

async function loadBalance() {
  const data = await getSlotBalance();
  balance.value = data.balance;
}

async function play() {
  loading.value = true;
  error.value = '';

  try {
    const data = await spinSlot();
    spin.value = data;
    balance.value = data.balance;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao girar slot';
  } finally {
    loading.value = false;
  }
}

onMounted(loadBalance);
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <div class="space-y-2">
      <p class="text-sm font-medium text-muted-foreground">Machine</p>
      <h1 class="text-2xl font-semibold tracking-normal">Slot</h1>
    </div>

    <Card class="lg:col-span-2">
      <CardHeader class="flex-row items-center justify-between">
        <div>
          <CardTitle>Current round</CardTitle>
          <CardDescription>Each spin costs 1 coin.</CardDescription>
        </div>
        <div class="flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold">
          <BadgeDollarSign class="h-4 w-4 text-primary" />
          {{ balance }} coins
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-[1fr_220px] md:items-center">
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="(symbol, index) in spin?.result ?? ['?', '?', '?']"
              :key="`${symbol}-${index}`"
              class="flex aspect-square items-center justify-center rounded-lg border bg-muted text-4xl font-semibold"
            >
              {{ symbol }}
            </div>
          </div>

          <div class="space-y-3">
            <div v-if="spin" class="rounded-lg border bg-background p-4 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Reward</span>
                <strong>{{ spin.reward }}</strong>
              </div>
              <div class="mt-2 flex justify-between">
                <span class="text-muted-foreground">Net change</span>
                <strong>{{ spin.netChange }}</strong>
              </div>
            </div>

            <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

            <Button class="w-full" :disabled="loading" @click="play">
              <RotateCcw class="h-4 w-4" />
              {{ loading ? 'Spinning...' : 'Rotate slot' }}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
