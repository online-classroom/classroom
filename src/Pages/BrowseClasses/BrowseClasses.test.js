import { getHour, teacherNameDisplay } from "./BrowseClassesLogic";

describe("Select Hour", () => {

    test("Time is Correct", () => {
        let result = getHour('2019-04-05T03:00:00.000Z')
        expect(typeof result).toBe('number');
    })
      
    test("Is Inetger", () => {
        let result = getHour('2019-04-05T08:00:00.000Z')
        expect(result).toBe(Math.floor(result));
    })

    test("Time is Correct", () => {
      let result = getHour('2019-04-05T06:00:00.000Z')
      expect(result).toBe(0);
    })

});

describe("Teacher Name", () => {

    test("Time is Correct", () => {
        let result = teacherNameDisplay('Kevin', 'Wingman')
        expect(typeof result).toBe('object');
    })

    test("Time is Correct", () => {
        let result = teacherNameDisplay('Kevin', 'Wingman')
        expect(result.props.children[1]).toBe('Kevin');
    })

    test("Time is Correct", () => {
        let result = teacherNameDisplay('Kevin', 'Wingman')
        expect(result.props.children[3]).toBe('Wingman');
    })

});