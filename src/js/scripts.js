const myFunc = (function myFunc() {
    const obj = {};
    obj.init = function init() {
        // Initialisation code here
        console.log('my func init');
    };
    return obj;
}());
export default myFunc;
