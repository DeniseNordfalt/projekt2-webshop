import React from 'react'
import styled from 'styled-components'
import {encode} from 'base-64'

const Container = styled.div`
min-width: 250px;
`
const StyledList = styled.ul`
list-style-type: "✌";
padding-left: 17px;
`

const StyledListItem = styled.li`
width: 100%;
height: 100%;
font-size: 20px;
font-weight: 600;
padding: 10px 5px;
border-bottom: 1px solid grey;
a {
  text-decoration: none;
  color: black;
  width: 100%;
  height: 100%;
}
&:hover {
  background-color: #f2f2f2;
}
`

type Props = {
  data: string[]
}

const CategoryList = (props: Props) => {
  return (
    <Container>
      <h3>Categories</h3>
        <StyledList>
            {props.data.map((item, index) => {
                return <StyledListItem key={index}><a href={`/${encode(item)}`}>{item}</a></StyledListItem>
            })}
        </StyledList>
    </Container>
  )
}

export default CategoryList