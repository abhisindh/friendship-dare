# THE ALGORITHM USED TO ENCODE THE LIST OF QUESTIONS AND ANSWERS INTO THE QUERY

### Objectives

- The query should be short as possible
- The query should look cryptic (randomized)

### Constraints

- There are 26 lower case character
- 26 upper case character
- 10 numerical digits (`0` is not used in the current version)
- usage of symbols are reduced (only `'-'` is used)

### Algorithm
- Uniformly distribute the lower case, upper case and numerical digits
- For the first 60 integers, use the character in its corresponding index
- For integers greater than that add `'-'` before it to specify that

### Implementation

- To uniformly distribute the numerical digits, created an arithmetic progression that starts with `0` and has common difference `7.5`. Since the maximum number is `60`, this creates an AP with `9` terms as expected. Use the integer parts of the terms to our list
- So the numbers that will be converted to numerical characters are:
```js
    const to_numeric = [0, 7, 15, 22, 30, 37, 45, 52, 60]
```
- The remaining numbers are added to lower case and upper case alternatively
-  Following are the mentioned lists
```js
    const to_captial = [1, 3, 5, 8, 10, 12, 14, 17, 19, 21, 24, 26, 28, 31, 33, 35, 38, 40, 42, 44, 47, 49, 51, 54, 56, 58]
    const to_lower = [2, 4, 6, 9, 11, 13, 16, 18, 20, 23, 25, 27, 29, 32, 34, 36, 39, 41, 43, 46, 48, 50, 53, 55, 57, 59]

```
- Now we create an empty list named `order` and append the character based on the above lists
- That is if `i` is in the `to_lower` list, the `i`th element of `order` will be a lower case character
- Characters are added in their conventional order (1,2,3...) , (a,b,c,...), (A,B,C,...)
- The resulting list is:
```js
const  order = ['1', 'A', 'a', 'B', 'b', 'C', 'c', '2', 'D', 'd', 'E', 'e', 'F', 'f', 'G', '3', 'g', 'H', 'h', 'I', 'i', 'J', '4', 'j', 'K', 'k', 'L', 'l', 'M', 'm', '5', 'N', 'n', 'O', 'o', 'P', 'p', '6', 'Q', 'q', 'R', 'r', 'S', 's', 'T', '7', 't', 'U', 'u', 'V', 'v', 'W', '8', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', '9']
```

### Drawbacks
- Many characters that can be used are not used because of lack of research
- The addition of `-` to specify out-of-range will work only for numbers a few multiples larger than the range after which the url will not look randomized 
- The same algorithm is not effective to specify options of questions . Since there are only a maximum of 4 options, the coded message would look less cryptic. Need to randomize it more