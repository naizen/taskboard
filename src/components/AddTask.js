import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as AddIconSvg } from '../icons/add.svg'
import { ReactComponent as CloseIconSvg } from '../icons/close.svg'
import { addTask } from '../features/board'

const Container = styled.div``
const Button = styled.button`
  width: 100%;
  text-align: left;
  padding: 8px 6px;
  color: rgba(0, 0, 0, 0.6);
  pointer-events: ${props => (props.isDragging ? 'none' : 'auto')};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
const AddIcon = styled(AddIconSvg)`
  fill: rgba(0, 0, 0, 0.6);
  display: inline-block;
  vertical-align: top;
`
const CloseIcon = styled(CloseIconSvg)`
  display: inline-block;
  vertical-align: middle;
  fill: rgba(0, 0, 0, 0.6);
`
const Form = styled.form`
  padding: 0px 10px 10px 10px;
`
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 5px 10px 30px 10px;
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

function AddTask({ listId }) {
  const [content, setContent] = useState('')
  const [showForm, setShowForm] = useState(false)
  const { isDragging } = useSelector(state => state.board)
  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    if (content) {
      dispatch(addTask({ listId, content })).then(() => {
        setContent('')
      })
    }
  }

  const closeForm = () => {
    setContent('')
    setShowForm(false)
  }

  return (
    <Container>
      {showForm ? (
        <Form onSubmit={onSubmit}>
          <Input
            className="shadow"
            placeholder="Enter a task"
            onChange={e => setContent(e.target.value)}
            value={content}
            autoFocus={true}
          />
          <SubmitButton
            className="bg-green-500 border-green-600 shadow text-white"
            type="submit"
          >
            Add Task
          </SubmitButton>
          <button
            type="button"
            style={{ marginLeft: 10, outline: 0 }}
            onClick={closeForm}
          >
            <CloseIcon />
          </button>
        </Form>
      ) : (
        <>
          <Button isDragging={isDragging} onClick={() => setShowForm(true)}>
            <AddIcon /> Add a task
          </Button>
        </>
      )}
    </Container>
  )
}

export default AddTask
