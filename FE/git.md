# Git学习笔记
### 关于版本控制（VSC）
> 版本控制是一套系统，该系统按时间顺序记录某一个或一系列文件的变更，让你可以查看其以前的特定版本。

- 本地版本控制系统：使用简单的数据库来保存文件的所有变更
- 集中式版本控制系统：包含文件所有修订版本的单一服务器，多个客户端都可以从这个中心位置检出文件
- 分布式版本控制系统：客户端并非仅仅是检出文件的最新快照，而是对代码仓库进行完整的镜像  
Git就是分布式版本控制系统之一。

### Git特点
- 快照，而非差异  
每次提交或在Git中保存项目的状态时，Git会抓取一张所有文件当前状态的快照，然后存储一个指向该快照的引用。
- 操作基本都在本地执行  
Git中大部分操作只需用到本地文件和资源，一般无需从网络中的其他计算机中获取信息。

### Git基础
#### Git三种状态
- 已提交：表示数据存入本地数据库中
- 已修改：表示已经改动了文件，但尚未提交到数据库
- 已暂存：表示对已经修改文件的当前版本做出了标识并将其加入下一次要提交的快照中
#### Git项目中主要区域
- Git目录：Git保存项目元数据和对象数据库的地方
- 工作目录：从Git目录下的压缩数据库内被提取出，放置在磁盘上以供使用需改
- 暂存区：保存了下一次所要提交内容相关信息的文件
#### Git的基本工作流程
1. 修改工作目录中的文件
2. 将这些文件的快照加入暂存区
3. 提交暂存区中的文件，将快照永久地保存在Git目录中

### Git命令
#### Git首次配置
- 设置用户名和电子邮件地址：
```git 
git config --global user.name "leeper"  
git config --global user.email "leeper@example.com"
```
- 检查个人设置：
```
git config --list
```
- 获取帮助：
```
git help <verb>
git <verb> --help
```
#### 获取Git仓库
- 现有目录中初始化Git仓库：
```
git init
```
- 克隆现有仓库：
```
git clone https://github.com/iyolee/Front-End
```
#### Git基础常用命令
- 查看当前文件状态：git status（-s 显示简洁状态信息）
- 添加内容到下一次提交中：git add (files)
- 查看已暂存和未暂存的变更：git diff
- 添加到暂存区：git commit -m "description"
- 重新尝试提交：git commit --amend
- 从暂存区中移除：git rm (files)
- 查看提交历史：git log
- 移出暂存区：git reset (files)
- 撤销对文件的修改：git checkout -- (file)  
##### 远程仓库常用命令
- 显示远程仓库：git remote (-v 显示仓库对应URL)
- 添加远程仓库：git remote add pb https://github.com/iyolee/Front-End
- 从远程仓库获取和拉取数据：git fetch [remote-name]
- 将数据推送到远程仓库：git push [remote-name] [branch-name]
- 检查远程仓库：git remote show [remote-name]
- 删除远程仓库：git remote rm [remote-name]
- 重命名远程仓库：git remote rename [remote-name] [new-remote-name]

### Git分支机制
Git的分支是一个指向某次提交的轻量级的可移动指针。Git默认的分支是master。当你发起提交时，就有了一个指向最后一次提交的master分支。每次提交时，它都会自动向前移动。  
#### 创建新分支
创建一个名为pb的新分支：  
```git branch pb```
该命令只会创建新分支，不会切换到新的分支上去。
#### 切换分支
切换到已有的分支pb：  
```git checkout pb```
#### 基本的分支操作
- 列出当前所有的分支：git branch
- 创建新分支并切换到新分支上：git checkout -b [branch-name]
- 删除分支：git branch -d [branch-name]
- 合并分支：git merge [branch-name]
- 推送分支：git push [remote-name] [branch-name]
- 拉取数据并与本地分支进行合并：git pull
- 删除远程分支：git push origin --delete [branch-name]

### 变基
在Git中，要把更改从一个分支整合到另一个分支，除了合并（merge）外，还可以变基（rebase）。
#### 变基的工作原理
首先找到两个要整合的分支（当前所在的分支和要整合到的分支）的共同祖先，然后取得当前所在的分支的每次提交引入的更改，并把这些更改保存为临时文件，之后将当前分支重置为要整合到的分支，最后在该分支上依次引入之前保存的每个更改。
#### 变基的使用
假设需要把pb分支整合进来，可以通过```git rebase [basebranch] [topicbranch]```命令，直接对该分支执行变基操作，而不需要先切换到该分支：
```
git rebase master pb
```

对本地尚未推送的更改进行变基操作，从而简化提交历史，但不能对任何已经推送到服务器的更改进行变基操作。