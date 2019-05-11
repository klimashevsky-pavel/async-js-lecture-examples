const mockCollections = {
    listeners: [
        {
            id: '1',
            name: 'Fred',
            eventId: 'ev1'
        },
        {
            id: '2',
            name: 'Bill',
            eventId: 'ev2'
        },
        {
            id: '3',
            name: 'Steve',
            eventId: 'ev3'
        },
    ],
    events: [
        {
            id: 'ev1',
            name: 'Amazing JS',
            speakerId: 'sp1'
        },
        {
            id: 'ev2',
            name: 'Microservices',
            speakerId: 'sp2'
        },
        {
            id: 'ev3',
            name: 'Building Web Applications',
            speakerId: 'sp1'
        }
    ],
    speakers: [
        {
            id: 'sp1',
            name: 'Alex'
        },
        {
            id: 'sp2',
            name: 'Mike'
        },
    ]
};

const getDataFromMock = options => {
    const { collectionName, searchParams } = options;
    const collection = _.get(mockCollections, collectionName);
    return _.find(collection, searchParams);
}

const fakeRequest = (options, callback) => {
    const delay = 1000;
    const data = getDataFromMock(options);
    if (!data) {
        const error = new Error('No such data');
        setTimeout(callback, delay, error, null);
    } else {
        setTimeout(callback, delay, null, data);
    }
}

const doSomethingForProvidedDuration = duration => {
    const startTime = Date.now();
    while ((Date.now() - startTime) < duration ) {
        // do nothing
    }
}

const addEventForRunButtonClick = eventHandler => {
    document.getElementById('run-example').addEventListener('click', eventHandler);
}

const writeToBlock = (blockId, text) => {
    const newDiv = document.createElement('div');
    newDiv.innerText = text;
    document.getElementById(blockId).appendChild(newDiv);
}

// ========================= Timers =========================


// ========== SetInterval vs SetTimeout ==========

// const recursiveTimeoutAndIntervalComparison = () => {
//     const recursiveTimeout = () => {
//         doSomethingForProvidedDuration(200);
//         writeToBlock('block-2', 'timeout');
//         setTimeout(recursiveTimeout, 1000);
//     }

//     setInterval(() => {
//         doSomethingForProvidedDuration(200);
//         writeToBlock('block-1', 'interval');
//     }, 1000);

//     setTimeout(recursiveTimeout, 1000);

// }

// addEventForRunButtonClick(recursiveTimeoutAndIntervalComparison);

// ========================= Async callbacks =========================

// ========== Callback hell ==========

// const getSpeakerInfoFromListenerId = () => {
//     const listenerId = '1';
//     const getListenerByIdOptions = {
//         collectionName: 'listeners',
//         searchParams: { id: listenerId }
//     };
//     fakeRequest(getListenerByIdOptions, (err, listener) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         console.log(listener);
//         const { eventId } = listener;
//         const getEventByIdOptions = {
//             collectionName: 'events',
//             searchParams: { id: eventId }
//         };
//         fakeRequest(getEventByIdOptions, (err, event) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
            
//             console.log(event);
//             const { speakerId } = event;
//             const getSpeakerByIdOptions = {
//                 collectionName: 'speakers',
//                 searchParams: { id: speakerId }
//             };

//             fakeRequest(getSpeakerByIdOptions, (err, speaker) => {
//                 if (err) {
//                     console.error(err);
//                     return;
//                 }

//                 console.log(speaker);
//             });
//         });
//     });
// }

// addEventForRunButtonClick(getSpeakerInfoFromListenerId);

// ========== Callback hell partitial resolution ==========

// const getListenerCallback = (err, listener) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     console.log(listener);
//     const { eventId } = listener;
//     const getEventByIdOptions = {
//         collectionName: 'events',
//         searchParams: { id: eventId }
//     };
//     fakeRequest(getEventByIdOptions, getEventCallback)
// }

// const getEventCallback = (err, event) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     console.log(event)
//     const { speakerId } = event;
//     const getEventByIdOptions = {
//         collectionName: 'speakers',
//         searchParams: { id: speakerId }
//     };
//     fakeRequest(getEventByIdOptions, getSpeakerCallback)
// }

// const getSpeakerCallback = (err, speaker) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     console.log(speaker);
// }

