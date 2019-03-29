import {mappedCoursesAgain} from './HomeLogic'

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