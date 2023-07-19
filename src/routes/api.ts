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
  }
];
