import { messageDisplay } from "./ChatLogic";

describe("Chat feture test", () => {
  test("it should exist", () => {
    expect(messageDisplay).toBeDefined();
  });

  test("it should return a array", () => {
    let result = messageDisplay([{message:'fdzs'}]);
    expect(typeof result).toBe("object");
  });

  test('if length is zero it should return an empty array',()=>{
      let result = messageDisplay([])
      expect(result.length).toBe(0)  
  })
});
