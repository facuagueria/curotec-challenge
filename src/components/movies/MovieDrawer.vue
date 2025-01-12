<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import AppRater from '@/components/App/AppRater.vue'
import type { Movie } from '@/types/Movie'

import { useMovies } from '@/composables/useMovies'
import { useToast } from '@/components/ui/toast/use-toast'

type MovieDrawerProps = {
  movie: Movie | null
}

const props = defineProps<MovieDrawerProps>()

const modelValue = defineModel<boolean>()

const rating = ref(0)

const { getMovies, rateMovie } = useMovies()
const { toast } = useToast()

const handleRateMovie = () => {
  if (rating.value < 1 || rating.value > 10) {
    toast({
      title: 'Please rate the movie',
      description: 'You must rate the movie between 1 and 10',
      variant: 'destructive',
    })
    return
  }

  rateMovie(props.movie!.title, rating.value).then(() => {
    modelValue.value = false
    rating.value = 0

    getMovies()
  })
}
</script>

<template>
  <Drawer v-model:open="modelValue">
    <DrawerContent>
      <div class="mx-auto w-full max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{{ movie?.title }}</DrawerTitle>
          <DrawerDescription>{{ movie?.extract }}</DrawerDescription>
        </DrawerHeader>

        <div class="flex items-center justify-center">
          <AppRater v-model:rating="rating" />
        </div>

        <DrawerFooter>
          <Button @click="handleRateMovie">Rate this movie</Button>

          <DrawerClose as-child>
            <Button variant="outline" @click="modelValue = false"> Cancel </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
