import requests
import xml.etree.ElementTree as ET
import json,os,sys
class bilibili:
    def 通过epid取cid(epid):
        url = 'https://api.bilibili.com/pgc/view/web/season?ep_id={}'.format(epid)
        r = requests.get(url)
        data={'cid':[],'title':[]}
        # result.episodes[?].cid
        for i in r.json()['result']['episodes']:
                print(i['cid'], i['share_copy'])
                data['cid'].append(i['cid'])
                data['title'].append(i['share_copy'])
        json1=json.dumps(data)
        return json1

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
    def 通过cid下载弹幕(cid):
        if getattr(sys, 'frozen', False):
            u = os.path.dirname(sys.executable)
        else:
            u = os.path.dirname(os.path.realpath(__file__))
        url = 'https://api.bilibili.com/x/v1/dm/list.so?oid={}'.format(cid)
        r = requests.get(url)
        os.makedirs(u+'/temp', exist_ok=True)
        with open(u+'/temp/1.xml', 'w', encoding='utf-8') as f:
            f.write(r.content.decode('utf-8'))
class dandanplay:
    def __init__(self):
        print('初始化')
    def 搜索番剧关键词(self,keyword):
        url = 'https://api.dandanplay.net/api/v2/search/episodes?anime={}'.format(keyword)
        r = requests.get(url)
        return r.text
    def 解析番剧数据(self,text):
        self.所有番剧信息={"array":[{"番剧名称":"玉子市场","集信息":[{"集名称":"01","集ID":10000}]}]}
        # 先清空
        self.所有番剧信息['array']=[]
        try:
            json1=json.loads(text)
        except:
            print('解析失败')
            return False
        for i in json1['animes']:
            self.所有番剧信息['array'].append({'番剧名称':i['animeTitle'],'集信息':[]})
            for j in i['episodes']:
                self.所有番剧信息['array'][-1]['集信息'].append({'集名称':j['episodeTitle'],'集ID':j['episodeId']})
        return self.所有番剧信息
class danmu(object):
    def __init__(self):
        self.data={'info':0,'text':[],'attr':[]}#弹幕数据
    def 解析哔哩哔哩的XML(self,xml):
        tree = ET.parse(xml)
        root = tree.getroot()
        #共有多少d标签
        self.data['info']=len(root.findall('d'))
        for i in root.iter('d'):
            self.data['text'].append(i.text)
            self.data['attr'].append(i.attrib['p'])
        print(self.data)
    def 获取总弹幕数(self):
        return self.data['info']
    def 获取单个弹幕(self,弹幕序号):
        分割后的弹幕属性=self.data['attr'][弹幕序号].split(',')
        json1={'text':self.data['text'][弹幕序号],'秒':分割后的弹幕属性[0],'弹幕模式':分割后的弹幕属性[1],'字体大小':分割后的弹幕属性[2],'颜色':分割后的弹幕属性[3],'发送时间':分割后的弹幕属性[4],'弹幕池':分割后的弹幕属性[5],'用户hash':分割后的弹幕属性[6],'rowID':分割后的弹幕属性[7]}
        return json1
if __name__ == '__main__':
    dan1=dandanplay()
    text=dan1.搜索番剧关键词('玉子')
    dan1.解析番剧数据(text)