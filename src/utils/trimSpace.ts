export function trimSpace(stringInput:string):string{
  let str = stringInput.replace(/\s/g, '');
  return str
}