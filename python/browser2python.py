import sys
import http.server
def start_server():
    server_address = ('', 8000)
    httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
    httpd.serve_forever()
#输出exe启动后缀
print(sys.argv)
start_server()