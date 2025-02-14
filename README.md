# Bisaya++ Programming Language 

## Introduction

Bisaya++ is a strongly-typed high-level interpreted programming language based on the Cebuano language. It is designed to help Cebuanos learn the basics of programming through a simple syntax and native keywords, making it more intuitive and accessible.

This repository serves as a collaborative project for implementing an interpreter for Bisaya++. Our goal is to develop a working interpreter and related tools to support the language.

## Contributors:

- Zak Floreta
- Derrick Binangbang
- Jether Omictin

## Features of Bisaya++

- **Simple Syntax:** Uses Cebuano keywords to make programming more intuitive.
- **Strongly Typed:** Supports multiple data types such as `NUMERO` (integer), `TIPIK` (float), `LETRA` (character), and `TINUOD` (boolean).
- **Basic Control Flow:** Includes conditionals (`KUNG`, `KUNG WALA`), loops (`ALANG SA`), and logical operations (`UG`, `O`, `DILI`).
- **Input & Output:** Uses `DAWAT` for input and `IPAKITA` for output.

## Example Program in Bisaya++

```bisaya++
-- Example: Arithmetic operations and output
SUGOD
    MUGNA NUMERO x, y, z=5  
    MUGNA LETRA a_1=’n’  
    MUGNA TINUOD t="OO"  
    
    x=y=4
    a_1=’c’  
    
    IPAKITA: x & t & z & $ & a_1 & [#] & “last”
KATAPUSAN
```

**Expected Output:**

```
4OO5
c#last
```

##

## How to Contribute

1. Fork the repository.
2. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/your-username/bisaya-plus-plus-interpreter.git
   ```
3. Create a new branch for your feature:
   ```sh
   git checkout -b feature-name
   ```
4. Make your changes and commit them:
   ```sh
   git commit -m "Add feature: description"
   ```
5. Push your branch and create a pull request.

## License

This project is open-source and licensed under the MIT License.

## Acknowledgments

Special thanks to the developers and contributors working on Bisaya++. This project is inspired by the desire to make programming more accessible to Cebuano speakers.

