import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as AddIconSvg } from '../icons/add.svg'
import { ReactComponent as CloseIconSvg } from '../icons/close.svg'
import { addList } from '../features/board'

const Container = styled.div`
  width: 300px;
  margin: 8px;
`
const Button = styled.button`
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(0, 0, 0, 0.15);
  width: 100%;
  padding: 8px 0;
  border-radius: 3px;
  text-align: left;
  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`
const AddIcon = styled(AddIconSvg)`
  fill: rgba(255, 255, 255, 0.8);
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
`

const CloseIcon = styled(CloseIconSvg)`
  display: inline-block;
  vertical-align: middle;
  fill: rgba(0, 0, 0, 0.6);
`

const Form = styled.form`
  background-color: rgb(235, 236, 240);
  padding: 8px;
  border-radius: 3px;
`
const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 5px 10px;
  border-radius: 3px;
  margin-bottom: 10px;
`
const FormButton = styled.button`
  background-color: #48bb78;
  color: white;
  padding: 6px 12px;
  border-radius: 3px;
  font-weight: bold;
  border-bottom-width: 2px;
`

function AddList() {
  const [isForm, setIsForm] = useState(false)
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  let submitBtn = null

  const handleBlur = e => {
    if (e.relatedTarget !== submitBtn) {
      setIsForm(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (title) {
      dispatch(addList(title)).then(() => {
        setIsForm(false)
        setTitle('')
      })
    }
  }

  return (
    <div className="flex flex-col">
      <Container>
        {isForm ? (
          <Form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter title"
              autoFocus={true}
              onBlur={handleBlur}
            />
            <FormButton
              ref={n => (submitBtn = n)}
              className="border-green-700"
              type="submit">
              Add List
            </FormButton>
            <button
              type="button"
              onClick={() => setIsForm(false)}
              style={{ marginLeft: 10 }}>
              <CloseIcon />
            </button>
          </Form>
        ) : (
          <Button onClick={() => setIsForm(!isForm)}>
            <AddIcon /> Add A List
          </Button>
        )}
      </Container>
    </div>
  )
}

export default AddList
