<template>
	<Head>
		<link rel="stylesheet" href="/css/main.css" />
		<link rel="stylesheet" href="/css/bootstrap.min.css" />
	</Head>

	<div>
		<SiteNavBar />
		<NuxtPage />
		<SiteFooter />
	</div>
</template>

<script setup>
import SiteNavBar from '~/components/SiteNavBar.vue'
import SiteFooter from '~/components/SiteFooter.vue'
</script>
