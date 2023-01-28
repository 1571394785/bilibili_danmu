from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from PyQt5.QtWebEngineWidgets import *
import start,time
def js_callback(result):
    print(result)

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("哔哩哔哩弹幕姬")
        self.setGeometry(100, 100, 800, 600)
        self.browser = QWebEngineView()
        self.button=QPushButton('搜索',self)
        html = open('python/ui/index.html', 'r', encoding='utf-8').read()
        
        js_string='''
        
        run();
        '''
        #等待加载完毕
        self.browser.setHtml(html)
        self.browser.loadFinished.connect(lambda: self.browser.page().runJavaScript(js_string, js_callback))
        
        self.setCentralWidget(self.browser)
app = QApplication([])
win = MainWindow()
win.show()
app.exec_()
