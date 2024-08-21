#!/usr/bin/env python
import uvicorn

from fastapi import FastAPI
from routers import base

app = FastAPI()

routers = [
    base
]

for router in routers:
    app.include_router(router.router)

@app.get('/health')
async def get_api_health():
    return {'status': 'ok'}

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=5000, reload=True, log_level='info')