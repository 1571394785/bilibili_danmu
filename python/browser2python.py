import sys,json,tkinter,threading,os
import http.server
class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        global status,data1
        self.send_response(200)
        self.send_header('Content-type', 'text/json')
        self.end_headers()
        data={"status":status,"data":data1}
        data=json.dumps(data)
        print(data)
        self.wfile.write(data.encode())
class App:
    def __init__(self):
        self.tk=tkinter.Tk()
        self.button=tkinter.Button(self.tk,text="发送数据",command=self.send)
        self.button.pack()
        self.button2=tkinter.Button(self.tk,text="退出",command=self.quit)
        self.button2.pack()
        # 监听tkinter的关闭事件
        self.tk.protocol("WM_DELETE_WINDOW", self.quit)
        self.tk.mainloop()
    def send(self):
        global data1,status
        print(u+"/temp/1.xml")
        with open(u+"/temp/1.xml","r",encoding='utf-8') as f:
            data1=f.read()
        status="send"
    def quit(self):
        global httpd
        httpd.shutdown()
        self.tk.destroy()
        exit()
def start_server():
    global httpd
    server_address = ('', 8000)
    httpd = http.server.HTTPServer(server_address, RequestHandler)
    httpd.serve_forever()
def changestatus(status1):
    global status
    status = status1
status = "wait"
data1 = "data"
if __name__ == '__main__':
    if getattr(sys, 'frozen', False):
        u = os.path.dirname(sys.executable)
    else:
        u = os.path.dirname(os.path.realpath(__file__))
    global trd
    trd = threading.Thread(target=start_server)
    trd.deamon = True
    trd.start()
    app = App()