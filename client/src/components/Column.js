import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import ColumnMenu from './ColumnMenu'
import ColumnTitle from './ColumnTitle'
import AddTask from './AddTask'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  background: rgb(235, 236, 240);
  user-select: none;
`
const TaskListContainer = styled.div`
  padding: 8px;
  background-color: rgb(235, 236, 240);
`

const TitleContainer = styled.div`
  position: relative;
`

const Column = React.memo(({ list, taskMap, index }) => {
  const tasks = list.taskIds.map(taskId => taskMap[taskId])
  return <ColumnInner list={list} tasks={tasks} index={index} />
})

function ColumnInner({ list, tasks, index }) {
  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          className="flex flex-col"
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <Container>
            <TitleContainer>
              <ColumnTitle
                title={list.title}
                id={list._id}
                {...provided.dragHandleProps}
              />
              <ColumnMenu id={list._id} />
            </TitleContainer>
            <Droppable droppableId={list._id} type="task">
              {(provided, snapshot) => (
                <TaskListContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}>
                  <TaskList tasks={tasks} />
                  {snapshot.isDraggingOver && provided.placeholder}
                </TaskListContainer>
              )}
            </Droppable>
            <AddTask listId={list._id} />
          </Container>
        </div>
      )}
    </Draggable>
  )
}

export default Column
