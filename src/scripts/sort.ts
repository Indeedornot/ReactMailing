type sortArg<T> = keyof T | `-${string & keyof T}`;

/**
 * Returns a comparator for objects of type T that can be used by sort
 * functions, were T objects are compared by the specified T properties.
 *
 * @param sortBy - the names of the properties to sort by, in precedence order.
 *                 Prefix any name with `-` to sort it in descending order.
 */
export function byPropertiesOf<T extends object>(sortBy: Array<sortArg<T>>) {
  function compareByProperty(arg: sortArg<T>) {
    let key: keyof T;
    let sortOrder = 1;
    if (typeof arg === "string" && arg.startsWith("-")) {
      sortOrder = -1;
      // Typescript is not yet smart enough to infer that substring is keyof T
      key = arg.substring(1) as keyof T;
    } else {
      // Likewise it is not yet smart enough to infer that arg here is keyof T
      key = arg as keyof T;
    }

    return function (a: T, b: T) {
      let result;
      if (a[key] < b[key]) result = -1;
      else if (a[key] > b[key]) result = 1;
      else result = 0;

      return result * sortOrder;
    };
  }

  return function (obj1: T, obj2: T) {
    let i = 0;
    let result = 0;
    const numberOfProperties = sortBy?.length;
    while (result === 0 && i < numberOfProperties) {
      result = compareByProperty(sortBy[i])(obj1, obj2);
      i++;
    }

    return result;
  };
}

/**
 * Sorts an array of T by the specified properties of T.
 *
 * @param arr - the array to be sorted, all of the same type T
 * @param sortBy - the names of the properties to sort by, in precedence order.
 *                 Prefix any name with `-` to sort it in descending order.
 */
export function sort<T extends object>(
  arr: T[],
  ...sortBy: Array<sortArg<T>>
): T[] {
  const arrCopy = [...arr];
  arrCopy.sort(byPropertiesOf<T>(sortBy));
  return arrCopy;
}

/*
    example usage:

        interface User {
            name: string
            id: string
            age?: number
        }

        const users: User[] = [
            {name: 'Harriet Tubman', id: '01', age: 53},
            {name: 'John Brown', id: '02', age: 31},
            {name: 'John Brown', id: '03', age: 59},
            {name: 'James Baldwin', id: '04', age: 42},
            {name: 'Greta Thunberg', id: '05', age: 17}
        ]

        // using Array.sort directly
        users.sort(byPropertiesOf<User>(['name', '-age', 'id']))

        // using the convenience function for much more readable code
        sort(users, 'name', '-age', 'id')
 */
