import {mappedSubjects, displayLecturesBySubjectId} from './Home';

describe('Making sure things come back right', () => {
    test('truthy', () => {
        let subjects = mappedSubjects
        expect(subjects).toBeTruthy()
    })
    test('return stuff plz', () => {
        expect(displayLecturesBySubjectId).toBeTruthy()
    })
})