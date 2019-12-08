export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/products',
    name: 'products',
    view: 'ProductList'
  },
  {
    path: '/products/add',
    name: 'productsAdd',
    view: 'AddProducts'
  },
]
