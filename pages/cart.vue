<template>
  <section class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Корзина</h2>
      <NuxtLink to="/" class="btn btn-secondary">← Вернуться назад</NuxtLink>
    </div>

    <div v-if="cart.length === 0">
      <p>Корзина пуста</p>
    </div>
    <div v-else>
      <div v-for="item in cart" :key="item.id" class="card mb-3 d-flex flex-row">
        <img
          :src="item.image"
          :alt="item.city"
          class="img-thumbnail"
          style="max-width: 200px; object-fit: cover"
        />
        <div class="card-body">
          <h5 class="card-title">{{ item.city }}</h5>
          <p class="card-text">{{ item.country }}</p>
          <p class="card-text">Продолжительность: {{ item.duration }} дн.</p>
          <p class="card-text">Цена: <strong>{{ item.price }}</strong></p>
          <button class="btn btn-danger mt-2" @click="removeFromCart(item.id)">Удалить</button>
        </div>
      </div>

      <hr />

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4>Итого: {{ totalPrice }} руб</h4>
        <button class="btn btn-outline-danger" @click="clearCart">Очистить корзину</button>
      </div>

      <!-- 🚀 Форма оформления заказа -->
      <form @submit.prevent="submitOrder" class="mb-5">
        <div class="mb-3">
          <label for="name" class="form-label">Имя</label>
          <input v-model="name" id="name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Телефон</label>
          <input
            v-model="phone"
            id="phone"
            class="form-control"
            placeholder="+79991112233"
            required
          />
        </div>
        <button class="btn btn-success" type="submit">Оформить заказ</button>
      </form>

      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const { cart, removeFromCart } = useCart()

const name = ref('')
const phone = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const clearCart = () => {
  cart.value = []
  localStorage.setItem('cart', JSON.stringify([]))
}

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => {
    const cleanPrice = parseFloat(item.price.replace(/\s|[^0-9]/g, ''))
    return sum + (isNaN(cleanPrice) ? 0 : cleanPrice)
  }, 0).toLocaleString('ru-RU')
})

// 🚀 Отправка заказа
const submitOrder = async () => {
  if (!name.value || !phone.value) {
    errorMessage.value = 'Заполните имя и телефон'
    return
  }

  const orderData = {
    name: name.value,
    phone: phone.value,
    content: cart.value.map(item => ({
      itemId: item.id,
      count: 1 // можно добавить выбор количества, если нужно
    }))
  }

  try {
    const response = await fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })

    if (!response.ok) throw new Error('Ошибка при оформлении заказа')

    successMessage.value = 'Заказ успешно оформлен!'
    errorMessage.value = ''
    clearCart()
    name.value = ''
    phone.value = ''
  } catch (err) {
    errorMessage.value = err.message || 'Ошибка при оформлении заказа'
    successMessage.value = ''
  }
}
</script>
