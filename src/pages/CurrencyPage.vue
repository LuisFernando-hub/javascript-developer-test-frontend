<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ArrowRightLeft } from 'lucide-vue-next';
import { convertBalance, getSlotBalance, type CurrencyConversion } from '@/lib/api';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import Select from '@/components/ui/select/Select.vue';

const currencies = ['EUR', 'GBP', 'BRL', 'CAD'];
const amount = ref(20);
const currency = ref('EUR');
const result = ref<CurrencyConversion | null>(null);
const error = ref('');
const loading = ref(false);

async function loadCurrentBalance() {
  const data = await getSlotBalance();
  amount.value = data.balance;
}

async function convert() {
  loading.value = true;
  error.value = '';
  result.value = null;

  try {
    result.value = await convertBalance(Number(amount.value), currency.value);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error converting balance';
  } finally {
    loading.value = false;
  }
}

onMounted(loadCurrentBalance);
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6">
    <div>
      <p class="text-sm font-medium text-muted-foreground">Balance</p>
      <h1 class="mt-1 text-2xl font-semibold tracking-normal">Currency</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Balance conversion</CardTitle>
        <CardDescription>Use the existing backend endpoint to display the converted value.</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4 sm:grid-cols-[1fr_160px_auto]" @submit.prevent="convert">
          <div class="space-y-2">
            <Label for="amount">Amount</Label>
            <Input id="amount" v-model="amount" type="number" min="0" />
          </div>

          <div class="space-y-2">
            <Label for="currency">Currency</Label>
            <Select id="currency" v-model="currency" :options="currencies" />
          </div>

          <div class="flex items-end">
            <Button class="w-full" type="submit" :disabled="loading">
              <ArrowRightLeft class="h-4 w-4" />
              {{ loading ? 'Convertendo...' : 'Converter' }}
            </Button>
          </div>
        </form>

        <div v-if="error" class="mt-4 text-sm text-destructive">{{ error }}</div>

        <div v-if="result" class="mt-5 rounded-lg border bg-background p-4">
          <p class="text-sm text-muted-foreground">Display balance</p>
          <p class="mt-1 text-2xl font-semibold">
            {{ result.convertedAmount }} {{ result.currency }}
          </p>
          <p class="mt-2 text-sm text-muted-foreground">Rate: {{ result.rate }}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
