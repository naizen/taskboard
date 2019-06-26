import React from 'react'
import Task from './Task'

const TaskList = React.memo(props => (
  <>
    {props.tasks.map((task, index) => (
      <Task key={task._id} task={task} index={index} />
    ))}
  </>
))

export default TaskList
