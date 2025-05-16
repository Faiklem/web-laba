<script setup>
const { cart } = useCart()
</script>

<template>
  <header class="site-header">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand site-header-logo">Путевки онлайн</NuxtLink>
        <NuxtLink class="btn btn-primary" to="/cart">
          Корзина <span class="badge badge-light">{{ cart.length }}</span>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
