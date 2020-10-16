# Tribes Full-Stack project

## Folders

- `frontend`: the frontend code using React
- `backend`: the backend code using Express.js
- `docs`: useful documents and assets

## Rebase workflow

- go to master branch and pull everything from remote branch with 
    :$ git pull
- go to your working branch with 
    :$ git checkout <your_branchname>
- start to rebase your master branch with your feature branch
    :$ git rebase master
- here you need to select the conflicts (VSCode will help)
- after you have finished with all conflicts add these changes
    :$ git add .
- continue with the rebase
    $: git rebase continue
((((do these 3 steps[above] until you got successfully rebased)))) ---->>> these numbers based on commits
    
- after you got the successfull message you can force push everything
    :$ git push --force origin <your_branchname>
