<script>
	import DrugCard from '$lib/components/DrugCard.svelte';
</script>

<div class="container mx-auto">
	<h1 class="h1 mb-8">Medicine Catalog</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<DrugCard
			medicationId="paracetamol"
			imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Paracetamol-skeletal.svg/2560px-Paracetamol-skeletal.svg.png"
		>
			<div slot="header">Paracetamol</div>
			<span slot="description">
				A non-opioid analgesic and antipyretic agent used to treat fever and mild to moderate pain.
			</span>
		</DrugCard>

		<DrugCard
			medicationId="phoenix-down"
			imageUrl="https://cdn.wayfinderdb.com/Icons/Resources/ResourceIcon_TreasurePhoenixDown.png"
		>
			<div slot="header">Phoenix Down</div>
			<span slot="description">
				Phoenix Downs are used to revive characters who have been knocked out in battle.
			</span>
		</DrugCard>
	</div>
</div>
