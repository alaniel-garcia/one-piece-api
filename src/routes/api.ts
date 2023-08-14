export default [
  {
    model: 'character',
    path: '/characters',
    handler: 'find'
  },
  {
    model: 'character',
    path: '/characters/:id',
    handler: 'findById'
  },
  {
    model: 'devil_fruit',
    path: '/devil_fruits',
    handler: 'find'
  },
  {
    model: 'devil_fruit',
    path: '/devil_fruits/:id',
    handler: 'findById'
  }
];
