/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { tryCatch } from "ramda";
import Api from "../tools/api";

const api = new Api();

const pipeAsync =
    (...fns) =>
    (arg) =>
        fns.reduce(
            (p, f) =>
                p.then(f).catch((err) => {
                    throw err;
                }),
            Promise.resolve(arg)
        );

const validate = (value) => {
    if (
        value.length < 10 &&
        value.length > 2 &&
        /[+-]?\d+(\.\d*)?/.test(value) &&
        !value.startsWith("-")
    ) {
        return value;
    }
    throw new Error("ValidationError");
};

const round = (value) => {
    return Math.round(Number(value));
};

const getConverted = (value) => {
    return api
        .get("https://api.tech/numbers/base", {
            from: 10,
            to: 2,
            number: value,
        })
        .then(({ result }) => result);
};

const getLength = (value) => {
    return String(value).length;
};

const getSquare = (value) => {
    return value * value;
};

const getModuleThree = (value) => {
    return value % 3;
};

const getAnimal = (value) => {
    return api
        .get(`https://animals.tech/${value}`, {})
        .then(({ result }) => result);
};

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const log = (value) => {
        writeLog(value);
        return value;
    };

    const catcher = (err, value) => {
        console.log(err);
        handleError(err.message);
        // return value;
    };

    pipeAsync(
        log,
        tryCatch(validate, catcher),
        round,
        log,
        tryCatch(getConverted, catcher),
        log,
        getLength,
        log,
        getSquare,
        log,
        getModuleThree,
        log,
        tryCatch(getAnimal, catcher),
        handleSuccess
    )(value);
};

export default processSequence;
