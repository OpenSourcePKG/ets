import {ErrorCollection} from '../src/errorCollection.js';
import {Ets, EtsError} from '../src/index.js';

console.log(Ets.formate("Test1: Error, client not found!", true));
console.log('\n\n');

// ---------------------------------------------------------------------------------------------------------------------

try {
    throw new Error('Test2: This my test exception');
} catch (e) {
    console.log(Ets.formate(e, true));
    console.log('\n\n');
}

// ---------------------------------------------------------------------------------------------------------------------

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


// ---------------------------------------------------------------------------------------------------------------------

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