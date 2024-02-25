import fs from "fs";
import chokidar from "chokidar";
const fileContent = fs.readFileSync(
  process.cwd() + "/src/basket.json",
  "utf-8"
);

export function getBasket(passId: any) {
  const fileJson = fs.readFileSync(process.cwd() + "/src/basket.json", "utf-8");

  const currDate = new Date();

  const data = JSON.parse(fileJson);

  const newData = data.filter((item: any) => {
    if (item.date) {
      const objectDate = new Date(item.date);
      return objectDate >= currDate;
    }
    return true;
  });

  fs.writeFileSync(
    process.cwd() + "/src/basket.json",
    JSON.stringify(newData, null, 2),
    "utf-8"
  );

  if (passId) {
    const singleData = newData.find(
      (dataObj: any) => dataObj.uuid === passId.value
    );
    return singleData;
  } else return undefined;
}
export function setBasket(uuid: any, newDate: any, data: any) {
  const fileData = JSON.parse(
    fs.readFileSync(process.cwd() + "/src/basket.json", "utf-8")
  );
  const newData = { date: newDate, uuid: uuid, data: data };
  fileData.push(newData);
  const fileJson = fs.writeFileSync(
    process.cwd() + "/src/basket.json",
    JSON.stringify(fileData, null, 2),
    "utf-8"
  );
}
