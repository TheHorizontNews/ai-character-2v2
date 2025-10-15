from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

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


# Serve frontend with dynamic meta tags
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from meta_tags import get_meta_tags

# Path to frontend build
FRONTEND_DIR = Path(__file__).parent.parent / 'frontend' / 'public'

# Read index.html template
INDEX_HTML_PATH = FRONTEND_DIR / 'index.html'

def inject_meta_tags(html_content: str, meta_data: dict) -> str:
    """
    Inject meta tags into HTML
    """
    title = meta_data.get('title', 'AI Characters')
    description = meta_data.get('description', 'AI character platform reviews')
    og_image = meta_data.get('og_image', 'https://ai-characters.org/og-image.png')
    
    # Create meta tags HTML
    meta_tags = f'''
    <!-- Dynamic Meta Tags -->
    <title>{title}</title>
    <meta name="title" content="{title}" />
    <meta name="description" content="{description}" />
    
    <!-- Open Graph Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:image" content="{og_image}" />
    <meta property="og:image:secure_url" content="{og_image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="AI Characters" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{title}" />
    <meta name="twitter:description" content="{description}" />
    <meta name="twitter:image" content="{og_image}" />
    
    <!-- Title and meta tags will be injected by react-helmet-async -->
    '''
    
    # Inject before </head>
    html_content = html_content.replace(
        '<!-- Title and meta tags will be injected by react-helmet-async -->',
        meta_tags
    )
    
    return html_content


@app.get("/{full_path:path}", response_class=HTMLResponse)
async def serve_frontend(full_path: str):
    """
    Serve frontend with dynamic meta tags based on path
    """
    # Get meta tags for this path
    path = '/' + full_path if full_path else '/'
    meta_data = get_meta_tags(path)
    
    # Read index.html
    try:
        with open(INDEX_HTML_PATH, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Inject meta tags
        html_content = inject_meta_tags(html_content, meta_data)
        
        return HTMLResponse(content=html_content)
    except Exception as e:
        logger.error(f"Error serving frontend: {e}")
        return HTMLResponse(content="<h1>Error loading page</h1>", status_code=500)
