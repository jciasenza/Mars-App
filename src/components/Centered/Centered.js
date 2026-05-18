import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  min-height: 280px;
  padding: 42px 18px;
  font-size: 1.2em;
  width: 100%;
  color: #f1b45b;
  text-align: center;

  svg {
    font-size: 52px;
  }
`
export default function Centered({ children }) {
  return <Wrapper>{children}</Wrapper>
}
