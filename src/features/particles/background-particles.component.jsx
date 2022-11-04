import React from 'react';
import Particles from 'react-tsparticles';
import { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import styles from './background-particles.module.css';
import { useSelector } from 'react-redux';
import { selectMainParticles } from './background-particles.slice';
import { selectIsGameEnd } from '../isGameEnd/isGameEnd.slice';
export const BgParticles = () => {
    // const mainPactNumbers = useSelector(selectMainParticles);
    // console.log({ mainPactNumbers });
    const isGameEnd = useSelector(selectIsGameEnd);
    const particlesInit = useCallback(async (engine) => {
        // console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);
    return (
        <>
            {' '}
            {/* <div>{mainPactNumbers}</div> */}
            <Particles
                className={styles.particles}
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fullScreen: {
                        enable: true,
                        zIndex: -1,
                    },
                    particles: {
                        number: {
                            value: isGameEnd ? 500 : 125,
                            limit: 1000,
                            density: {
                                enable: true,
                                value_area: 8000,
                            },
                        },
                        color: {
                            value: ['#BD10E0', '#B8E986', '#50E3C2', '#FFD300', '#E86363'],
                        },
                        shape: {
                            type: 'circle',
                            stroke: {
                                width: 0,
                                color: '#ca4747',
                            },
                            polygon: {
                                nb_sides: 5,
                            },
                            image: {
                                src: 'images/github.svg',
                                width: 100,
                                height: 100,
                            },
                        },
                        opacity: {
                            value: 0.5,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 0.5,
                                opacity_min: 0.5,
                                sync: false,
                            },
                        },
                        size: {
                            value: 30,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 5,
                                size_min: 10,
                                sync: false,
                            },
                        },
                        line_linked: {
                            enable: true,
                            distance: 100,
                            color: '#dd924c',
                            opacity: 1,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 3,
                            direction: 'none',
                            random: false,
                            straight: false,
                            out_mode: 'out',
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200,
                            },
                        },
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onHover: {
                                enable: true,
                                mode: 'bubble',
                                parallax: {
                                    enable: false,
                                    force: 60,
                                    smooth: 10,
                                },
                            },
                            onClick: {
                                enable: true,
                                mode: 'push',
                            },
                            resize: true,
                        },
                        modes: {
                            grab: {
                                distance: 400,
                                lineLinked: {
                                    opacity: 1,
                                },
                            },
                            bubble: {
                                distance: 400,
                                size: 80,
                                duration: 2,
                                opacity: 1,
                                speed: 2,
                            },
                            repulse: {
                                distance: 200,
                            },
                            push: {
                                particles_nb: 4,
                            },
                            remove: {
                                particles_nb: 2,
                            },
                        },
                    },
                    // backgroundMask: {
                    //     enable: true,
                    //     cover: {
                    //         color: {
                    //             value: {
                    //                 r: 240,
                    //                 g: 224,
                    //                 b: 250,
                    //             },
                    //         },
                    //     },
                    // },
                    retina_detect: true,
                    fps_limit: 60,
                    // background: {
                    //     image: "url('https://particles.js.org/images/background3.jpg')",
                    // },
                }}
            />
        </>
    );
};
