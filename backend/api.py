from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router
import uvicorn

# Create FastAPI app
app = FastAPI(
    title="Algorithm Visualizer API",
    description="Simple and robust API for algorithm visualization",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, frontend domain gagamitin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router, prefix="/api")

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Algorithm Visualizer API",
        "version": "1.0.0",
        "docs": "/docs",
        "algorithms": "/api/algorithms"
    }

# Run with: uvicorn backend.main:app --reload
if __name__ == "__main__":
    uvicorn.run(
        "backend.api:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )