import os
import uvicorn

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware


from api.authentication import get_cur_ched_dep
from api.database.schemas import CurrentChed
from api.routers import auth_router

app = FastAPI()

app.include_router(auth_router)


@app.get("/api/get_cur_ched", response_model=CurrentChed)
async def get_cur_ched(cur_ched: CurrentChed = Depends(get_cur_ched_dep)):
    return cur_ched


if os.environ.get("DEV"):
    app.add_middleware(CORSMiddleware,
                       allow_origins=[
                           "http://localhost:3000", "localhost:3000"],
                       allow_credentials=True,
                       allow_methods=["*"],
                       allow_headers=["*"])

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
