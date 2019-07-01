import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { ReactComponent as EditIconSvg } from '../assets/edit.svg'
import { ReactComponent as CloseIconSvg } from '../assets/close.svg'
import { ReactComponent as DeleteIconSvg } from '../assets/delete.svg'
import { removeTask, updateTask } from '../features/board'

const Container = styled.div`
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background: ${props => (props.isDragging ? '#C6F6D5' : 'white')};
  position: relative;
  &:hover {
    .edit-btn {
      display: block;
    }
  }
`
const EditButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  display: none;
  z-index: 2;
  &:focus {
    outline: 0;
  }
`
const EditIcon = styled(EditIconSvg)`
  display: inline-block;
  vertical-align: middle;
  fill: rgba(0, 0, 0, 0.6);
  width: 20px;
`
const DeleteIcon = styled(DeleteIconSvg)`
  display: inline-block;
  vertical-align: top;
  margin-right: 5px;
  fill: rgba(0, 0, 0, 0.6);
`
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  border-radius: 2px;
  outline: 0;
  margin-bottom: 10px;
`
const SubmitButton = styled.button`
  border-radius: 2px;
  padding: 6px 12px;
  border-bottom-width: 2px;
  font-weight: bold;
`
const CloseIcon = styled(CloseIconSvg)`
  display: inline-block;
  vertical-align: middle;
  fill: rgba(0, 0, 0, 0.6);
`
const RemoveButton = styled.button`
  float: right;
  margin: 8px 10px 0 0;
  color: rgba(0, 0, 0, 0.6);
`

function Task({ task, index }) {
  const [showEditForm, setShowEditForm] = useState(false)
  const [content, setContent] = useState(task.content)
  const dispatch = useDispatch()
  let formRef = null

  useEffect(() => {
    function closeForm(e) {
      if (formRef && !formRef.contains(e.target)) {
        setShowEditForm(false)
      }
    }

    if (showEditForm) {
      document.addEventListener('click', closeForm)
    } else {
      document.removeEventListener('click', closeForm)
    }

    return () => {
      document.removeEventListener('click', closeForm)
    }
  }, [showEditForm])

  const onSubmit = e => {
    e.preventDefault()

    if (content) {
      dispatch(updateTask({ _id: task._id, content })).then(() => {
        setShowEditForm(false)
      })
    }
  }

  const closeForm = () => {
    setShowEditForm(false)
    setContent(task.content)
  }

  const onRemove = () => {
    dispatch(removeTask(task))
  }

  return (
    <Fragment>
      {!showEditForm ? (
        <Draggable draggableId={task._id} index={index}>
          {(provided, snapshot) => (
            <Container
              className="shadow"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}>
              {task.content}
              <EditButton
                className="edit-btn"
                type="button"
                onClick={() => setShowEditForm(true)}>
                <EditIcon />
              </EditButton>
            </Container>
          )}
        </Draggable>
      ) : (
        <form ref={el => (formRef = el)} className="pb-4" onSubmit={onSubmit}>
          <Input
            className="shadow"
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
            autoFocus={true}
          />
          <SubmitButton
            className="bg-green-500 border-green-600 shadow text-white"
            type="submit">
            Save
          </SubmitButton>
          <button
            type="button"
            style={{ marginLeft: 10, outline: 0 }}
            onClick={closeForm}>
            <CloseIcon />
          </button>
          <RemoveButton type="button" onClick={onRemove}>
            <DeleteIcon />
            Remove
          </RemoveButton>
        </form>
      )}
    </Fragment>
  )
}

export default Task
