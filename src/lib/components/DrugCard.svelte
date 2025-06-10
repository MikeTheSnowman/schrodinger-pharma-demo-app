<script lang="ts">
  import { onMount } from 'svelte';
  
  export let medicationId: string = '';
  export let imageUrl: string = 'https://images.unsplash.com/photo-1463171515643-952cee54d42a?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  let currentDate: string = '';
  let recallStatus: boolean = false;

  // interface RecallStatusResponse {
  //   recallStatus: string | null;
  // }

  function stringToBool(str: string): boolean {
    return str.toLowerCase() === 'true';
  }

  async function fetchMedicationData() {
    if (!medicationId) return;
    
    try {
      const response = await fetch(`/api/recall-status?medicationId=${medicationId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recall status');
      }
      //const data = await response.json() as RecallStatusResponse;
      const data = await response.json();
      recallStatus = data ? stringToBool(data.toString()) : false;
    } catch (error) {
      console.error('Error fetching recall status:', error);
      recallStatus = false;
    }
  }

  async function fetchDate() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json() as { datetime: string };
      currentDate = new Date(data.datetime).toLocaleDateString();
    } catch (error) {
      console.error('Error fetching date:', error);
      currentDate = new Date().toLocaleDateString();
    }
  }
  
  onMount(() => {
    fetchDate();
    fetchMedicationData();
  });
</script>

<!-- svelte-ignore a11y_invalid_attribute -->
<div class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block max-w-md divide-y overflow-hidden">
  <header class="flex justify-center items-center">
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img src={imageUrl} alt="Drug Image" style="max-width: 400px; max-height: 200px;" />
  </header>
  
  <article class="space-y-4 p-4">
    <h3 class="h3"> 
      <slot name="header"> Medication name missing </slot>
    </h3>
    <p class="opacity-60">
      <slot name="description" > Description missing </slot>
    </p>
  </article>
  
  <footer class="flex items-center justify-between gap-4 p-4">
    <small class="opacity-60">Last Updated</small>
    <small class="opacity-60">On {currentDate}</small>
    {#if recallStatus}
      <small class="opacity-60">Recall Status: <div class="text-red-500 text-bold text-alert">RECALLED</div></small>
    {:else}
      <small class="opacity-60">Recall Status: <div class="text-green-500">Not Recalled</div></small>
    {/if}

  </footer>
</div>

<style>
  .card {
    margin: 1rem;
  }

  .card-hover {
    transition: transform 0.2s ease-in-out;
  }
  
  .card-hover:hover {
    transform: translateY(-4px);
  }

  @keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.25;
    }

    100% {
        opacity: 1;
    }
  }

  .text-alert {
    font-weight: bold;
    animation: blink 2s infinite;
  }
</style> 