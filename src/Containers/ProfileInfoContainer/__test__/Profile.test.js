const functions = require('./ProfileLogic');
describe('Make sure library works', () => {
  test('Jest works', () => {
    expect(4).toBe(4);
  });
});
describe('Toggle Buttons in Profile', () => {
  test('student info to be false', () => {
    expect(functions.toggleStudentButton()).toBe(false);
  });
  test('Toggle Course Info Button', () => {
    expect(functions.toggleCourseInfo()).toBe(true);
  });
});
