import React, { useState } from 'react'
import styled from 'styled-components'
import {Heading} from './Heading'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
`

export const Header: React.FC = () => {

    return (
        <Container>
            <Heading />
        </Container>
    )
}
