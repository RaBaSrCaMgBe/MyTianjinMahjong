import requests
from bs4 import BeautifulSoup

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

url = "https://tenhou.net/2/?q="

url += '1m2m3m4m5m6m7m8m9m1p2p3p4p'

req = requests.get(url, headers=headers)

soup = BeautifulSoup(req.text, "html.parser")

