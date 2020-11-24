import SlimSelect from 'slim-select';

export const AutoComplete = (function AutoComplete() {
    const obj = {};
    obj.init = function init() {
        new SlimSelect({
            select: '#mySelect',
            searchingText: 'Searching...',
            ajax: (search, callback) => {
                if (search.length < 3) {
                    callback('Need 3 characters');
                    return;
                }
                fetch('https://restcountries.eu/rest/v2/all')
                    .then((response) => response.json())
                    .then((json) => {
                        const data = [];
                        for (let i = 0; i < json.length; i += 1) {
                            data.push({ text: json[i].name, value: json[i].name });
                        }
                        callback(data);
                    })
                    .catch((error) => {
                        console.debug(error);
                        callback(false);
                    });
            },
        });
    };
    return obj;
}());
