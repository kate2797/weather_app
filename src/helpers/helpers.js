import { WMO } from "./constants";

export const range = (start, stop, step) => {
  return Array.from(
    { length: (stop - start) / step },
    (_, i) => start + i * step
  );
};

export const getDayHours = () => {
  let hours = [];
  let suffix = ":00";
  for (let i = 0; i < 24; i++) {
    let hour = i + suffix;
    hours.push(hour);
  }
  return hours;
};

export const divideData = (weatherData, MAX_LENGTH) => {
  let relativeHumidity2m = weatherData.relativeHumidity2m; // Array
  let surfacePressure = weatherData.surfacePressure;
  let temperature2m = weatherData.temperature2m;
  let time = weatherData.time;
  let weatherCode = weatherData.weatherCode;
  let combined = [];
  let data = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  for (let i = 0; i < MAX_LENGTH; i++) {
    let entry = {
      hum: relativeHumidity2m[i],
      pressure: surfacePressure[i],
      temp: temperature2m[i],
      time: time[i],
      code: weatherCode[i],
    };
    combined.push(entry);
  }

  data[0] = combined.slice(0, 24);
  data[1] = combined.slice(24, 48);
  data[2] = combined.slice(48, 72);
  data[3] = combined.slice(72, 96);
  data[4] = combined.slice(96, 120);
  data[5] = combined.slice(120, 144);
  data[6] = combined.slice(144, 168);
  return data;
};

export const convert = (temp, unit) => {
  if (unit === "Celsius") {
    return (9 / 5) * temp + 32;
  }
  return temp;
};

export const computeResult = (temp, unit, hum) => {
  temp = convert(temp, unit);
  return calculateHeatIndex(temp, hum);
};

export const calculateHeatIndex = (tempFarenheit, relHumidity) => {
  let expT = tempFarenheit * tempFarenheit;
  let expH = relHumidity * relHumidity;
  return (
    -42.379 +
    2.04901523 * tempFarenheit +
    10.14333127 * relHumidity +
    -0.22475541 * tempFarenheit * relHumidity +
    -0.00683783 * expT +
    -0.05481717 * expH +
    0.00122874 * expT * relHumidity +
    0.00085282 * tempFarenheit * expH +
    -0.00000199 * expT * expH
  );
};

export const roundFloatValue = (valueArr) => {
  let rounded = [];
  for (let i = 0; i < valueArr.length; i++) {
    let value = Math.round(valueArr[i] * 10) / 10;
    rounded.push(value);
  }
  return rounded;
};

export const convertTimeToString = (timeArr) => {
  let strings = [];
  for (let i = 0; i < timeArr.length; i++) {
    let time = new Date(timeArr[i]).toLocaleDateString();
    strings.push(time);
  }
  return strings;
};

export const convertWeatherCode = (codeArr) => {
  let strings = [];
  for (let i = 0; i < codeArr.length; i++) {
    let code = WMO[codeArr[i]];
    strings.push(code);
  }
  return strings;
};
