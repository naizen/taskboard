import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { boardActions, fetchBoard, sortLists } from '../features/board'
import AddList from '../components/AddList'
import { sortTasks, moveTask } from '../features/board'

const BoardWrapper = styled.div`
  background-color: rgb(76, 154, 255);
  height: 100%;
`

function Board() {
  const { lists, tasks } = useSelector(state => state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBoard())
  }, [])

  const onDragStart = result => {
    dispatch(boardActions.setIsDragging(true))
  }

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    dispatch(boardActions.setIsDragging(false))

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Moving lists
    if (type === 'column') {
      const draggedColumn = lists.find((list, index) => {
        return list._id === draggableId
      })
      const newLists = [...lists]
      newLists.splice(source.index, 1)
      newLists.splice(destination.index, 0, draggedColumn)
      dispatch(sortLists(newLists))
      return
    }

    const sourceColumn = lists.find(function(list, index) {
      return list._id === source.droppableId
    })

    const destColumn = lists.find(function(list, index) {
      return list._id === destination.droppableId
    })

    // Moving task within the same list
    if (sourceColumn === destColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newSourceCol = {
        ...sourceColumn,
        taskIds: newTaskIds
      }

      dispatch(sortTasks(newSourceCol, newTaskIds))
      return
    }

    // Moving task from one list to another
    const sourceTaskIds = Array.from(sourceColumn.taskIds)
    sourceTaskIds.splice(source.index, 1)
    const newSourceCol = {
      ...sourceColumn,
      taskIds: sourceTaskIds
    }

    const destTaskIds = Array.from(destColumn.taskIds)
    destTaskIds.splice(destination.index, 0, draggableId)
    const newDestCol = {
      ...destColumn,
      taskIds: destTaskIds
    }
    dispatch(moveTask(newSourceCol, newDestCol))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <BoardWrapper>
        <div
          className="flex mx-auto py-8 px-4"
          style={{ overflow: 'auto', height: '100%' }}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {provided => (
              <div
                className="flex"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {lists.map((list, index) => {
                  return (
                    <Column
                      key={list._id}
                      index={index}
                      list={list}
                      taskMap={tasks}
                    />
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddList />
        </div>
      </BoardWrapper>
    </DragDropContext>
  )
}

export default Board
