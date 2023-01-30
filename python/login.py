from PyQt5.QtCore import QUrl, QObject, pyqtSlot
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout
from PyQt5.QtWebChannel import QWebChannel
import sys
import os
import start
import json
class Factorial(QObject):
    @pyqtSlot(str, result=str)
    def factorial(self, n):
        
        url = u+"/ui/main.html"
        print(url)
        ex.changeURL(url)
        return "hello"+n
    @pyqtSlot(str, result=str)
    def getinfo(self, n):
        print(n)
        json1=json.loads(n)
        data = start.bilibili.通过epid取cid(json1['name'])
        return data
        
class ShowHtml(QWebEngineView):
    def __init__(self):
        super(ShowHtml, self).__init__()
        self.initUI()
    def initUI(self):
        self.resize(500, 200)
        self.browser = QWebEngineView()
        
        url = u+"/ui/index.html"
        print(url)
        self.browser.load(QUrl.fromLocalFile(url))
        channel.registerObject("obj", factorial)
        self.browser.page().setWebChannel(channel)
        self.browser.setWindowTitle("哔哩哔哩弹幕姬")
        self.browser.show()
    def changeURL(self, url):
        self.browser.load(QUrl.fromLocalFile(url))
        channel.registerObject("obj", factorial)
if __name__ == '__main__':
    #pyinstaller 修复 u位置
    if getattr(sys, 'frozen', False):
        u = os.path.dirname(sys.executable)
    else:
        u = os.path.dirname(os.path.realpath(__file__))
    channel = QWebChannel()
    factorial = Factorial()
    channel.registerObject("obj", factorial)
    app = QApplication(sys.argv)
    ex = ShowHtml()
    sys.exit(app.exec_())