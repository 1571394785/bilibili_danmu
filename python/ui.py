import tkinter as tk
import time
top = tk.Tk()
top.title("Python GUI")
#放置一个按钮
btn = tk.Button(top, text="Click Me", command=top.destroy)
btn.pack()
top.mainloop()