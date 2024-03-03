import React from 'react'
import styled, {css} from 'styled-components'
import checkIconSvg from './check.svg'

import {Card} from './Card'
import { atomFamily,selector,useRecoilCallback,useRecoilState } from 'recoil'
import { atom,useRecoilValue } from 'recoil'
import { tasksState } from './Tasks'

export const TextStyle = css`
    font-size: 17px;
    color: ${(props) => props.theme.text};
    font-family: inherit;
`

export const Container = styled(Card)`
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between
`

const Check = styled.div<{checked: boolean}>`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-right: 15px;
    transition: 0.2s all ease-in-out;
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: ${(props) => props.theme.background};
    cursor: pointer;

    ${(props) =>
        props.checked &&
        css`
            background-color: transparent;
        `}
`

const CheckIcon = styled.img`
    transition: 0.1s opacity ease-in-out;
`
const Delete = styled.button`
background-color: #f44336; /* Red */
border: none;
color: white;
padding: 10px 20px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 4px;
`

const Label = styled.div`
    position: relative;
    ${TextStyle}
`

const Strikethrough = styled.div<{checked: boolean}>`
    position: absolute;
    top: 50%;
    left: -3px;
    right: -3px;
    height: 2px;
    background-color: ${(props) => props.theme.text};
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: center left;
    transition: 0.1s all ease-in-out;

    ${(props) =>
        props.checked &&
        css`
            transform: scaleX(1);
        `};
`
export const taskState = atomFamily({
    key: 'task',
    default: {
        label: '',
        complete: false
    }
})


export const Task: React.FC<{id: number}> = ({id}) => {
    const [{complete, label}, setTask] = useRecoilState(taskState(id))
    const [ tasks, setTasks] = useRecoilValue(tasksState)


    const deleteTask = useRecoilCallback(({ set }) => () => {
        set(tasksState, (prevTasks) => prevTasks.filter((_, index) => index !== id));
    });



    return (
        <Container
            onClick={() => {
                // Toggle completed
                setTask({
                    label,
                    complete: !complete
                })
            }}
        >
            <Check checked={complete}>
                <CheckIcon
                    src={checkIconSvg}
                    style={{opacity: complete ? 1 : 0}}
                />
            </Check>


            <Label>
                {label}
                <Strikethrough checked={complete} />
            </Label>
            <Delete onClick={deleteTask}>Delete</Delete>
        </Container>
    )
}
