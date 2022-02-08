export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function tryRequire(path, alt) {
    try {
        return require(`../assets/${path}`);
    } catch (err) {
        if (alt) tryRequire(alt);
        return null;
    }
};

export async function getCurrentPosition() {
    try {
        const geolocation = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(coords => { resolve(coords) }, err => { reject(err) });
        });
        return { lat: geolocation.coords.latitude, lng: geolocation.coords.longitude };
    } catch (err) {
        console.log(err);
    }
}

export async function getDistanceInKm(location1, location2) {
    location2 ??= await getCurrentPosition();
    if (!location1 || !location2) return;
    const p = Math.PI / 180;
    const r = 6371;
    const cos = Math.cos;
    const a = 0.5 - cos((location2.lat - location1.lat) * p) / 2 +
        cos(location1.lat * p) * cos(location2.lat * p) *
        (1 - cos((location2.lng - location1.lng) * p)) / 2;
    const res = Math.round((2 * r) * Math.asin(Math.sqrt(a)));
    return res;
}

export function getShortSentence(str, length = 48) {
    if (str.length < length) return str.charAt(0).toUpperCase() + str.slice(1);
    var res = str.substr(0, length);
    res = str.substr(0, Math.min(res.length, res.lastIndexOf(" ")));
    return res.charAt(0).toUpperCase() + res.slice(1) + '...';
}

export function sentenceToKababCase(str) {
    if (!str) return;
    return str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
}

export function sentenceToCamelCase(str) {
    if (!str) return;
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function camelCaseToSentence(input, isOnlyFirst = true) {
    if (!input) return;
    if (typeof input === 'string') input = [input];
    return input.map(key => key.replace(/[A-Z]/g, letter => (isOnlyFirst) ? ` ${letter.toLowerCase()}` : ` ${letter}`).replace(/[a-z]/, letter => letter.toUpperCase())).join(' » ')
};

export function kababCaseToSentence(str) {
    if (!str) return;
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function typeOf(obj) {
    return /[\s-]\w+(|\])/.exec(Object.prototype.toString.call(obj))[0].trim();
}

const DEBOUNCES = {};
export function debounce(fn, id = 0, delay = 500) {
    clearTimeout(DEBOUNCES[id]);
    DEBOUNCES[id] = null;
    return ((...args) => {
        DEBOUNCES[id] = setTimeout(() => {
            delete DEBOUNCES[id];
            if (typeof fn === 'function')
                fn(...args);
        }, delay);
    })();
}

export function makeId(length = 8) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function extractConditionKey(cKey) {
    const idx = /([A-Z]|\_)/g.exec(cKey)?.index;
    let key = cKey.slice(idx);
    key = key.charAt(0).toLowerCase() + key.slice(1);
    let condition = cKey.slice(0, idx);
    return { key, condition };
}  