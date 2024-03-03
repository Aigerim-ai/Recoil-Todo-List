import React from 'react'
import {Card} from './Card'
import styled from 'styled-components'
import {selector, useRecoilState, useRecoilValue} from 'recoil'
import { tasksState } from './Tasks'
import { taskState } from './Task'

const StatContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme.text};
`

const StatValue = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
`

const StatLabel = styled.div`
    font-size: 11px;
    text-transform: uppercase;
`

const Stat: React.FC<{label: string; value: string | number}> = ({
    label,
    value,
}) => {
    return (
        <StatContainer>
            <StatValue>{value}</StatValue>
            <StatLabel>{label}</StatLabel>
        </StatContainer>
    )
}

const Divider = styled.div`
    width: 1px;
    height: 42px;
    background-color: ${(props) => props.theme.text};
    opacity: 0.3;
`

const Container = styled(Card)`
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px;
`
const  tasksCompleteState = selector({
    key: 'tasksComplete',
    get: ({get})=>{
        const taskIds = get(tasksState)
        const tasks = taskIds.map(id => {
            return get(taskState(id))
        })
        return tasks.filter(task => !task.complete).length
    }
})

const  totalCompletedNum = selector({
    key: 'totalCompletedNum',
    get: ({get})=>{
        const taskIds = get(tasksState)
        const tasks = taskIds.map(id => {
            return get(taskState(id))
        })
        return tasks.filter(task => task.complete).length
    }
})


export const Stats: React.FC = () => {
    const tasksComplete = useRecoilValue(tasksCompleteState)
    const  totalCompleted = useRecoilValue(totalCompletedNum)
    const [ tasks, setTasks] = useRecoilState(tasksState)
    const percentCompleted = tasks.length === 0 ? 0 : totalCompleted / tasks.length * 100;

    return (
        <Container>
            <Stat label="Tasks Complete" value={tasksComplete} />
            <Divider />
            <Stat label="Tasks Remaining" value="3" />
            <Divider />
            <Stat label="Percent completed:" value={percentCompleted} />
        </Container>
    )
}
