import React, {useEffect} from "react"
import {
    Accordion,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    Container,
    List,
    ListItem,
    SwipeableDrawer
} from "@mui/material";
import expeditionsData from "../../../data/expeditions/expeditions.json"

const container = window !== undefined ? () => window.document.body : undefined;

interface IMapLeftDrawer {
    drawerOpen:boolean
    drawerClose:(status:boolean) => void
}

const MapLeftDrawer = ({drawerOpen, drawerClose}:IMapLeftDrawer) => {
    const [getDrawerOpen, setDrawerOpen] = React.useState(false);


    useEffect(()=>{
        console.log(drawerOpen,"dsfds")
        setDrawerOpen(drawerOpen)
    },[drawerOpen])
    const toggleDrawer = (newOpen: boolean) => () => {
        drawerClose(newOpen)
        setDrawerOpen(newOpen);
    };
    return(
        <SwipeableDrawer
            container={container}
            anchor="left"
            open={getDrawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={0}
            disableSwipeToOpen={false}
            ModalProps={{
                keepMounted: true
            }}
        >
            <Container sx={{
                marginTop:"5rem"
            }}>
                <Box sx={{
                    width:"400px"
                }}>
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            backgroundColor:"rgba(0,0,0,0.7)",
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: '700px',
                        }}
                    >
                        {
                            expeditionsData.map((item:any)=>(
                                <ListItem>
                                    <Accordion
                                        sx={{
                                            width:"100%"
                                        }}
                                    >
                                        <AccordionSummary>
                                            {item.expedition_no}
                                        </AccordionSummary>
                                    </Accordion>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Container>
        </SwipeableDrawer>
    )
}

export default MapLeftDrawer
