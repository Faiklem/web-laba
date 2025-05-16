<template>
	<div class="filter-bar">
		<div class="input-group">
			<input
				type="text"
				v-model="modelValue"
				class="form-control"
				placeholder="Название города"
			/>
			<div class="input-group-append">
				<button class="btn btn-outline-secondary" type="button">Искать</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const modelValue = defineModel()
</script>
