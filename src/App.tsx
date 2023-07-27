import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel'
import {Container, List, ListItemText} from "@mui/material";

const exampleList = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 10, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 13, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 15, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 17, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

function App() {
    const listRef1 = useRef<HTMLUListElement>(null);
    const listRef2 = useRef<HTMLUListElement>(null);
    const listRef3 = useRef<HTMLUListElement>(null);

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue)
        setValue(newValue);
    };

    const incrementCount = () => {
        console.log("Scroll Ended")
    };

    const handleScroll1 = () => {
        if (listRef1.current) {
            const isScrollAtBottom = listRef1.current.scrollHeight - listRef1.current.scrollTop - listRef1.current.clientHeight;
            if (isScrollAtBottom < 1) {
                incrementCount();
            }
        }
    };

    const handleScroll2 = () => {
        if (listRef2.current) {
            const isScrollAtBottom = listRef2.current.scrollHeight - listRef2.current.scrollTop - listRef2.current.clientHeight;
            if (isScrollAtBottom < 1) {
                incrementCount();
            }
        }
    };

    const handleScroll3 = () => {
        if (listRef3.current) {
            const isScrollAtBottom = listRef3.current.scrollHeight - listRef3.current.scrollTop - listRef3.current.clientHeight;
            if (isScrollAtBottom < 1) {
                incrementCount();
            }
        }
    };

    useEffect(() => {
        if (listRef1.current) {
            listRef1.current.addEventListener('scroll', handleScroll1, {passive: true});
        }
        if (listRef2.current) {
            listRef2.current.addEventListener('scroll', handleScroll2, {passive: true});
        }
        if (listRef3.current) {
            listRef3.current.addEventListener('scroll', handleScroll3, {passive: true})
        }

        return () => {
            if (listRef1.current) {
                listRef1.current.removeEventListener('scroll', handleScroll1);
            }
            if (listRef2.current) {
                listRef2.current.removeEventListener('scroll', handleScroll2);
            }
            if (listRef3.current) {
                listRef3.current.removeEventListener('scroll', handleScroll3)
            }
        };
    }, [value])

    return (
        <Container>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1"/>
                            <Tab label="Item Two" value="2"/>
                            <Tab label="Item Three" value="3"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <List
                            ref={listRef1}
                            sx={{
                                width: '100%',
                                //backgroundColor: "rgba(0,0,0,0.7)",
                                position: 'relative',
                                //overflowY: 'scroll',
                                overflow: "scroll",
                                maxHeight: '800px',
                                paddingBottom: "400px"
                            }}>
                            {
                                exampleList.map((item, index) => (
                                    <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        key={index}
                                    >
                                        <ListItemText>
                                            {item.firstName}
                                        </ListItemText>
                                    </List>
                                ))}
                        </List>
                    </TabPanel>
                    <TabPanel value="2">
                        <List
                            ref={listRef2}
                            sx={{
                                width: '100%',
                                //backgroundColor: "rgba(0,0,0,0.7)",
                                position: 'relative',
                                //overflowY: 'scroll',
                                overflow: "scroll",
                                maxHeight: '800px',
                                paddingBottom: "400px"
                            }}>
                            {
                                exampleList.map((item, index) => (
                                    <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        key={index}
                                    >
                                        <ListItemText>
                                            {item.firstName}
                                        </ListItemText>
                                    </List>
                                ))
                            }
                        </List>
                    </TabPanel>
                    <TabPanel value="3">
                        <List
                            ref={listRef2}
                            sx={{
                                width: '100%',
                                //backgroundColor: "rgba(0,0,0,0.7)",
                                position: 'relative',
                                //overflowY: 'scroll',
                                overflow: "scroll",
                                maxHeight: '800px',
                                paddingBottom: "400px"
                            }}>
                            {
                                exampleList.map((item, index) => (
                                    <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        key={index}
                                    >
                                        <ListItemText>
                                            {item.firstName}
                                        </ListItemText>
                                    </List>
                                ))
                            }
                        </List>
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    )
}

export default App;
