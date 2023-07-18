/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
    allPass,
    compose,
    prop,
    partial,
    equals,
    reduce,
    values,
    not,
} from "ramda";

const isWhite = equals("white");
const isRed = equals("red");
const isOrange = equals("orange");
const isGreen = equals("green");
const isBlue = equals("blue");

const getCircle = prop("circle");
const getSquare = prop("square");
const getTriangle = prop("triangle");
const getStar = prop("star");

const sumByColor = (colorCheck, acc, value) => (acc += colorCheck(value));
const countWithCondition = (fn, figures) =>
    reduce(partial(sumByColor, [fn]), 0, figures);

const isWhiteTriangle = compose(isWhite, getTriangle);
const isWhiteCircle = compose(isWhite, getCircle);
const isRedStar = compose(isRed, getStar);
const isNotRedStar = compose(not, isRedStar);
const isNotWhiteStar = compose(not, isWhite, getStar);
const isGreenSquare = compose(isGreen, getSquare);
const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);
const isGreenTriangle = compose(isGreen, getTriangle);
const isNotWhiteTriangle = compose(not, isWhiteTriangle);
const isNotWhiteSquare = compose(not, isWhite, getSquare);

const triangleEqualsSquare = (figures) =>
    getTriangle(figures) === getSquare(figures);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (figures) => {
    return allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle])(
        figures
    );
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
    return countWithCondition(isGreen, values(figures)) >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    return (
        countWithCondition(isRed, values(figures)) ===
        countWithCondition(isBlue, values(figures))
    );
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (figures) => {
    return allPass([isBlueCircle, isRedStar, isOrangeSquare])(figures);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
    return (
        countWithCondition(isRed, values(figures)) >= 3 ||
        countWithCondition(isOrange, values(figures)) >= 3 ||
        countWithCondition(isGreen, values(figures)) >= 3 ||
        countWithCondition(isBlue, values(figures)) >= 3
    );
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (figures) => {
    return (
        countWithCondition(isGreen, values(figures)) === 2 &&
        countWithCondition(isRed, values(figures)) &&
        isGreenTriangle(figures)
    );
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => {
    return countWithCondition(isOrange, values(figures)) === 4;
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (figures) => {
    return allPass([isNotRedStar, isNotWhiteStar])(figures);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => {
    return countWithCondition(isGreen, values(figures)) === 4;
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (figures) => {
    return allPass([isNotWhiteTriangle, isNotWhiteSquare, triangleEqualsSquare])(
        figures
    );
};
