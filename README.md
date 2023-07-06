# ETS - Exception TypeScript
Error formatter fully written in Typescript.

## Description
Helps manage exception and error handling, catch and format the output in a suitable format.

## Samples

### Formating
The following code shows how an error is caught and formatted using ETS.

```
console.log(Ets.formate("Test1: Error, client not found!", true));
```

or

```
try {
    throw new Error('Test2: This my test exception');
} catch (e) {
    console.log(Ets.formate(e, true));
    console.log('\n\n');
}
```

### EtsError object
Use or extend errors by deriving the EtsError object and formatting them.

```
class MyTest {

    public thisIsATest(): void {
        throw new EtsError('My EtsError');
    }

}

try {
    const test = new MyTest();
    test.thisIsATest();
} catch (e) {
    console.log(Ets.formate(e, true, true));
    console.log(Ets.toJson(e, true));
    console.log('\n\n');
}

```

### ErrorCollection object
For validations or processes that run in parallel, it can be advantageous to collect the exceptions and then throw the exception collection as an exception.

```
class MyTest {

    public thisIsATest(): void {
        throw new EtsError('My EtsError');
    }

}

const test = new MyTest();

const errCol = new ErrorCollection();

errCol.trycatch(() => {
   test.thisIsATest();
});

errCol.trycatch(() => {
    throw new EtsError('My EtsError Col');
});

errCol.trycatch(() => {
    throw new Error('Test2: This my test exception Col');
});

errCol.trycatch(() => {
    test.thisIsATest();
});

console.log(errCol);
console.log('\n\n');
```
