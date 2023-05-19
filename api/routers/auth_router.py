from api.authentication.auth_dependency import get_cur_ched_dep
from typing import Annotated

from starlette.responses import JSONResponse
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.param_functions import Body

from sqlalchemy.orm import Session

from api.authentication import authenticate_ched, add_auth_cookie_to_response
from api.database import db_dep
from api.crud import ched_crud
from api.models.auth_model import LoginInfo, RegistrationInfo
from api.models.ched_model import CurrentChed


auth_router = APIRouter(prefix="/api", tags=["authentication"],)


@auth_router.post("/login", response_model=CurrentChed)
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


@auth_router.post("/register", response_model=CurrentChed)
async def login_for_access_token(
    registration_info: Annotated[RegistrationInfo, Body],
    db: Session = Depends(db_dep)
):
    mayby_ched_name = ched_crud.find_ched(db, registration_info.name)
    mayby_ched_email = ched_crud.find_ched(db, registration_info.email)
    if mayby_ched_name or mayby_ched_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Already registered")
    if registration_info.password != registration_info.second_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Not same passwords")

    ched = ched_crud.create_ched(db, registration_info.name,
                                 registration_info.email, registration_info.password)

    json_compatible_item_data = jsonable_encoder(
        ched,  include=CurrentChed.__fields__)
    response = JSONResponse(content=json_compatible_item_data)
    add_auth_cookie_to_response(response, ched)
    return response


@auth_router.get("/get_cur_ched", response_model=CurrentChed)
async def get_cur_ched(cur_ched: CurrentChed = Depends(get_cur_ched_dep)):
    return cur_ched
