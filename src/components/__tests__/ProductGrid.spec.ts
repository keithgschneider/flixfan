import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductGrid from '../ProductGrid.vue'
import type { Product } from '../../types/Product'

describe('ProductGrid', () => {
  const mockProducts: Product[] = [
    {
      BackgroundURL: '',
      ContentOverrides: null,
      Contents: [],
      FulfillmentLocationOverride: '',
      Group: 1,
      HeroURL: '',
      HideMetadata: false,
      ID: '1',
      ImageURL: 'https://example.com/image1.jpg',
      Name: 'Product 1',
      Price: 100,
      Profile: 'HD',
      Providers: ['Provider 1'],
      SynopsisOverride: '',
      TagColor: '',
      TagText: '',
      ProductURL: 'https://example.com/product1',
    },
    {
      BackgroundURL: '',
      ContentOverrides: null,
      Contents: [],
      FulfillmentLocationOverride: '',
      Group: 2,
      HeroURL: '',
      HideMetadata: false,
      ID: '2',
      ImageURL: 'https://example.com/image2.jpg',
      Name: 'Product 2',
      Price: 200,
      Profile: 'UHD',
      Providers: ['Provider 2'],
      SynopsisOverride: '',
      TagColor: '',
      TagText: '',
      ProductURL: 'https://example.com/product2',
    },
  ]

  it('renders the correct number of products', () => {
    const wrapper = mount(ProductGrid, {
      props: {
        products: mockProducts,
      },
    })

    const productItems = wrapper.findAll('.product-item')
    expect(productItems.length).toBe(mockProducts.length)
  })

  it('renders product names and images correctly', () => {
    const wrapper = mount(ProductGrid, {
      props: {
        products: mockProducts,
      },
    })

    mockProducts.forEach((product, index) => {
      const productItem = wrapper.findAll('.product-item')[index]
      const img = productItem.find('img')
      const overlay = productItem.find('.product-name')

      expect(img.attributes('src')).toBe(`${product.ImageURL}?w=100`)
      expect(img.attributes('alt')).toBe(product.Name)
      expect(overlay.text()).toBe(product.Name)
    })
  })

  it('links each product to the correct ProductURL', () => {
    const wrapper = mount(ProductGrid, {
      props: {
        products: mockProducts,
      },
    })

    mockProducts.forEach((product, index) => {
      const productLink = wrapper.findAll('.product-item')[index]
      expect(productLink.attributes('href')).toBe(product.ProductURL)
    })
  })
})
