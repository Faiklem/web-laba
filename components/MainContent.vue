<template>
	<section class="site-main mb-5">
		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-5">
					<CountryFilterSidebar v-model:selectedCountry="selectedCountry" />
				</div>
				<div class="col-xl-9 col-lg-8 col-md-7">
					<CitySearchBar v-model:searchQuery="searchQuery" />
					<div v-if="loading" class="text-center">Loading...</div>
					<div v-else class="card-grid">
						<TourCard
							v-for="card in filteredCards"
							:key="card.id"
							:card="card"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CountryFilterSidebar from '~/components/CountryFilterSidebar.vue'
import CitySearchBar from '~/components/CitySearchBar.vue'
import TourCard from '~/components/TourCard.vue'

const searchQuery = ref('')
const selectedCountry = ref('Все')
const loading = ref(true)
const cards = ref([])

onMounted(async () => {
	try {
		const [itemsResponse, countriesResponse] = await Promise.all([
			fetch('http://localhost:3001/items'),
			fetch('http://localhost:3001/countries'),
		])
		const items = await itemsResponse.json()
		const countries = await countriesResponse.json()
		cards.value = items.map((item) => {
			const country = countries.find((c) => c.id === item.countryId)
			return {
				id: item.id,
				country: country.title,
				countryId: item.countryId,
				city: item.title,
				price: `${item.price.toLocaleString('ru-RU')} руб`,
				image: `/images/${item.image}`,
				description: item.description,
				duration: item.duration,
			}
		})
	} catch (error) {
		console.error('Error fetching data:', error)
	} finally {
		loading.value = false
	}
})

const filteredCards = computed(() => {
	return cards.value.filter((card) => {
		const countryMatch =
			selectedCountry.value === 'Все' || card.country === selectedCountry.value
		const searchMatch = card.city
			.toLowerCase()
			.includes(searchQuery.value.toLowerCase())
		return countryMatch && searchMatch
	})
})
</script>
