import os
from typing import Annotated
from fastapi.param_functions import Body
import uvicorn

from starlette.responses import JSONResponse
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from api.authantication import get_cur_ched_dep, authenticate_ched, add_auth_cookie_to_response
from api.database import db_dep
from api.database.schemas import CurrentChed, LoginInfo


app = FastAPI()


@ app.post("/api/login", response_model=CurrentChed)
async def login_for_access_token(
    login_info: Annotated[LoginInfo, Body],
    db: Session = Depends(db_dep)
):
    ched = authenticate_ched(db, login_info.email, login_info.password)
    if not ched:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    json_compatible_item_data = jsonable_encoder(
        ched,  include=CurrentChed.__fields__)
    response = JSONResponse(content=json_compatible_item_data)
    add_auth_cookie_to_response(response, ched)
    return response


@ app.get("/api/get_cur_ched", response_model=CurrentChed)
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
