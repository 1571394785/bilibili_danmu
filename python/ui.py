import PyQt5
import PyQt5.uic
import os
def loadUiType(uiFile):
    """
    Pyside lacks the "loadUiType" command, so we have to convert the ui
    file to py code in-memory first and then execute it in a special frame
    to retrieve the form_class.
    """
    parsed = PyQt5.uic.parseUi(uiFile)
    form_class = parsed.find('class').text
    with open(uiFile, 'r') as f:
        o = compile(f.read(), uiFile, 'exec')
        frame = {}
        exec(o, frame)
        #Fetch the base_class and form class based on their type in the xml from designer
        form_class = frame['Ui_%s'%form_class]
        base_class = eval('PyQt5.QtWidgets.%s'%parsed.find('widget').attrib['class'])
    return form_class, base_class
os.chdir('python')
print(os.path('start.py'))