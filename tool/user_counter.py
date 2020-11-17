import requests
from bs4 import BeautifulSoup
import re
import json
from datetime import date, datetime, timedelta

url = "https://chrome.google.com/webstore/detail/iniadded-extension/ccelhacgnhibfknbmionjggknookmall?hl=ja"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
}
r = requests.get(url, headers = headers)
r.raise_for_status()
soup = BeautifulSoup(r.content, "html.parser")

users_element = soup.select_one("span.e-f-ih")
users = re.search(r"ユーザー数: (.+) 人", users_element.string).group(1).replace(",", "").replace("+", "")

data = json.load(open('../data/users.json', 'r'))
data.append({"date": (date.today() - timedelta(3)).strftime("%Y-%m-%d"), "users": int(users)})
df_result = open('../data/users.json', 'w')
json.dump(data, df_result)