# 🚀 Advanced To-Do List with Data Analytics

## 📌 Overview
This is a **modern To-Do List application** that not only helps manage tasks efficiently but also provides **analytics** to track productivity. It includes features like **task prioritization, deadline forecasting, a progress dashboard, and task categorization.**

## 🎯 Features  
✅ **Task Management** – Add, edit, delete, and mark tasks as completed  
✅ **Task Prioritization** – Set priorities (High, Medium, Low)  
✅ **Deadline Forecasting** – Calendar view with color-coded deadlines  
✅ **Task Categorization & Tags** – Organize tasks by category  
✅ **Progress Analytics Dashboard** – Track completion rates with charts  
✅ **Dark Mode & Responsive UI** – Aesthetic and user-friendly  

## 📊 Analytics & Visualization  
- View **task completion rates** using **pie charts**  
- Track **pending vs completed** tasks  
- Get **insights into priority-based workload**  

## 🛠️ Tech Stack  
- **Frontend:** React, TypeScript, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **State Management:** Redux  
- **Charts & Visuals:** Chart.js / Recharts  

## 🚀 Getting Started  
### 1️⃣ Clone the repository  
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
### 2️⃣ Install dependencies
```sh
npm install
```
### 3️⃣ Start the development server
```sh
npm run dev
```
# 🚀 Git Workflow Guide

## 1️⃣ Setup Git (Only Once per Machine)
```sh
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```
👉 This sets up your Git username and email.
## 2️⃣ Initialize a New Repository (If Not Cloned)
```sh
git init
```
👉 Creates a new Git repository in the current folder.
## 3️⃣ Clone an Existing Repository
```sh
git clone https://github.com/your-username/your-repo.git
```
👉 Copies a remote Git repository to your local system.
## 4️⃣ Check the Current Status of Your Repo
```sh
git status
```
👉 Shows which files are modified, staged, or untracked.
## 5️⃣ Add Changes to Staging Area
```sh
git add .
```
👉 Adds all modified files to the staging area.

### To add a specific file:
```sh
git add filename.txt
```
## 6️⃣ Commit Changes with a Message
```sh
git commit -m "Your commit message"
```
👉 Saves the changes in the repository with a description.
## 7️⃣ Push Changes to GitHub
```sh
git push origin main
```
👉 Sends local commits to the remote repository.
## 8️⃣ Pull the Latest Changes from Remote
```sh
git pull origin main
```
👉 Fetches and merges changes from the remote repository.
## 9️⃣ Create a New Branch (For Features/Fixes)
```sh
git checkout -b feature-branch
```
👉 Creates and switches to a new branch.

### To switch back to the main branch:
```sh
git checkout main
```
## 🔟 Merge a Branch into Main
```sh
git checkout main
git merge feature-branch
```
👉 Merges changes from feature-branch into main.
## 1️⃣1️⃣ Create a Pull Request (PR)
### 1) Push your branch to GitHub:
```sh
git push origin feature-branch
```
### 2) Go to your GitHub repo.
### 3) Click Compare & pull request.
### 4) Add a description and submit the pull request.
### 5) Merge the PR once approved.

## 1️⃣2️⃣ View Commit History
```sh
git log --oneline --graph --decorate --all
```
👉 Shows a simplified commit history.
## 1️⃣3️⃣ Undo Last Commit (If Needed)
### If you haven't pushed yet.
```sh
git reset --soft HEAD~1
```
### If you want to discard the changes.
```sh
git reset --hard HEAD~1
```

## 1️⃣4️⃣ Delete a Branch
```sh
git branch -d feature-branch
```
👉 Deletes a branch locally.

### To delete from remote:
```sh
git push origin --delete feature-branch
```

## 🏆 You're Ready to Use Git Like a Pro! 🚀