// const getSpeakerInfoFromListenerId = () => {
//     const listenerId = '1';
//     const getListenerByIdOptions = {
//         collectionName: 'listeners',
//         searchParams: { id: listenerId }
//     };
//     fakeRequest(getListenerByIdOptions, getListenerCallback);
// }

// addEventForRunButtonClick(getSpeakerInfoFromListenerId);

// ========================= Promises =========================

// const getCoinFlipPromise = () => new Promise((resolve, reject) => {
//     const randomNumber = Math.random();

//     if (randomNumber < 0.5) {
//         setTimeout(() => {
//             const result = 'Heads';
//             resolve(result);
//         }, 1000);
//     } else {
//         setTimeout(() => {
//             const error = new Error('Tails');
//             reject(error);
//         }, 1000);
//     }
// });

// const promiseCoinFlip = new Promise((resolve, reject) => {
//     const randomNumber = Math.random();

//     if (randomNumber < 0.5) {
//         setTimeout(() => {
//             const result = 'Heads';
//             resolve(result);
//         }, 1000);
//     } else {
//         setTimeout(() => {
//             const error = new Error('Tails');
//             reject(error);
//         }, 1000);
//     }
// });

// ========== then ==========

// promiseCoinFlip
//     .then(
//         () => {
//             console.log(`Congratulations with ${result}`);
//             return 'Hooray!';
//         },
//         err => {
//             console.log(`Unfortunately, it's ${err.message}`)
//             return 'Meeh.';
//         }
//     )
// // ==========
//     .then(reaction => {
//         console.log(`${reaction} Lets try again`);
//         return getCoinFlipPromise()
//     })
// // // ==========
//     .then(
//         result => {
//             console.log(`And it's ${result}!`)
//         },
//         err => {
//             console.log(`I'm sorry, ${err.message}`)
//         }
//     )

// ========== catch and finally ==========

// promiseCoinFlip
//     .then(result => {
//         console.log(`Congratulations with ${result}`);
//     })
//     .then(() => {
//         console.log(`Lets try again`);
//         return getCoinFlipPromise();
//     })
//     .then(result => {
//         console.log(`And it's ${result} again!`);
//     })
//     .catch(err => {
//         console.log(`Ooops, it's ${err.message}`);
//     })

// // ========== promisification ==========

// const promiseRequest = options => {
//     return new Promise((resolve, reject) => {
//         fakeRequest(options, (err, result) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(result);
//         });
//     });
// }

// // const getSpeakerInfoFromListenerId = () => {
// //     const listenerId = '1';
// //     const getListenerByIdOptions = {
// //         collectionName: 'listeners',
// //         searchParams: { id: listenerId }
// //     };
// //     promiseRequest(getListenerByIdOptions)
// //         .then(listener => {
// //             console.log(listener)

// //             const { eventId } = listener;
// //             const getEventByIdOptions = {
// //                 collectionName: 'events',
// //                 searchParams: { id: eventId }
// //             };
// //             return promiseRequest(getEventByIdOptions);
// //         })
// //         .then(event => {
// //             console.log(event);

// //             const { speakerId } = event;
// //             const getSpeakerByIdOptions = {
// //                 collectionName: 'speakers',
// //                 searchParams: { id: speakerId }
// //             };
// //             return promiseRequest(getSpeakerByIdOptions);
// //         })
// //         .then(speaker => {
// //             console.log(speaker);
// //         })
// //         .catch(err => {
// //             console.log(`Error occured during get Listener process: ${err.message}`);
// //         })
// // }

// // addEventForRunButtonClick(getSpeakerInfoFromListenerId);

// // ========== promisification refactored ==========

// getListenerFromListenerId = listenerId => {
//     const getListenerByIdOptions = {
//         collectionName: 'listeners',
//         searchParams: { id: listenerId }
//     };
//     return promiseRequest(getListenerByIdOptions)
// }

// const getEventFromListener = listener => {
//     console.log(listener)

//     const { eventId } = listener;
//     const getEventByIdOptions = {
//         collectionName: 'events',
//         searchParams: { id: eventId }
//     };
//     return promiseRequest(getEventByIdOptions);
// }

// const getSpeakerFromEvent = event => {
//     console.log(event);
//     const { speakerId } = event;
//     const getSpeakerByIdOptions = {
//         collectionName: 'speakers',
//         searchParams: { id: speakerId }
//     };
//     return promiseRequest(getSpeakerByIdOptions);
// }

