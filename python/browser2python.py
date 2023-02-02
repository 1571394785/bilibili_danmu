import sys,json
import http.server
class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        global status
        self.send_response(200)
        self.send_header('Content-type', 'text/json')
        self.end_headers()
        data={"status":status}
        data=json.dumps(data)
        self.wfile.write(data.encode())
def start_server():
    server_address = ('', 8000)
    httpd = http.server.HTTPServer(server_address, RequestHandler)
    httpd.serve_forever()
def changestatus(status1):
    global status
    status = status1
status = "wait"
#输出exe启动后缀
print(sys.argv)
start_server()
changestatus(input("输入状态:"))