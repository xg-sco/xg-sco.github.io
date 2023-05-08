---
title: pyautogui
urlname: hkyh7rn9eihzidzn
date: '2023-03-19 10:08:46 +0800'
tags: []
categories: []
---

介绍一个 python 库, 能够操控我们的鼠标和键盘来完成一些每天不必要的, 但又不得不去做的牛马事

> 体验了一波感觉还是比较鸡肋的, 主要是图片定位不到

<div style="background: #E8F7FF;padding:10px;border: 1px solid #ABD2DA;border-radius:5px;margin-bottom:5px;">体验了一波感觉还是比较鸡肋的, 主要是图片定位不到</div>

#### 安装 pyautogui

```shell
pip install pyautogui
```

可能会报错,
[https://github.com/pypa/pip/issues/4251](https://github.com/pypa/pip/issues/4251)
升级 pip 就好了

#### 获取屏幕大小

```shell
import pyautogui

screenWidth, screenHeight = pyautogui.size()
print(screenWidth, screenHeight)
# 1920 1080
```

#### 获取鼠标的坐标

```shell
import pyautogui

# 获取鼠标的坐标
currentMouseX, currentMouseY = pyautogui.position()
print(currentMouseX, currentMouseY)
# 1521 848
```

#### 移动鼠标

```shell
import pyautogui
pyautogui.moveTo(100, 150)
```

#### 鼠标点击

```shell
import pyautogui

# 点击
pyautogui.click()
# 移动鼠标到100, 200之后点击
pyautogui.click(100, 200)

# 找到QQ.png的图片之后点击
pyautogui.click('QQ.png')

# 双击
pyautogui.doubleClick()
```

#### 键盘输入

```shell
import pyautogui
# 输入Hello
pyautogui.write('Hello World!', interval=0.25)
pyautogui.press('enter')

# 移动方向键
with pyautogui.hold('shift'):  # 按住shift
    pyautogui.press(['left', 'left', 'left', 'left'])
# shift自动释放了

# 组合键Ctrl C
pyautogui.hotkey('ctrl', 'c')
```

#### 弹出警告框

```shell
import pyautogui

pyautogui.alert('This is the message to display.')
```

#### 按住鼠标滑动

```shell
import pyautogui

distance = 200
while distance > 0:
    pyautogui.drag(distance, 0, duration=0.5)   # move right
    distance -= 5
    pyautogui.drag(0, distance, duration=0.5)   # move down
    pyautogui.drag(-distance, 0, duration=0.5)  # move left
    distance -= 5
    pyautogui.drag(0, -distance, duration=0.5)  # move up
```

![](https://cdn.xiamu.icu//FoDu7_bYU5ZJeaoTCkd0niUkY_5Q.png)
