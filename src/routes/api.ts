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
    model: 'race',
    path: '/races',
    handler: 'find'
  },
  {
    model: 'race',
    path: '/races/:id',
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
  },
  {
    model: 'haki_ability',
    path: '/haki_abilities',
    handler: 'find'
  },
  {
    model: 'haki_ability',
    path: '/haki_abilities/:id',
    handler: 'findById'
  }
];
