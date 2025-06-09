<script>
	import DrugCard from '$lib/components/DrugCard.svelte';
</script>

<div class="container mx-auto">
	<h1 class="h1 mb-8">Medicine Catalog</h1>

	<DrugCard>
		<div slot="header">Paracetamol</div>
		<span slot="description">
			A non-opioid analgesic and antipyretic agent used to treat fever and mild to moderate pain.
		</span>
	</DrugCard>

	<!-- <DrugCard>
		<div slot="header">Phoenix Down</div>
		<div slot="description">
			A non-opioid analgesic and antipyretic agent used to treat fever and mild to moderate pain.
		</div>
	</DrugCard> -->
</div>
