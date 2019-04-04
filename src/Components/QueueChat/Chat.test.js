import { messageDisplay } from "./ChatLogic";

describe("Chat feature test", () => {
  
  test("resultant array length should be correct", () => {
    let result = messageDisplay([{message:'hello'},{message:'there'}])
    expect(result.length).toBe(2);
  });

  test("it should return a array", () => {
    let result = messageDisplay([{message:'fdzs'}]);
    expect(Array.isArray(result)).toBe(true);
  });

  test('if length is zero it should return an empty array',()=>{
      let result = messageDisplay([])
      expect(result.length).toBe(0)  
  })
});
