from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import Response
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
from bot_meta_middleware import BotMetaMiddleware
from sitemap_generator import generate_main_sitemap, generate_sitemap_index


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Add Bot Meta Middleware FIRST (before CORS)
app.add_middleware(BotMetaMiddleware)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Sitemap routes (outside /api prefix for SEO)
@app.get("/sitemap.xml")
async def get_sitemap():
    """Main sitemap with all URLs"""
    xml_content = generate_main_sitemap()
    return Response(content=xml_content, media_type="application/xml")

@app.get("/sitemap-index.xml")
async def get_sitemap_index():
    """Sitemap index"""
    xml_content = generate_sitemap_index()
    return Response(content=xml_content, media_type="application/xml")

@app.get("/sitemap.xsl")
async def get_sitemap_xsl():
    """Sitemap XSL stylesheet"""
    xsl_path = Path(__file__).parent.parent / 'frontend' / 'public' / 'sitemap.xsl'
    if xsl_path.exists():
        with open(xsl_path, 'r', encoding='utf-8') as f:
            return Response(content=f.read(), media_type="application/xml")
    return Response(content="XSL not found", status_code=404)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
