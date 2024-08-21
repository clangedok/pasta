from pydantic import BaseModel
from fastapi import Query
from typing import Annotated

class Image(BaseModel):
    seed: Annotated[str | None, Query()] = None
    width: Annotated[int | None, Query()] = None
    height: Annotated[int | None, Query()] = None
    aspect: Annotated[str | None, Query()] = None