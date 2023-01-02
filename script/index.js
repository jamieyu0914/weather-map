console.log("TEST.");

const countryList = [
  {
    tage: "taipei_city",
    place: "臺北市",
  },
  {
    tage: "new_taipei_city",
    place: "新北市",
  },
  {
    tage: "taichung_city",
    place: "臺中市",
  },
  {
    tage: "tainan_city",
    place: "臺南市",
  },
  {
    tage: "kaohsiung_city",
    place: "高雄市",
  },
  {
    tage: "keelung_city",
    place: "基隆市",
  },
  {
    tage: "taoyuan_country",
    place: "桃園市",
  },
  {
    tage: "hsinchu_city",
    place: "新竹市",
  },
  {
    tage: "hsinchu_country",
    place: "新竹縣",
  },
  {
    tage: "miaoli_country",
    place: "苗栗縣",
  },
  {
    tage: "changhua_country",
    place: "彰化縣",
  },
  {
    tage: "nantou_country",
    place: "南投縣",
  },
  {
    tage: "yunlin_country",
    place: "雲林縣",
  },
  {
    tage: "chiayi_city",
    place: "嘉義市",
  },
  {
    tage: "chiayi_country",
    place: "嘉義縣",
  },
  {
    tage: "pingtung_country",
    place: "屏東縣",
  },
  {
    tage: "yilan_country",
    place: "宜蘭縣",
  },
  {
    tage: "hualien_country",
    place: "花蓮縣",
  },
  {
    tage: "taitung_country",
    place: "臺東縣",
  },
];

region = ""; //預設區域名稱

let now_Date = new Date(); //現在時間
now_Date.toISOString().split("T")[0];

const offset = now_Date.getTimezoneOffset();
now_Date = new Date(now_Date.getTime() - offset * 60 * 1000);
day = now_Date.toISOString().split(".")[0];

async function fetchWeather(region, day) {
  let url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-480FD02B-2155-49AB-B24B-1796E44F6333&locationName=${region}`;

  const response = await fetch(url);
  const rawData = await response.json();

  const records = rawData["records"]["location"][0]["weatherElement"];
  const Wx = records[0]["time"][0]["parameter"]["parameterName"];
  const PoP = records[1]["time"][0]["parameter"]["parameterName"];
  const MinT = records[2]["time"][0]["parameter"]["parameterName"];
  const CI = records[3]["time"][0]["parameter"]["parameterName"];
  const MaxT = records[4]["time"][0]["parameter"]["parameterName"];

  const regionWeather = [Wx, PoP, MinT, CI, MaxT];

  const weatherInfo = {
    region: region,
    date: day,
    Wx: regionWeather[0],
    PoP: regionWeather[1],
    MinT: regionWeather[2],
    CI: regionWeather[3],
    MaxT: regionWeather[4],
  };

  console.log(weatherInfo);

  const now_place = document.querySelector(".now_place");
  now_place.innerHTML = "縣市" + weatherInfo["region"];

  const now_weather = document.querySelector(".now_weather");
  now_place.innerHTML =
    "縣市：" +
    weatherInfo["region"] +
    "<br />" +
    "天氣：" +
    weatherInfo["Wx"] +
    "<br />" +
    "降雨機率：" +
    weatherInfo["PoP"] +
    "％" +
    "<br />" +
    "舒適度：" +
    weatherInfo["CI"] +
    "<br />" +
    "最低溫度：" +
    weatherInfo["MinT"] +
    "°C" +
    "<br />" +
    "最高溫度：" +
    weatherInfo["MaxT"] +
    "°C";
}

for (const city of countryList) {
  document.getElementById(city.tage).addEventListener("touchstart", () => {
    console.log(city.place);
    region = city.place; //「手機版」點擊後的區域名稱
    fetchWeather(region, day);
  });
}

for (const city of countryList) {
  document.getElementById(city.tage).addEventListener("click", () => {
    console.log(city.place);
    region = city.place; //「電腦版」點擊後的區域名稱
    fetchWeather(region, day);
  });
}
