/*! For license information please see bundle.js.LICENSE.txt */
var NLPClient;
(() => {
    "use strict";
    var module = {
        define: (exports, definitions) => {
            for (var key in definitions) module.hasOwnProperty(definitions, key) && !module.hasOwnProperty(exports, key) && Object.defineProperty(exports, key, { enumerable: true, get: definitions[key] });
        },
        hasOwnProperty: (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop),
        markAsModule: (exports) => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports, "__esModule", { value: true });
        }
    }, exports = {};

    function getType(value) {
        return typeof value === "symbol" ? "symbol" : typeof value;
    }

    function createIterator() {
        var object = { type: "normal", value: undefined };
        return {
            next: function (value) {
                return object.value = value, object.done = false, object;
            },
            return: function (value) {
                return object.value = value, object.done = true, object;
            },
            throw: function (error) {
                throw error;
            }
        };
    }

    function asyncIterator(generator) {
        var iterator = generator();
        return {
            next: function (value) {
                return iterator.next(value);
            },
            return: function (value) {
                return iterator.return(value);
            },
            throw: function (error) {
                return iterator.throw(error);
            }
        };
    }

    function asyncFunction(generator) {
        var iterator = asyncIterator(generator);
        return function () {
            return new Promise(function (resolve, reject) {
                function handleResult(result) {
                    if (result.done) {
                        resolve(result.value);
                    } else {
                        Promise.resolve(result.value).then(
                            function (value) { handleResult(iterator.next(value)); },
                            function (error) { handleResult(iterator.throw(error)); }
                        );
                    }
                }
                handleResult(iterator.next());
            });
        };
    }

    module.markAsModule(exports);
    module.define(exports, { validateURL: () => isValidURL, handleSubmit: () => submitHandler });

    var submitHandler = asyncFunction(function* (event) {
        event.preventDefault();
        var url = document.getElementById("URL").value;
        if (!isValidURL(url)) {
            alert("Invalid URL. Please enter a valid URL.");
            return;
        }
        try {
            var response = yield postData("http://localhost:8000/api", { url: url });
            console.log("Response received:", response);
            updateResults(response);
        } catch (error) {
            console.error("Error:", error);
        }
    });

    var postData = asyncFunction(function* (url, data) {
        console.log("Sending data:", data);
        var response = yield fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "same-origin",
            mode: "cors"
        });
        var result = yield response.json();
        console.log("Received data:", result);
        return result;
    });

    function updateResults(data) {
        var fields = { score_tag: "score_tag", agreement: "agreement", subjectivity: "subjectivity", confidence: "confidence", irony: "irony" };
        Object.keys(fields).forEach(function (key) {
            document.getElementById(fields[key]).textContent = formatResult(key, data[key]);
        });
    }

    function formatResult(key, value) {
        return key === "score_tag" ? mapSentiment(value) : value;
    }

    function mapSentiment(tag) {
        var sentimentMap = {
            "P+": "strong positive",
            "P": "positive",
            "NEW": "neutral",
            "N": "negative",
            "N+": "strong negative",
            "NONE": "no sentiment"
        };
        return sentimentMap[tag] ? sentimentMap[tag].toUpperCase() : "UNKNOWN";
    }

    function isValidURL(url) {
        var pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+\/?.*$/;
        return pattern.test(url);
    }

    NLPClient = exports;
})();
