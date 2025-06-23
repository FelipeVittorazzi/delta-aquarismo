import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import App from '@/App.vue'

describe('App.vue', () => {
  test('renderiza o aplicativo corretamente', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })

  test('é um componente Vue válido', () => {
    const wrapper = mount(App)
    expect(wrapper.vm).toBeDefined()
  })
}) 