<template>
	<div class="card text-center card-product">
		<img
			class="card-img"
			:src="card.image"
			:alt="card.city"
			@click="showDescription = true"
		/>
		<div class="card-body">
			<p>{{ card.country }}</p>
			<h4 class="card-product__title">{{ card.city }}</h4>
			<p class="card-product__price">{{ card.price }}</p>
			<p class="card-duration">Продолжительность: {{ card.duration }} д.</p>
			<button
				type="button"
				:class="['btn', isOrdered ? 'btn-danger' : 'btn-primary']"
				@click.stop="toggleOrder"
			>
				{{ isOrdered ? 'Отменить' : 'Заказать' }}
			</button>
		</div>

		<div
			v-if="showDescription"
			class="modal-overlay"
			@click.self="showDescription = false"
		>
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" @click="showDescription = false">
						&times;
					</button>
				</div>
				<div
					class="modal-body description-content"
					v-html="card.description"
				></div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	card: Object,
})

const isOrdered = ref(false)
const showDescription = ref(false)

function toggleOrder() {
	isOrdered.value = !isOrdered.value
}
</script>