// const getSpeakerName = speaker => {
//     console.log(speaker);
//     return speaker.name;
// }

// const errorHandler = err => {
//     console.log(`Error occured during get Listener process: ${err.message}`);
// }

// const getSpeakerInfoFromListenerId = () => {
//     const listenerId = '1';
//     getListenerFromListenerId(listenerId)
//         .then(getEventFromListener)
//         .then(getSpeakerFromEvent)
//         .then(getSpeakerName)
//         .catch(errorHandler)
// }

// addEventForRunButtonClick(getSpeakerInfoFromListenerId);

// ========== Promise API==========

// Promise.resolve('success').then(value => {
//     console.log(value);
// })

// Promise.reject(new Error('my error')).catch(err => {
//     console.log(err.message);
// })

// Promise.all([
//     getListenerFromListenerId('1'),
//     getListenerFromListenerId('2'),
//     getListenerFromListenerId('7')
// ])
//     .then(listener => { console.log(listener) })
//     .catch(err => { console.log(err.message) })

// ========================= Async/await =========================

// ========== warmup ==========

// const sayHiAsync = async () => {
//     console.log('async Hi!');
// }

// const sayHiSync = () => {
//     console.log('sync Hi!');
// }

// sayHiAsync();
// sayHiSync();

// const getRandomNumberAsync = async () => {
//     return Math.random();
// }

// const randomNumber = getRandomNumberAsync();
// randomNumber.then(number => { console.log(number) });
// console.log(randomNumber);

// const someAsyncFunction = async () => {
//     console.log('start function');
//     // "pausing" function untils promised will be resolved, 2 secs
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     console.log('continue');
// }

// someAsyncFunction();

// setTimeout(() => {
//     console.log('some timer meanwhile')
// }, 1000);

// const checkWeather = async () => {
//     console.log('What is the weather today?')
//     const weatherForecast = await new Promise(resolve => {
//         setTimeout(() => resolve('Sunny, +25'), 2000);
//     });
//     console.log(weatherForecast);
// }

// checkWeather();

// ========== synchronous asynchronous code ==========

// const getSpeakerNameFromListenerIdAsync = async listenerId => {
//     try {
//         const listener = await getListenerFromListenerId(listenerId);
//         const event = await getEventFromListener(listener);
//         const speaker = await getSpeakerFromEvent(event);af

//         const { name } = speaker;
//         return name;
//     } catch (e) {
//         errorHandler(e);
//         return 'Speaker was not found 11';
//     }
// }

// const logSpeakerName = async () => {
//     const listenerId = '2';
//     const speakerName = await getSpeakerNameFromListenerIdAsync(listenerId);
//     console.log(speakerName);
// }

// addEventForRunButtonClick(logSpeakerName);

// ========== async/await with promises ==========

// const getListenersFromArrayOfIds = async listenersIds => {
//     const promises = listenersIds.map(listenerId => 
//         getListenerFromListenerId(listenerId)
//     );
//     const listeners = await Promise.all(promises);
//     console.log(listeners);

//     return listeners;
// }

// getListenersFromArrayOfIds(['1', '2']);


// Promise.resolve(['1', '2', '3'])
//     .then(getListenersFromArrayOfIds)
//     .then(listeners => {
//         console.log('Look, we got some listeners:', listeners)
//     });

// ========================= Microtasks vs Tasks =========================

// const taskLoop = () => {
//     console.log('executing task');
//     setTimeout(taskLoop, 0);
// }

// const microtaskLoop = () => {
//     console.log('executing microtask');
//     Promise.resolve().then(microtaskLoop);
// }

// const runRecursiveTask = () => {
//     taskLoop();
// }

// const runRecursiveMicrotask = () => {
//     microtaskLoop();
// }

// let initialLeft = 50;

// const moveSquare = () => {
//     document.getElementById('square').style.left = ++initialLeft + 'px';
//     requestAnimationFrame(moveSquare);
// }

// moveSquare();

// addEventForRunButtonClick(runRecursiveMicrotask);

// setTimeout(() => console.log('task'), 0);
// Promise.resolve()
//     .then(() => console.log('microtask 1'))
//     .then(() => console.log('microtask 2'))

// Output:
// microtask 1
// microtask 2
// task
