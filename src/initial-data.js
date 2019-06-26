const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage', order: 0 },
    'task-2': { id: 'task-2', content: 'Watch my favorite show', order: 1 },
    'task-3': { id: 'task-3', content: 'Charge my phone', order: 2 },
    'task-4': { id: 'task-4', content: 'Cook dinner', order: 3 },
    'task-5': { id: 'task-5', content: 'Play video games', order: 4 },
    'task-6': { id: 'task-6', content: 'Work out', order: 5 }
  },
  columns: [
    {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      order: 0
    },
    {
      id: 'column-2',
      title: 'Doing',
      taskIds: ['task-5', 'task-6'],
      order: 1
    }
  ]
}

export default initialData
