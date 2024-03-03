import React from 'react'
import {Input} from './components/Input'
import {Stats} from './components/Stats'
import {Tasks} from './components/Tasks'
import {ThemeProvider, GlobalStyles, Page} from './components/theme'
import {Header, darkModeState} from './components/Header'

const Home = () => {
    return (
        <Page>
            <Header />
            <Stats />
            <Tasks />
            <Input />
        </Page>
    )
}

const App = () => {
    return (
        <ThemeProvider>
            <GlobalStyles />
            <Home />
        </ThemeProvider>
    )
}

export default App
