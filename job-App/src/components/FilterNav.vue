<template>
  <div class="search-bar">
    <input
      v-model="filters.title"
      type="text"
      placeholder="Rechercher un emploi (ex: Développeur...)"
      @input="emitFilters"
    />

    <input
      v-model.number="filters.minSalary"
      type="number"
      min="0"
      placeholder="Salaire min"
      @input="emitFilters"
    />

    <input
      v-model.number="filters.minExperience"
      type="number"
      min="0"
      placeholder="Expérience min"
      @input="emitFilters"
    />

    <button class="reset-btn" @click="resetFilters">✖</button>
  </div>
</template>

<script>
export default {
  name: 'FilterNav',
  data() {
    return {
      filters: {
        title: '',
        minExperience: null,
        minSalary: null     
      }
    }
  },
  methods: {
    emitFilters() {
      this.$emit('filter-change', this.filters)
    },
    resetFilters() {
      this.filters = {
        title: '',
        minExperience: null,
        minSalary: null
      }
      this.emitFilters()
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  max-width: 700px;
  margin: 0 auto 20px;
}

.search-bar input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.reset-btn {
  background: hsla(238, 71%, 54%, 1);
  border: none;
  color: white;
  padding: 0 10px;
  margin:5px;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
}

.reset-btn:hover {
  background: hsla(238, 71%, 54%, 0.8);
}
</style>
