import requests
import xml.etree.ElementTree as ET
class bilibili:
    def 通过epid取cid(epid):
        url = 'https://api.bilibili.com/pgc/view/web/season?ep_id={}'.format(epid)
        r = requests.get(url)
        # result.episodes[?].cid
        for i in r.json()['result']['episodes']:
                print(i['cid'], i['share_copy'])
    def 通过seasonid取cid(seasonid):
        url = 'https://api.bilibili.com/pgc/view/web/season?season_id={}'.format(seasonid)
        r = requests.get(url)
        # result.episodes[?].cid
        for i in r.json()['result']['episodes']:
                print(i['cid'], i['share_copy'])
    def 搜索番剧epid关键词(keyword):
        url = 'https://api.bilibili.com/x/web-interface/search/type?search_type=media_bangumi&keyword={}'.format(keyword)
        r = requests.get(url, cookies=cookies)
        print(r.text)
class danmu:
    def 解析哔哩哔哩的XML(xml):
        tree = ET.parse(xml)
        root = tree.getroot()
        for i in root.iter('d'):
            pass