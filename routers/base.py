from fastapi import APIRouter, Depends
from interfaces.image import Image
import requests
import random


router = APIRouter()

# https://github.com/dharmx/walls
# http://localhost:5000/dharmx/walls/collection/subcollection?width=20&height=30&seed=yomama&aspect=lol
@router.get('/{user:str}/{repo:str}/{path:path}')
async def get_repo(user: str, repo: str, path: str = '', img: Image = Depends()):
    baseUrl = f"https://api.github.com/repos/{user}/{repo}/contents/{path}"
    
    allaoudEextensions = ['png', 'jpeg', 'jpg', 'webm', 'gif']
    
    # fetch baseUrl/${path}
    response = requests.get(baseUrl).json()
    images = [ x['name'] for x in response if x['type'] == 'file' and x['name'].split('.')[-1] in allaoudEextensions]
    random.seed(img.seed)
    randIndex = random.randint(0, len(images)-1)
    print(img.seed)
    return images[randIndex]
# const isFolder = data.filter(item => item.type === 'dir' && item.path === parts.join('/')).length > 0;
            
    # if (parts.length === 0 || parts[0].toLowerCase() === 'random') {
    #             console.log('random shit') 
    #         } else if (isFolder) {
    #             console.log("IT IS FOLDER " + parts)
    #         } else {
    #             console.log(parts + " is not a folder")  //when remove hypr from url
    #         }
            
    # from datetime import datetime
    # import random
    # seed = datetime.now().timestamp()
    # stuff = [
    #     "a", "b", "c"
    # ]
    # random.seed(seed)
    # random.shuffle(stuff)
    # return stuff