import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductGrid from '../ProductGrid.vue'
import type { Product } from '../../types/Product'

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
    IsLiked: false,
    IsSeen: false,
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
    IsLiked: false,
    IsSeen: false,
  },
]

describe('ProductGrid', () => {
  it('renders the correct number of products', () => {
    const wrapper = mount(ProductGrid, {
      props: { products: mockProducts },
    })
    expect(wrapper.findAll('.product-item')).toHaveLength(mockProducts.length)
  })

  it('renders product names and images correctly', () => {
    const wrapper = mount(ProductGrid, {
      props: { products: mockProducts },
    })
    wrapper.findAll('.product-item').forEach((item, idx) => {
      const product = mockProducts[idx]
      const img = item.find('img')
      const overlay = item.find('.product-name')
      expect(img.attributes('src')).toBe(`${product.ImageURL}?w=100`)
      expect(img.attributes('alt')).toBe(product.Name)
      expect(overlay.text()).toBe(product.Name)
    })
  })

  it('links each product to the correct ProductURL', () => {
    const wrapper = mount(ProductGrid, {
      props: { products: mockProducts },
    })
    wrapper.findAll('.product-item').forEach((item, idx) => {
      expect(item.attributes('href')).toBe(mockProducts[idx].ProductURL)
    })
  })
})
