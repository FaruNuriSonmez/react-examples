import React, { useRef, useState, useEffect } from 'react';

/**
 * @typedef {import('mapbox-gl').Map} MapboxMap
 */
import mapboxgl, {
    CustomLayerInterface,
    Map,
    RasterLayer,
    MercatorCoordinate,
} from 'mapbox-gl';

import {
    Renderer,
    Camera,
    Scene,
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    WebGLRenderer,
    Matrix4,
    Vector3,
} from 'three';


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


/**
 * @typedef {import('mapbox-gl').Style} MapboxStyle
 * @typedef {import('@mui/material').BoxProps} BoxProps
 * @typedef {import('@mui/material').ContainerProps} ContainerProps
 * @typedef {import('@mui/material').GridProps} GridProps
 * @typedef {import('@mui/material').SwitchProps} SwitchProps
 * @typedef {import('@mui/material').SliderProps} SliderProps
 */
import {
    Box,
    Grid,
    Switch,
    Slider
} from '@mui/material';



mapboxgl.accessToken = 'pk.eyJ1IjoiZmFydW51cmlzb25tZXoiLCJhIjoiY2xpZXhpanljMGR3ODNkcDYzOXlhYWhhZiJ9.CKiSRziILv4j1Zt5eDHKBA';



/**
 * A React component that renders a MapBox GL map.
 * @component
 */
