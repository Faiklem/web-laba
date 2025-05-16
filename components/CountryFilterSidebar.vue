<template>
	<div class="filter-sidebar">
		<div class="filter-sidebar-header">Страны:</div>
		<div class="filter-sidebar-content">
			<div
				v-for="(country, index) in computedCountries"
				:key="index"
				class="form-check"
			>
				<input
					class="form-check-input"
					type="radio"
					name="country"
					:id="`country-${index}`"
					:value="country.name"
					v-model="modelValue"
				/>
				<label class="form-check-label" :for="`country-${index}`">
					{{ country.name }} ({{ country.count }})
				</label>
			</div>
		</div>
	</div>
</template>

<script setup>
const modelValue = defineModel()
const props = defineProps({ cards: Array })

const computedCountries = computed(() => {
	const counts = {}
	for (const card of props.cards || []) {
		if (!counts[card.country]) counts[card.country] = 0
		counts[card.country]++
	}
	const result = [{ name: 'Все', count: props.cards.length }]
	for (const country in counts) {
		result.push({ name: country, count: counts[country] })
	}
	return result
})
</script>
