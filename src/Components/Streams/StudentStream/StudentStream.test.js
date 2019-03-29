import {finder} from './StudentStreamLogic';

describe('Student Stream Test', () => {
    
  test('it should exist', () => {
      expect(finder).toBeDefined();
  })
    test('it should return a array', () => {
      let result = finder([1,2,3,4,5],1);
      console.log(typeof result)
      expect(typeof result).toBe('object');
    })

    // test('it should return 0 if passed a boolean', () => {
    //   let result = add(true, 9);
    //   expect(result).toBe(0);
    // })
    // test('it should return 0 if passsed NaN', ()=> {
    //   let result = add(NaN, 9);
    //   expect(result).toBe(0);
    // })
  })