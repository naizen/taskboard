import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as MoreHorizSvg } from '../icons/more_horiz.svg'
import { ReactComponent as DeleteSvg } from '../icons/delete.svg'
import { removeList } from '../features/board'
import { useDispatch } from 'react-redux'

const Container = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 1;
`
const MoreHorizIcon = styled(MoreHorizSvg)`
  fill: #64789a;
`
const Menu = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 2;
  background: white;
  min-width: 200px;
`
const Option = styled.a`
  display: block;
  width: 100%;
  color: #172b4d;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
`
const DeleteIcon = styled(DeleteSvg)`
  display: inline-block;
  fill: #64789a;
  vertical-align: top;
  margin-right: 5px;
`
function ColumnMenu({ id }) {
  const [menuVisible, setMenuVisible] = useState(false)
  const dispatch = useDispatch()
  let menuRef = null

  useEffect(() => {
    function closeMenu(e) {
      if (!menuRef.contains(e.target)) {
        setMenuVisible(false)
      }
    }

    if (menuVisible) {
      document.addEventListener('click', closeMenu)
    } else {
      document.removeEventListener('click', closeMenu)
    }

    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [menuVisible])

  const showMenu = () => {
    setMenuVisible(true)
  }

  const deleteList = e => {
    dispatch(removeList(id))
  }

  return (
    <Container>
      <button type="button" onClick={showMenu}>
        <MoreHorizIcon />
      </button>
      <Menu
        className="shadow"
        ref={el => (menuRef = el)}
        style={{ display: `${menuVisible ? 'block' : 'none'}` }}>
        <Option onClick={deleteList}>
          <DeleteIcon /> Delete this list
        </Option>
      </Menu>
    </Container>
  )
}

export default ColumnMenu
