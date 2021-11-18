export function isntNullTypeGuard<MyType>(link: MyType | null): link is MyType {
  return link !== null;
}
