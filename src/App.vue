<script>
import FBdata from './firebase.js'

export default {
  data() {
    return { checked: false, originalData: [], search: '' }
  },
  async created() {
    this.originalData = await FBdata
  },
  computed: {
    links() {
      let copy = [...this.originalData]
      copy = this.sortData(copy)
      copy = this.filterData(copy)
      return copy
    },
    searchTerm() {
      return this.search.toLowerCase()
    },
  },
  methods: {
    sortData(arr) {
      if (this.checked) {
        return arr.sort((a, b) => a.text.localeCompare(b.text))
      } else return arr
    },
    filterData(arr) {
      if (this.searchTerm) {
        return arr.filter(item =>
          item.text.toLowerCase().includes(this.searchTerm)
        )
      } else return arr
    },
  },
}
</script>

<template>
  <transition name="fade">
    <section class="max-w-5xl p-4 mx-auto" v-if="originalData.length">
      <h1 class="mb-4 text-5xl font-black text-center text-gray-900">
        List of RapidAPI collections ({{ links.length }})
      </h1>
      <!-- toggle -->
      <div class="flex items-center justify-center mx-auto mb-4">
        <button
          type="button"
          aria-pressed="false"
          aria-labelledby="toggleLabel"
          class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :class="checked ? 'bg-indigo-600' : 'bg-gray-300'"
          @click="checked = !checked"
        >
          <span class="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow ring-0"
            :class="checked ? 'translate-x-5' : 'translate-x-0'"
          ></span>
        </button>
        <span class="ml-3" id="toggleLabel">
          <span class="text-sm font-medium text-gray-900"
            >Sort alphabetically</span
          >
        </span>
        <div class="ml-3">
          <label for="search" class="sr-only">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search..."
            v-model.trim="search"
          />
        </div>
      </div>
      <!-- list -->
      <ul class="grid grid-cols-1 gap-4 mx-auto mb-4 sm:grid-cols-3">
        <li v-for="link in links" :key="link.href" class="p-3 bg-white shadow">
          <a
            class="text-sm font-medium text-indigo-600 hover:text-indigo-800"
            :href="link.href"
            target="_blank"
            rel="noopener"
            >{{ link.text }}</a
          >
        </li>
      </ul>
      <!-- footer -->
      <footer class="bg-white shadow">
        <div
          class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
        >
          <div class="flex justify-center space-x-6 md:order-2">
            <a
              href="https://twitter.com/web2033"
              class="text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Twitter</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>

            <a
              href="https://github.com/web2033/rapidapi-collections"
              class="text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">GitHub</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div class="mt-8 md:mt-0 md:order-1">
            <p class="text-base text-center text-gray-400">
              &copy; {{ new Date().getFullYear() }} Eugene Kopich. All Rights
              Reversed.
            </p>
          </div>
        </div>
      </footer>
    </section>
  </transition>
  <section
    v-if="!originalData.length"
    key="loading"
    class="grid min-h-screen text-sm font-medium text-gray-900 place-items-center"
  >
    Loading...
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>