import React, {useEffect, useState} from "react"
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    Container,
    List,
    ListItem,
    SwipeableDrawer, Tab, Tabs
} from "@mui/material";
import expeditionsData from "../../../data/expeditions/expeditions.json"
import Search from "../../search/search";
import {tab} from "@testing-library/user-event/dist/tab";

const container = window !== undefined ? () => window.document.body : undefined;

interface IMapLeftDrawer {
    drawerOpen: boolean
    drawerClose: (status: boolean) => void
    rightDrawerOpen: (status: boolean) => void
}

const MapLeftDrawer = ({drawerOpen, drawerClose, rightDrawerOpen}: IMapLeftDrawer) => {
    const [getDrawerOpen, setDrawerOpen] = React.useState(false);
    const [ loadsLoading, setLoadsLoading ] = useState(true)
    const [tab, setTab] = useState(0);

    useEffect(() => {
        setDrawerOpen(drawerOpen)
    }, [drawerOpen])
    const toggleDrawer = (newOpen: boolean) => () => {
        drawerClose(newOpen)
        setDrawerOpen(newOpen);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
        console.log(newValue)
        setLoadsLoading(true)
    };

    return (
        <Card sx={{
            backgroundColor: "background.default",
            position: "absolute",
            height: "95vh",
            width: 400,
            zIndex: 500,
            background: "palette.background.default",
            opacity: 0.8,
            borderRadius:0
        }}>
            <CardContent sx={{
                marginTop: "5rem"
            }}>
                <Search
                    onChangeText={(text)=>console.log(text)}
                    debounceDelay={500}
                    />
                <Box sx={{width: "400px"}}>
                    <Tabs value={tab} onChange={handleTabChange} centered>
                        <Tab label="Seferler" sx={{ color:"palette.text.primary" }}/>
                        <Tab label="Yükler" sx={{ color:"palette.text.primary" }}/>
                        <Tab label="Araçlar" sx={{ color:"palette.text.primary" }}/>
                    </Tabs>
                    <List
                        sx={{
                            width: '100%',
                            //backgroundColor: "rgba(0,0,0,0.7)",
                            position: 'relative',
                            overflow: 'auto'
                        }}
                    >
                        {
                            expeditionsData.map((item: any) => (
                                <ListItem>
                                    <Accordion
                                        sx={{
                                            width: "100%"
                                        }}
                                    >
                                        <AccordionSummary>
                                            {item.expedition_no}
                                        </AccordionSummary>
                                        <AccordionDetails onClick={() => rightDrawerOpen(true)}>
                                            {
                                                item.loads.length > 0 ?
                                                    <>
                                                        {
                                                            item.loads.map((load: any) => {
                                                                return load.load_no
                                                            })
                                                        }
                                                    </> :
                                                    <>
                                                        No Load Information Found
                                                    </>
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </CardContent>
        </Card>
    )
}

export default MapLeftDrawer
