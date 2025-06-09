<script lang="ts">
  import { onMount } from 'svelte';
  
  let currentDate: string = '';
  
  async function fetchDate() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      currentDate = new Date(data.datetime).toLocaleDateString();
    } catch (error) {
      console.error('Error fetching date:', error);
      currentDate = new Date().toLocaleDateString();
    }
  }
  
  onMount(() => {
    fetchDate();
  });

  const defaultImage = 'https://images.unsplash.com/photo-1463171515643-952cee54d42a?q=80&w=450&h=190&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
</script>

<!-- svelte-ignore a11y_invalid_attribute -->
<a
  href="#"
  class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block max-w-md divide-y overflow-hidden"
>
  <header>
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img src={defaultImage} alt="Drug Image" />
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
  </footer>
</a>

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
</style> 