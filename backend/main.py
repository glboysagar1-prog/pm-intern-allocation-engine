from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from allocation_engine import generate_allocations
from models import AllocationResponse
import json

app = FastAPI(title="PM Intern Allocation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/allocations", response_model=AllocationResponse)
async def get_allocations():
    with open("sample_data.json") as f:
        data = json.load(f)
    allocations = generate_allocations(data)
    return allocations

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
