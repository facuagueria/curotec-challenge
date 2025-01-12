// Import global styles
import './assets/index.css'

// Import Vue and Pinia core functions
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import required Chart.js components
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

// Register Chart.js components globally
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Create Vue application instance
const app = createApp(App)

// Register global plugins
app.use(createPinia()) // Global state management
app.use(router) // Routing

// Mount the application to #app element
app.mount('#app')
