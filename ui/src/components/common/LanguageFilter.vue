<script setup lang="ts">
import BaseFilter from './BaseFilter.vue'
import { MESSAGES } from '@/constants/theme'
import { getLanguageName } from '@/utils/format-utils'

const props = defineProps<{
  languages: string[]
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

function displayToCodes(displayNames: string[]): string[] {
  return displayNames.map(
    (d) => props.languages.find((c) => getLanguageName(c) === d) ?? d
  )
}
</script>

<template>
  <base-filter
    title="Languages"
    icon="mdi-translate"
    :items="languages.map(getLanguageName)"
    :model-value="modelValue.map(getLanguageName)"
    :empty-message="MESSAGES.NO_LANGUAGES"
    :uppercase-labels="false"
    @update:model-value="emit('update:modelValue', displayToCodes($event))"
  />
</template>
