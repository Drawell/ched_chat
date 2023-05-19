import os
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from api.routers import auth_router, chat_router, message_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(message_router)


if os.environ.get("DEV"):
    app.add_middleware(CORSMiddleware,
                       allow_origins=[
                           "http://localhost:3000", "localhost:3000"],
                       allow_credentials=True,
                       allow_methods=["*"],
                       allow_headers=["*"])

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
