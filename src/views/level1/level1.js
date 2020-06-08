const myNewFunc = (function myNewFunc() { // eslint-disable-line no-unused-vars
    const obj = {};
    obj.init = function init() {
        // Initialisation code here
        console.log('my new func init');
    };
    return obj;
}());
export default myNewFunc;
