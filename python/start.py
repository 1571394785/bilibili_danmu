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
        r = requests.get(url)
        print(r.text)
class danmu:
    data={'info':0,'text':[],'attr':[]}#弹幕数据
    def 解析哔哩哔哩的XML(self,xml):
        tree = ET.parse(xml)
        root = tree.getroot()
        #共有多少d标签
        self.data['info']=len(root.findall('d'))
        for i in root.iter('d'):
            self.data['text'].append(i.text)
            self.data['attr'].append(i.attrib['p'])
        print(self.data)
xml=open('temp/1.xml', 'r', encoding='utf-8')
danmu.解析哔哩哔哩的XML(xml)