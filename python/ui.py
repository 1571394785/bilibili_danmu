from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from PyQt5.QtWebEngineWidgets import *
def js_callback(result):
    print(result)

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PyQt5 WebEngine")
        self.setGeometry(100, 100, 800, 600)
        self.browser = QWebEngineView()
        self.browser.load(QUrl("http://121.43.33.137"))
        self.browser.page().runJavaScript("documet.getElementById('nav')", js_callback)
        self.setCentralWidget(self.browser)
    def bs(self):
        return self.browser
app = QApplication([])
win = MainWindow()
win.show()
app.exec_()
