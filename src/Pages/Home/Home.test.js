import {mappedCoursesAgain, mappedSubjectsAgain} from './HomeLogic'

describe('Making sure things come back right', () => {
    test('return stuff plz', () => {
        expect(mappedCoursesAgain).toBeTruthy()
    })
    test('hopefully issa function', () => {
        expect(typeof mappedCoursesAgain).toEqual('function')
    })
    test('it is defined', () => {
        expect(mappedCoursesAgain).toBeDefined()
    })
})

describe('makin sure the other things come back right', () => {
    test('subjects are the truth', () => {
        expect(mappedSubjectsAgain).toBeTruthy()
    })
    test('its a function, right?', () => {
        expect(typeof mappedSubjectsAgain).toBe('function')
    })
})