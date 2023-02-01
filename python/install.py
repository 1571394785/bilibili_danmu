import winreg,os,sys
def set_registry_value(root, key_path, value_name, value_data):
    try:
        key = winreg.CreateKey(root, key_path)
        winreg.SetValueEx(key, value_name, 0, winreg.REG_SZ, value_data)
        winreg.CloseKey(key)
    except WindowsError as e:
        print(f'Failed to set registry value: {e}')
def 写入注册表():   
    set_registry_value(winreg.HKEY_CLASSES_ROOT, 'DanMu', '', 'DanMu Protocol')
    set_registry_value(winreg.HKEY_CLASSES_ROOT, 'DanMu', 'URL Protocol', url+' %1')
    set_registry_value(winreg.HKEY_CLASSES_ROOT, r'DanMu\shell\open\command', '', url+' %1')
def 删除注册表():
    写入注册表()
    winreg.DeleteKey(winreg.HKEY_CLASSES_ROOT, r'DanMu\shell\open\command')
    winreg.DeleteKey(winreg.HKEY_CLASSES_ROOT, 'DanMu\shell\open')
    winreg.DeleteKey(winreg.HKEY_CLASSES_ROOT, 'DanMu\shell')
    winreg.DeleteKey(winreg.HKEY_CLASSES_ROOT, 'DanMu')
    input("删除成功，按回车键退出")
#-----------------主程序-----------------
if getattr(sys, 'frozen', False):
    u = os.path.dirname(sys.executable)
else:
    u = os.path.dirname(os.path.realpath(__file__))
#此软件的绝对路径
url=u+"\\browser2python.exe"
print("1.注册协议")
print("2.删除协议")
print("3.退出")
a=input("请输入数字：")
if a=="1":
    写入注册表()
    input("注册成功，按回车键退出")
elif a=="2":
    删除注册表()
elif a=="3":
    pass
else:
    input("输入错误，按回车键退出")