const MapBoxGL = () => {

    /**
     * Reference to the map container element.
     * @type {React.RefObject<HTMLDivElement | null>}
     */
    const mapContainer = useRef<HTMLDivElement | null>(null);


    /**
     * Reference to the map instance.
     * @type {React.MutableRefObject<mapboxgl.Map | null>}
     */
    const map = useRef<mapboxgl.Map | null>(null);

    /**
     * Longitude state.
     * @type {number}
     */
    const [lng, setLng] = useState(35.3581428);

    /**
     * Latitude state.
     * @type {number}
     */
    const [lat, setLat] = useState(38.7569961);

    /**
     * Zoom state.
     * @type {number}
     */
    const [zoom, setZoom] = useState(17);

    /**
     * Dark mode state.
     * @type {boolean}
     */
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode switch durumu

    /**
     * Pitch state.
     * @type {number}
     */
    const [pitch, setPitch] = useState(60);

    const cacheTiles = () => {
        if (!map.current) return;

        const bounds = map.current.getBounds();
        const zoom = map.current.getZoom();

        // Convert the map bounds and zoom level to a unique key for caching
        const cacheKey = `${bounds.getWest().toFixed(6)}_${bounds.getSouth().toFixed(6)}_${bounds.getEast().toFixed(6)}_${bounds.getNorth().toFixed(6)}_${zoom.toFixed(2)}`;

        // Get the map tiles as a data URL
        const canvas = map.current.getCanvas();
        const dataUrl = canvas.toDataURL();

        // Save the data URL to local storage using the cacheKey as the key
        localStorage.setItem(cacheKey, dataUrl);
    };

    var modelOrigin = [35.3237349, 38.7614452];
    var modelAltitude = 0;
    var modelRotate = [Math.PI / 2, 0, 0];

    var modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
        //@ts-ignore
        modelOrigin,
        modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    var modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since our 3D model is in real world meters, a scale transform needs to be
         * applied since the CustomLayerInterface expects units in MercatorCoordinates.
         */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    const truckLayer: CustomLayerInterface = {
        id: '3d-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd(map: mapboxgl.Map, gl: WebGLRenderingContext) {
            //@ts-ignore
            this.camera = new Camera();
            //@ts-ignore
            this.scene = new Scene();

            var directionalLight = new DirectionalLight(0xffffff);
            directionalLight.position.set(0, 70, 100).normalize();
            //@ts-ignore
            this.scene.add(directionalLight);

            var directionalLight2 = new DirectionalLight(0xffffff, 1);
            directionalLight2.position.set(50, -70, 100).normalize();
            //@ts-ignore
            this.scene.add(directionalLight2);

            // Building:
            var modelUrl = 'https://dl.dropbox.com/s/di5vm2d6d55jzvd/Apartment%20Building_17_blend.gltf';

            // use the three.js GLTF loader to add the 3D model to the three.js scene
            var loader = new GLTFLoader();

            loader.load(
                modelUrl,
                //@ts-ignore
                function (gltf) {
                    //@ts-ignore
                    this.scene.add(gltf.scene);
                    // modelOrigin[0] = gltf.scene.userData.longitude;
                    // modelOrigin[1] = gltf.scene.userData.latitude;
                    // console.log(modelOrigin);
                }.bind(this)
            );
            //@ts-ignore
            this.map = map;
            // use the Mapbox GL JS map canvas for three.js
            //@ts-ignore
            this.renderer = new WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true,
            });

            //@ts-ignore
            this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
            var rotationX = new Matrix4().makeRotationAxis(
                new Vector3(1, 0, 0),
                modelTransform.rotateX
            );
            var rotationY = new Matrix4().makeRotationAxis(
                new Vector3(0, 1, 0),
                modelTransform.rotateY
            );
            var rotationZ = new Matrix4().makeRotationAxis(
                new Vector3(0, 0, 1),
                modelTransform.rotateZ
            );

            var m = new Matrix4().fromArray(matrix);
            var l = new Matrix4()
                .makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    //@ts-ignore
                    modelTransform.translateZ
                )
                .scale(
                    new Vector3(
                        modelTransform.scale,
                        -modelTransform.scale,
                        modelTransform.scale
                    )
                )
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);

            //@ts-ignore
            this.camera.projectionMatrix.elements = matrix;
            //@ts-ignore
            this.camera.projectionMatrix = m.multiply(l);
            //@ts-ignore
            this.renderer.state.reset();
            //@ts-ignore
            this.renderer.render(this.scene, this.camera);
            //@ts-ignore
            this.map.triggerRepaint();
        },
    }


    /**
     * Effect that runs when isDarkMode or pitch state changes.
     */
    useEffect(() => {

        //if (map.current || !mapContainer.current) return; // initialize map only once and when container is available
        map.current = new mapboxgl.Map({
            //@ts-ignore
            container: mapContainer.current,
            style: isDarkMode ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
            bearing: 45,
            pitch: pitch,
            antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
        });
        map.current.addControl(new mapboxgl.FullscreenControl()); // Add the control to the map

        map.current?.on('load', ()=>{
            console.log("sd")
        })

        //map.current.on('moveend', cacheTiles); // Call cacheTiles function when the map is moved

        map.current?.on('style.load', function (){
            map.current?.addLayer(truckLayer, 'waterway-label')
        })
    }, [isDarkMode, pitch]);




    /**
     * Handles the toggle dark mode event.
     */
    const handleToggleDarkMode = () => {
        console.log(isDarkMode)
        setIsDarkMode(!isDarkMode);
    };

    /**
     * Handles the slider change event.
     * @param {Event} event - The event object.
     * @param {number | number[]} newValue - The new value.
     */
    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setPitch(newValue as number);
    };

    return (

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box
                        ref={mapContainer}
                        sx={{
                            width: '100vw',
                            height: '100vh',
                        }}
                    >
                        <Switch
                            checked={isDarkMode}
                            onChange={handleToggleDarkMode}
                            sx={{
                                position: 'absolute',
                                top: '100px',
                                right: '10px',
                                zIndex: 500,
                            }}
                        />
                        <Slider
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '0',
                                zIndex: 500,
                                '& .MuiSlider-root': {
                                    width: '100px',
                                },
                            }}
                            orientation="vertical"
                            defaultValue={10}
                            min={0}
                            max={100}
                            step={1}
                            aria-label="Pitch"
                            valueLabelDisplay="auto"
                            value={pitch}
                            onChange={handleSliderChange}
                        />
                    </Box>
                </Grid>
            </Grid>

    );
};

export default MapBoxGL;
