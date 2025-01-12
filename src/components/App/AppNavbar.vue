<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const routes = [
  {
    title: 'Dashboard',
    name: 'dashboard',
  },
  {
    title: 'Movies',
    name: 'movies',
  },
]
</script>

<template>
  <div class="flex h-16 items-center justify-center px-4 w-full">
    <NavigationMenu class="flex items-center gap-4 w-full justify-center">
      <NavigationMenuList>
        <NavigationMenuItem v-for="route in routes" :key="route.name">
          <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
            <RouterLink class="font-semibold text-lg" :to="{ name: route.name }">
              {{ route.title }}
            </RouterLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
