<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { Chart as ChartType } from 'chart.js';

  let canvas: HTMLCanvasElement;
  let chart: ChartType<'line'> | null = null;

  async function loadData(): Promise<number[]> {
    const res = await fetch('/api/data');
    const json = await res.json();
    return json.data;
  }

  onMount(async () => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initialData = await loadData();

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: initialData.map((_, i: number) => i + 1),
        datasets: [
          {
            label: 'Light Level',
            data: initialData,
            fill: true,
            borderColor: 'rgb(59,130,246)',
            backgroundColor: 'rgba(59,130,246,0.2)',
            tension: 0.4
          }
        ]
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 100
          }
        }
      }
    });

    setInterval(async () => {
      const newData = await loadData();
      if (chart) {
        chart.data.labels = newData.map((_, i: number) => i + 1);
        chart.data.datasets[0].data = newData;
        chart.update("none");
      }
    }, 500);
  });
</script>

<div class="min-h-screen bg-gray-100 p-6">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Light Level Dashboard</h1>
    <div class="bg-white p-6 rounded-2xl shadow">
      <h2 class="text-lg font-semibold mb-4">Sensor</h2>
      <canvas bind:this={canvas}></canvas>
    </div>
  </div>
</div>

<style>
  canvas { max-height: 300px; }
</style>