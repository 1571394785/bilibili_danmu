# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'designersatnnx.ui'
##
## Created by: Qt User Interface Compiler version 5.14.1
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PyQt5.QtCore import (QCoreApplication, QMetaObject, QObject, QPoint,
    QRect, QSize, QUrl, Qt)
from PyQt5.QtGui import (QBrush, QColor, QConicalGradient, QCursor, QFont,
    QFontDatabase, QIcon, QLinearGradient, QPalette, QPainter, QPixmap,
    QRadialGradient)
from PyQt5.QtWidgets import *
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
import sys
class Qweb(QWebEngineView):
    def __init__(self):
        super(Qweb, self).__init__()
        self.load(QUrl("https://www.baidu.com"))
        self.show()
    # 点击链接时，跳转到新的链接
    def createWindow(self, QWebEnginePage_WebWindowType):
        print("createWindow")
        return self

class Ui_MainWindow(object):
    def setupUi(self):
        if not QApplication.instance():
            app = QApplication(sys.argv)
        else:
            app = QApplication.instance()
        MainWindow = QMainWindow()
        #创建一个窗口
        self.window = QWidget()
        # 定义一个编辑框
        self.lineEdit = QLineEdit()
        #定义一个按钮
        self.pushButton = QPushButton("按钮")
        #定义按钮的点击事件
        self.pushButton.clicked.connect(self.click)
        #定义一个水平布局
        self.hbox = QHBoxLayout()
        #设置水平布局的间距和边距
        self.hbox.setSpacing(0)
        self.hbox.setContentsMargins(0,0,0,0)
        #把编辑框和按钮添加到水平布局中
        self.hbox.addWidget(self.lineEdit)
        self.hbox.addWidget(self.pushButton)
        #定义一个垂直布局
        self.vbox = QVBoxLayout()
        #设置垂直布局的间距和边距
        self.vbox.setSpacing(0)
        self.vbox.setContentsMargins(0,0,0,0)
        #把水平布局添加到垂直布局中
        self.vbox.addLayout(self.hbox)
        #定义一个浏览器
        self.web = Qweb()
        self.web.load(QUrl("https://www.baidu.com"))
        #把浏览器添加到垂直布局中
        self.vbox.addWidget(self.web)
        #把垂直布局添加到窗口中
        self.window.setLayout(self.vbox)
        MainWindow.setCentralWidget(self.window)
        MainWindow.show()
        app.exec_()
    def changeURL(self, url):
        self.lineEdit.setText(url.toString())
        self.lineEdit.setCursorPosition(0)
        self.web.load(url)
    def click(self):
        url = self.lineEdit.text()
        self.web.load(QUrl(url))
ui=Ui_MainWindow()
ui.setupUi()