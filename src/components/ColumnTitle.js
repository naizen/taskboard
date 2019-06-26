import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { updateList } from '../features/board'

const Title = styled.h3`
  padding: 8px 36px 8px 8px;
  font-weight: bold;
  color: #172b4d;
`
const Input = styled.input`
  width: 100%;
  font-weight: bold;
  border-radius: 3px;
  padding: 0 5px;
`

function ColumnTitle({ id, title, ...rest }) {
  const [inputTitle, setInputTitle] = useState(title)
  const [showInput, setShowInput] = useState(false)
  const dispatch = useDispatch()

  const updateTitle = () => {
    setShowInput(false)
    if (inputTitle) {
      // dispatch update list title
      dispatch(updateList({ id, title: inputTitle }))
    }
  }

  const onKeyUp = e => {
    if (e.keyCode === 13) {
      updateTitle()
    }
  }

  return (
    <Title {...rest} onClick={() => setShowInput(true)}>
      {showInput ? (
        <Input
          type="text"
          value={inputTitle}
          autoFocus={true}
          onChange={e => setInputTitle(e.target.value)}
          onBlur={updateTitle}
          onKeyUp={onKeyUp}
        />
      ) : (
        <span style={{ paddingLeft: 5 }}>{title}</span>
      )}
    </Title>
  )
}

export default ColumnTitle
