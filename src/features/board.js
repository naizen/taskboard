import { createSlice } from 'redux-starter-kit'
import axios from 'axios'

const board = createSlice({
  slice: 'board',
  initialState: {
    isLoading: false,
    isDragging: false,
    tasks: {},
    lists: []
  },
  reducers: {
    setLists(state, action) {
      state.lists = action.payload
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setIsDragging(state, action) {
      state.isDragging = action.payload
    },
    addList(state, action) {
      state.lists = [...state.lists, action.payload]
    },
    setTasks(state, action) {
      state.tasks = action.payload
    },
    addTask(state, action) {
      const task = action.payload
      const taskId = task._id
      let taskMapObj = {}
      taskMapObj[taskId] = task
      state.tasks = {
        ...state.tasks,
        ...taskMapObj
      }
      state.lists = state.lists.map(list =>
        list._id === task.list
          ? { ...list, taskIds: [...list.taskIds, taskId] }
          : list
      )
    },
    sortTasks(state, action) {
      const { sourceList, taskIds } = action.payload
      let orderedTasks = { ...state.tasks }
      taskIds.forEach((id, i) => {
        orderedTasks[id].order = i
      })
      state.tasks = orderedTasks
      state.lists = state.lists.map(list =>
        list._id === sourceList._id ? sourceList : list
      )
    },
    moveTask(state, action) {
      const { sourceList, destList } = action.payload
      let orderedTasks = { ...state.tasks }
      sourceList.taskIds.forEach((id, i) => {
        orderedTasks[id].order = i
        orderedTasks[id].list = sourceList._id
      })
      destList.taskIds.forEach((id, i) => {
        orderedTasks[id].order = i
        orderedTasks[id].list = destList._id
      })
      state.tasks = orderedTasks
      state.lists = state.lists.map(list => {
        if (list._id === sourceList._id) {
          return sourceList
        } else if (list._id === destList._id) {
          return destList
        } else {
          return list
        }
      })
    },
    setBoard(state, action) {
      const { lists, taskMap } = action.payload
      state.lists = lists
      state.tasks = taskMap
    },
    clearBoard(state, action) {
      state.isLoading = false
      state.lists = []
      state.tasks = {}
    },
    removeList(state, action) {
      const { id } = action.payload
      state.lists = state.lists.filter(list => list._id !== id)
    },
    updateList(state, action) {
      const { id, ...updates } = action.payload
      state.lists = state.lists.map(list =>
        list._id === id ? { ...list, ...updates } : list
      )
    },
    removeTask(state, action) {
      const task = action.payload
      let tasks = { ...state.tasks }
      delete tasks[task._id]
      state.tasks = tasks
      state.lists = state.lists.map(list => {
        if (list._id === task.list) {
          const taskIds = list.taskIds.filter(taskId => taskId !== task._id)
          return {
            ...list,
            taskIds
          }
        } else {
          return list
        }
      })
    },
    updateTask(state, action) {
      const { _id, ...updates } = action.payload
      let tasks = { ...state.tasks }
      const task = tasks[_id]
      const updatedTask = { ...task, ...updates }
      tasks[_id] = updatedTask
      state.tasks = tasks
    }
  }
})

export { board }
export const boardActions = board.actions

export function fetchBoard() {
  return (dispatch, getState) => {
    dispatch(boardActions.setIsLoading(true))
    const { auth } = getState()

    return axios
      .get('/api/lists', { params: { userId: auth.user._id } })
      .then(response => {
        const { lists, tasks } = response.data
        lists.forEach(list => {
          const listTasks = tasks.filter(task => task.list === list._id)
          list.taskIds = listTasks.map(task => task._id)
        })
        let taskMap = {}
        tasks.forEach(task => {
          taskMap[task._id] = task
        })
        dispatch(boardActions.setBoard({ lists, taskMap }))
      })
      .catch(error => {
        console.log('Error loading lists: ', error)
      })
      .then(() => {
        dispatch(boardActions.setIsLoading(false))
      })
  }
}

export function sortLists(lists) {
  return dispatch => {
    const orderedLists = lists.map((list, i) => ({ ...list, order: i }))
    dispatch(boardActions.setLists(orderedLists))
    return axios
      .put('/api/lists/order', { lists: orderedLists })
      .then(response => {
        console.log('response: ', response)
      })
  }
}

export function addList(title) {
  return (dispatch, getState) => {
    const { auth } = getState()
    return axios
      .post('/api/lists', { user: auth.user, title })
      .then(response => {
        const { list } = response.data
        list.taskIds = []
        dispatch(boardActions.addList(list))
      })
  }
}

export function removeList(id) {
  return dispatch => {
    dispatch(boardActions.removeList({ id }))
    return axios.put('/api/lists/remove', { id })
  }
}

export function updateList(updates) {
  return dispatch => {
    dispatch(boardActions.updateList(updates))
    return axios.put('/api/lists/update', updates)
  }
}

export function addTask({ listId, content }) {
  return (dispatch, getState) => {
    const { auth } = getState()
    return axios
      .post('/api/tasks', { user: auth.user, listId, content })
      .then(response => {
        const { task } = response.data
        dispatch(boardActions.addTask(task))
      })
  }
}

export function sortTasks(sourceList, taskIds) {
  return dispatch => {
    dispatch(boardActions.sortTasks({ sourceList, taskIds }))
    return axios.put('/api/tasks/order', { taskIds }).then(response => {})
  }
}

export function moveTask(sourceList, destList) {
  return dispatch => {
    dispatch(boardActions.moveTask({ sourceList, destList }))
    return axios
      .put('/api/tasks/move', { sourceList, destList })
      .then(response => {})
  }
}

export function removeTask(task) {
  return dispatch => {
    dispatch(boardActions.removeTask(task))
    return axios.put('/api/tasks/remove', { task })
  }
}

export function updateTask(updates) {
  return dispatch => {
    dispatch(boardActions.updateTask(updates))
    return axios.put('/api/tasks/update', updates)
  }
}
